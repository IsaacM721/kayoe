// POST /api/paypal/capture-order
// Captures the PayPal order SERVER-SIDE (never trusts the client's report of
// "payment succeeded"), and only after PayPal confirms status COMPLETED does
// it write the booking to D1 and email reservas@kayoeexcursiones.com.
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
        console.error('D1 insert failed after successful PayPal capture:', err?.message || err, { orderID });
        return json({ error: 'booking_save_failed', orderID }, 500);
  }

  const notifyTo = env.KAYOE_EMAIL || 'reservas@kayoeexcursiones.com';
    const emailText = `Nueva reserva confirmada -- ${reference}

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

  await sendBookingEmail(env, {
        to: notifyTo,
        fromAddr: 'no-reply@kayoeexcursiones.com',
        subject: `Nueva reserva -- ${reference}`,
        text: emailText,
  });

  return json({ success: true, reference });
}

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
