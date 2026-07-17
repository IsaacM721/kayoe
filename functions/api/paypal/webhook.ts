// POST /api/paypal/webhook
// Safety net: PayPal calls this URL directly, server-to-server, whenever a
// payment event happens -- independent of whether the customer's browser
// stuck around long enough to call /api/paypal/capture-order itself. Without
// this, a customer who pays and then closes the tab (spotty wifi, impatient
// tap-away, etc.) would have their money taken with zero booking record and
// zero notification to the team.
//
// Setup required (PayPal Business dashboard > Developer Dashboard > Apps &
// Credentials > your live app > Webhooks > Add Webhook):
//   URL: https://kayoeexcursiones.com/api/paypal/webhook
//   Events: PAYMENT.CAPTURE.COMPLETED
// Then copy the Webhook ID PayPal gives you into the PAYPAL_WEBHOOK_ID secret
// (Cloudflare Pages dashboard > Settings > Environment variables).
import { verifyWebhookSignature, getOrderDetails } from '../../_lib/paypal';
import { sendBookingEmail } from '../../_lib/email';

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  const rawBody = await request.text();
  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const verified = await verifyWebhookSignature(
    env,
    {
      authAlgo: request.headers.get('PAYPAL-AUTH-ALGO'),
      certUrl: request.headers.get('PAYPAL-CERT-URL'),
      transmissionId: request.headers.get('PAYPAL-TRANSMISSION-ID'),
      transmissionSig: request.headers.get('PAYPAL-TRANSMISSION-SIG'),
      transmissionTime: request.headers.get('PAYPAL-TRANSMISSION-TIME'),
    },
    event
  ).catch((err) => {
    console.error('[paypal webhook] Verification threw:', err?.message || err);
    return false;
  });

  if (!verified) {
    // Do NOT process an unverified event -- could be anyone posting fake
    // "payment completed" data at this URL.
    return json({ error: 'signature_invalid' }, 401);
  }

  if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
    // We only registered for this one event type, but ack anything else too
    // so PayPal doesn't retry a webhook we're simply not acting on.
    return json({ received: true, ignored: event.event_type });
  }

  const orderId: string | undefined = event.resource?.supplementary_data?.related_ids?.order_id;
  if (!orderId) {
    console.error('[paypal webhook] PAYMENT.CAPTURE.COMPLETED with no order_id in payload:', event.resource?.id);
    return json({ received: true, warning: 'no_order_id' });
  }

  const notifyTo = env.KAYOE_EMAIL || 'reservas@kayoeexcursiones.com';

  // Already recorded via the normal client -> capture-order path? Nothing to
  // do -- this is the expected, common case; the webhook is just a backstop.
  const existing = (await env.DB
    .prepare(`SELECT reference FROM bookings WHERE paypal_order_id = ?`)
    .bind(orderId)
    .first()) as { reference: string } | null;
  if (existing) {
    return json({ received: true, already_recorded: existing.reference });
  }

  const paidAmount: string | null = event.resource?.amount?.value ?? null;

  const pending = (await env.DB
    .prepare(`SELECT tour_slug, tour_name, adults, children FROM pending_orders WHERE paypal_order_id = ?`)
    .bind(orderId)
    .first()) as { tour_slug: string; tour_name: string; adults: number; children: number } | null;

  // Best-effort: pull payer name/email from the order itself (the capture
  // event payload doesn't include it) so the recovered booking has real
  // contact info whenever PayPal can give it to us.
  let payerName = 'Cliente (recuperado via webhook)';
  let payerEmail = 'sin-datos@kayoeexcursiones.com';
  try {
    const order = await getOrderDetails(env, orderId);
    const payer = order?.payer;
    if (payer?.email_address) payerEmail = payer.email_address;
    if (payer?.name?.given_name) {
      payerName = `${payer.name.given_name} ${payer.name.surname ?? ''}`.trim();
    }
  } catch (err: any) {
    console.error('[paypal webhook] Could not fetch order details for payer info:', err?.message || err);
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const reference = `KAY-${dateStr}-${rand}`;

  try {
    await env.DB.prepare(
      `INSERT INTO bookings (reference, tour_id, tour_name, customer_name, customer_email,
              tour_date, adults, children, total_usd, payment_status, paypal_order_id, special_requests)
             VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?, 'paid', ?, ?)`
    )
      .bind(
        reference,
        pending?.tour_slug ?? null,
        pending?.tour_name ?? 'Tour desconocido -- revisar en PayPal',
        payerName,
        payerEmail,
        pending?.adults ?? 1,
        pending?.children ?? 0,
        paidAmount ? Number(paidAmount) : null,
        orderId,
        'Reserva recuperada automaticamente por el webhook de PayPal -- el cliente no completo el formulario. Verificar datos de contacto en el panel de PayPal antes de confirmar el tour.'
      )
      .run();
  } catch (err: any) {
    // Someone else (a concurrent capture-order call) won the race -- fine,
    // that row already has everything this webhook would have written.
    console.error('[paypal webhook] Insert failed (likely a benign race):', err?.message || err, { orderId });
    return json({ received: true });
  }

  await sendBookingEmail(env, {
    to: notifyTo,
    fromAddr: 'no-reply@kayoeexcursiones.com',
    subject: `⚠️ Reserva recuperada por webhook -- revisar manualmente -- ${reference}`,
    text: `PayPal confirmo un pago que nuestro formulario nunca termino de procesar (el cliente probablemente cerro la pagina antes de tiempo).

    Referencia: ${reference}
    Tour: ${pending?.tour_name ?? 'DESCONOCIDO -- revisar PayPal Order ID abajo'}
    Adultos: ${pending?.adults ?? '--'} | Ninos: ${pending?.children ?? '--'}
    Total pagado: US$${paidAmount ?? '--'}

    Contacto recuperado de PayPal:
    Nombre: ${payerName}
    Email: ${payerEmail}

    PayPal Order ID: ${orderId}

    ACCION REQUERIDA: confirma los datos en el panel de PayPal y contacta al cliente para coordinar fecha e idioma del tour -- esta informacion no vino del formulario normal.`,
  });

  return json({ received: true, recovered: reference });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
