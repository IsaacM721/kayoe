// POST /api/quote -- the site's single quote/inquiry channel (free tour
// booking, tour "Cotizar" requests, contacto and servicios forms). Saves the
// request to D1 and notifies the team by email via sendBookingEmail().
import { sendBookingEmail } from '../_lib/email';

export async function onRequestPost(context: { request: Request; env: any }) {
    const { request, env } = context;

  let body: any;
    try {
          body = await request.json();
    } catch {
          return json({ error: 'invalid_json' }, 400);
    }

  const { tour_name, customer_name, customer_email, customer_phone, travel_date, group_size, message } =
        body ?? {};

  if (!customer_name || !customer_email) {
        return json({ error: 'missing_fields' }, 400);
  }

  await env.DB.prepare(
        `INSERT INTO quote_requests (tour_name, customer_name, customer_email, customer_phone, travel_date, group_size, message)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
              tour_name ?? null,
              customer_name,
              customer_email,
              customer_phone ?? null,
              travel_date ?? null,
              group_size ?? null,
              message ?? null
            )
      .run();

  const notifyTo = env.KAYOE_EMAIL || 'reservas@kayoeexcursiones.com';
  const emailText = `Nueva solicitud de cotizacion

    Tour / servicio: ${tour_name ?? '--'}
    Fecha estimada: ${travel_date ?? '--'}
    Tamano del grupo: ${group_size ?? '--'}

    Cliente: ${customer_name}
    Email: ${customer_email}
    Telefono: ${customer_phone ?? '--'}

    Mensaje: ${message ?? '--'}`;

  await sendBookingEmail(env, {
        to: notifyTo,
        fromAddr: 'no-reply@kayoeexcursiones.com',
        subject: `Nueva solicitud de cotizacion -- ${tour_name ?? customer_name}`,
        text: emailText,
  });

  return json({ success: true });
}

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
