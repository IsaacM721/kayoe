// GET /api/paypal/client-id
// Hands the (non-secret) PayPal client ID to the browser so the reservar.astro
// page can load the PayPal JS SDK without hardcoding the ID into the static
// build. PAYPAL_CLIENT_SECRET is never exposed here or anywhere client-side.
export async function onRequestGet(context: { env: any }) {
    const { env } = context;
    return new Response(
          JSON.stringify({
                  clientId: env.PAYPAL_CLIENT_ID || '',
                  environment: env.PAYPAL_ENVIRONMENT || 'production',
          }),
      { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
        );
}
