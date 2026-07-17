// GET /api/paypal/health
// Safe to call anytime, in production, by anyone with the URL -- it only
// asks PayPal for an OAuth token (proves PAYPAL_CLIENT_ID/SECRET are valid
// and tells you which environment they belong to). It never creates an
// order, never touches a card, never moves money. Use this to confirm
// "are these actually the live credentials, or sandbox?" without risking a
// real charge.
import { getAccessToken } from '../../_lib/paypal';

export async function onRequestGet(context: { env: any }) {
  const { env } = context;

  const configuredEnv = env.PAYPAL_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production';

  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    return json({ ok: false, environment: configuredEnv, error: 'missing_credentials' }, 200);
  }

  try {
    await getAccessToken(env);
    return json({ ok: true, environment: configuredEnv });
  } catch (err: any) {
    return json({ ok: false, environment: configuredEnv, error: 'auth_failed', detail: err?.message ?? String(err) }, 200);
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), { status, headers: { 'Content-Type': 'application/json' } });
}
