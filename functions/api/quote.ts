// POST /api/quote -- for "Cotizar" (no fixed price) tours. Saves the request
// to D1; WhatsApp remains the primary channel for these (see reservar.astro).
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

  return json({ success: true });
}

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
