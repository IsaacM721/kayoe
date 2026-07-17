// Minimal PayPal REST (Orders v2) client for Cloudflare Pages Functions.
// No SDK dependency -- just fetch, so it stays small in the Worker bundle.

export interface PayPalEnv {
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_ENVIRONMENT?: string; // "production" (default) | "sandbox"
}

function baseUrl(env: PayPalEnv): string {
  return env.PAYPAL_ENVIRONMENT === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';
}

// OAuth access tokens are valid for ~9 hours (PayPal's default). Cloudflare
// Workers/Pages Functions can reuse a module-level variable across requests
// when the isolate stays warm, so caching here cuts a full extra network
// round-trip (and PayPal auth rate-limit risk) off of every single
// create-order / capture-order / webhook call. Keyed by environment so
// sandbox and production tokens (e.g. during testing) never collide.
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

export async function getAccessToken(env: PayPalEnv): Promise<string> {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials are not configured (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET).');
  }

  const cacheKey = `${env.PAYPAL_ENVIRONMENT ?? 'production'}:${env.PAYPAL_CLIENT_ID}`;
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.token;
  }

  const auth = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const res = await fetch(`${baseUrl(env)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };

  // Shave 60s off the real expiry as safety margin against clock drift.
  tokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  });

  return data.access_token;
}

export async function createOrder(env: PayPalEnv, amountUsd: string, description: string) {
  const token = await getAccessToken(env);
  const res = await fetch(`${baseUrl(env)}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: 'USD', value: amountUsd },
          description: description.slice(0, 127),
        },
      ],
    }),
  });
  const data = (await res.json()) as any;
  if (!res.ok) {
    throw new Error(`PayPal create order failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data as { id: string; status: string };
}

// Fetches full order details (including payer contact info), used by the
// webhook safety net to recover customer info that isn't included in the
// PAYMENT.CAPTURE.COMPLETED event payload itself.
export async function getOrderDetails(env: PayPalEnv, orderId: string) {
  const token = await getAccessToken(env);
  const res = await fetch(`${baseUrl(env)}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await res.json()) as any;
  if (!res.ok) {
    throw new Error(`PayPal get order failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

export async function captureOrder(env: PayPalEnv, orderId: string) {
  const token = await getAccessToken(env);
  const res = await fetch(`${baseUrl(env)}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = (await res.json()) as any;
  if (!res.ok) {
    throw new Error(`PayPal capture failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

// Verifies that a webhook event actually came from PayPal (not a spoofed
// request to our endpoint) by asking PayPal itself to check the signature.
// Needs PAYPAL_WEBHOOK_ID -- the ID PayPal assigns when you register the
// webhook URL in the PayPal Business dashboard (Developer Dashboard > Apps &
// Credentials > your app > Webhooks).
export async function verifyWebhookSignature(
  env: PayPalEnv & { PAYPAL_WEBHOOK_ID?: string },
  headers: {
    authAlgo: string | null;
    certUrl: string | null;
    transmissionId: string | null;
    transmissionSig: string | null;
    transmissionTime: string | null;
  },
  webhookEvent: unknown
): Promise<boolean> {
  if (!env.PAYPAL_WEBHOOK_ID) {
    console.error('[paypal webhook] PAYPAL_WEBHOOK_ID not configured -- refusing to trust any webhook event.');
    return false;
  }

  const token = await getAccessToken(env);
  const res = await fetch(`${baseUrl(env)}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: env.PAYPAL_WEBHOOK_ID,
      webhook_event: webhookEvent,
    }),
  });

  if (!res.ok) {
    console.error('[paypal webhook] Signature verification request failed:', res.status, await res.text());
    return false;
  }

  const data = (await res.json()) as { verification_status: string };
  return data.verification_status === 'SUCCESS';
}
