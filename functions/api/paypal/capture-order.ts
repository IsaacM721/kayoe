// POST /api/paypal/capture-order
// Captures the PayPal order SERVER-SIDE (never trusts the client's report of
// "payment succeeded"), and only after PayPal confirms status COMPLETED does
// it write the booking to D1 and email the team + the customer.
import { captureOrder } from '../../_lib/paypal';
import { sendBookingEmail } from '../../_lib/email';
import { findTour } from '../../_lib/pricing';

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const {
    orderID,
    tour_slug,
    customer_name,
    customer_email,
    customer_phone,
    tour_date,
    adults,
    children,
    language_pref,
    special_requests,
  } = body ?? {};

  if (!orderID || !tour_slug || !customer_name || !customer_email || !tour_date) {
    return json({ error: 'missing_fields' }, 400);
  }

  const tour = findTour(tour_slug);
  if (!tour) {
    return json({ error: 'invalid_tour' }, 400);
  }

  // If the webhook safety net (or a retried request) already turned this
  // order into a booking, don't charge PayPal's capture endpoint again --
  // just hand back the existing reference so the client's UI can proceed.
  const existing = (await env.DB
    .prepare(`SELECT reference FROM bookings WHERE paypal_order_id = ?`)
    .bind(orderID)
    .first()) as { reference: string } | null;
  if (existing) {
    return json({ success: true, reference: existing.reference });
  }

  let capture: any;
  try {
    capture = await captureOrder(env, orderID);
  } catch (err: any) {
    console.error('PayPal capture error:', err?.message || err);
    return json({ error: 'capture_failed' }, 502);
  }

  if (capture.status !== 'COMPLETED') {
    return json({ error: 'not_completed', status: capture.status }, 402);
  }

  const paidAmount: string | null =
    capture?.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? null;

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const reference = `KAY-${dateStr}-${rand}`;

  try {
    await env.DB.prepare(
      `INSERT INTO bookings (reference, tour_id, tour_name, customer_name,
              customer_email, customer_phone, tour_date, adults, children,
              language_pref, total_usd, payment_status, paypal_order_id, special_requests)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?)`
    )
      .bind(
        reference,
        tour.slug,
        tour.name_es,
        customer_name,
        customer_email,
        customer_phone ?? null,
        tour_date,
        Number(adults) || 1,
        Number(children) || 0,
        language_pref ?? 'ES',
        paidAmount ? Number(paidAmount) : null,
        orderID,
        special_requests ?? null
      )
      .run();
  } catch (err: any) {
    // A UNIQUE constraint hit on paypal_order_id means another request (the
    // webhook safety net, or a duplicate client retry) beat us to inserting
    // this exact booking a moment ago -- not a real failure, PayPal already
    // has this order recorded. Hand back that reference instead of erroring.
    const raced = (await env.DB
      .prepare(`SELECT reference FROM bookings WHERE paypal_order_id = ?`)
      .bind(orderID)
      .first()) as { reference: string } | null;
    if (raced) {
      return json({ success: true, reference: raced.reference });
    }

    console.error('D1 insert failed after successful PayPal capture:', err?.message || err, { orderID });
    return json({ error: 'booking_save_failed', orderID }, 500);
  }

  await env.DB
    .prepare(`UPDATE pending_orders SET processed = 1 WHERE paypal_order_id = ?`)
    .bind(orderID)
    .run()
    .catch(() => {}); // bookkeeping only -- never block the booking on this

  const notifyTo = env.KAYOE_EMAIL || 'reservas@kayoeexcursiones.com';
  const teamEmailText = `Nueva reserva confirmada -- ${reference}

    Tour: ${tour.name_es}
    Fecha: ${tour_date}
    Adultos: ${Number(adults) || 1} | Ninos: ${Number(children) || 0}
    Total pagado: US$${paidAmount ?? '--'}
    Idioma preferido: ${language_pref ?? 'ES'}

    Cliente: ${customer_name}
    Email: ${customer_email}
    Telefono: ${customer_phone ?? '--'}
    Peticiones especiales: ${special_requests ?? '--'}

    PayPal Order ID: ${orderID}
    Referencia: ${reference}`;

  const customerEmailText = `Hola ${customer_name},

    Tu reserva con Kayoe Excursiones esta confirmada.

    Tour: ${tour.name_es}
    Fecha: ${tour_date}
    Adultos: ${Number(adults) || 1} | Ninos: ${Number(children) || 0}
    Total pagado: US$${paidAmount ?? '--'}
    Referencia de reserva: ${reference}

    Guarda este numero de referencia -- lo puedes usar si necesitas contactarnos
    sobre esta reserva. Nos vemos pronto.

    Kayoe Excursiones
    reservas@kayoeexcursiones.com | +1 (809) 995-0095`;

  await Promise.all([
    sendBookingEmail(env, {
      to: notifyTo,
      fromAddr: 'no-reply@kayoeexcursiones.com',
      subject: `Nueva reserva -- ${reference}`,
      text: teamEmailText,
    }),
    sendBookingEmail(env, {
      to: customer_email,
      fromAddr: 'reservas@kayoeexcursiones.com',
      subject: `Confirmacion de tu reserva -- ${reference}`,
      text: customerEmailText,
    }),
  ]);

  return json({ success: true, reference });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
