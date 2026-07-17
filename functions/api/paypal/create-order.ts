// POST /api/paypal/create-order
// Creates a PayPal order for the given tour/party size. The amount is ALWAYS
// computed server-side from functions/_lib/pricing.ts -- the client only
// sends which tour and how many people, never a price -- so the checkout
// amount can't be tampered with from the browser.
import { createOrder } from '../../_lib/paypal';
import { findTour, calcTotal } from '../../_lib/pricing';

export async function onRequestPost(context: { request: Request; env: any }) {
    const { request, env } = context;

  let body: any;
    try {
          body = await request.json();
    } catch {
          return json({ error: 'invalid_json' }, 400);
    }

  const { tour_slug, adults, children } = body ?? {};
    const tour = findTour(tour_slug);
    if (!tour) {
          return json({ error: 'invalid_tour' }, 400);
    }

  const total = calcTotal(tour, Number(adults) || 1, Number(children) || 0);
    if (!(total > 0)) {
          return json({ error: 'invalid_amount' }, 400);
    }

  try {
        const order = await createOrder(env, total.toFixed(2), `Kayoe Excursiones: ${tour.name_es}`);

        // Record the tour/party context now, while we still have it, keyed by
        // the PayPal order id. If the customer's browser never comes back to
        // call capture-order (closed tab, dropped connection, etc.), the
        // webhook safety net (functions/api/paypal/webhook.ts) uses this row
        // to reconstruct the booking instead of losing it silently.
        try {
              await env.DB.prepare(
                      `INSERT INTO pending_orders (paypal_order_id, tour_slug, tour_name, adults, children, total_usd)
                             VALUES (?, ?, ?, ?, ?, ?)`
                    )
                .bind(order.id, tour.slug, tour.name_es, Number(adults) || 1, Number(children) || 0, total)
                .run();
        } catch (err: any) {
              // Non-fatal: the primary capture-order flow still works without
              // this row -- it only powers the webhook safety net.
              console.error('Failed to record pending_orders row (non-fatal):', err?.message || err, { orderId: order.id });
        }

        return json({ id: order.id, total });
  } catch (err: any) {
        console.error('PayPal create-order error:', err?.message || err);
        return json({ error: 'create_order_failed' }, 502);
  }
}

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
