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

export async function getAccessToken(env: PayPalEnv): Promise<string> {
    if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
          throw new Error('PayPal credentials are not configured (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET).');
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
    const data = (await res.json()) as { access_token: string };
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
