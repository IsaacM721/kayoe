// Sends transactional email via Resend (https://resend.com) — a plain HTTPS
// REST API, which is the reliable option inside Cloudflare Pages Functions
// (Workers block outbound SMTP on port 25, and Zoho's Mail API needs a full
// OAuth dance). This does NOT touch kayoeexcursiones.com's existing Zoho MX
// record — reservas@kayoeexcursiones.com keeps receiving mail in Zoho exactly
// as it does today. Resend just needs domain verification (a couple of DNS
// TXT/CNAME records, added alongside the Zoho MX, not replacing it) so it's
// allowed to send email that looks like it's from @kayoeexcursiones.com.
//
// Requires one secret, set via Cloudflare Pages dashboard > Settings >
// Environment variables (never commit it here): RESEND_API_KEY
//
// Until that secret is set, this function no-ops (logging why) so the
// booking/quote flow never breaks just because email isn't wired up yet —
// bookings and quote requests still save to D1 either way.
export async function sendBookingEmail(
  env: any,
  params: { to: string; fromAddr: string; subject: string; text: string }
): Promise<{ sent: boolean; reason?: string }> {
  if (!env.RESEND_API_KEY) {
    console.log('[email] RESEND_API_KEY not configured yet -- skipping notification email.');
    return { sent: false, reason: 'no_api_key' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Kayoe Excursiones <${params.fromAddr}>`,
        to: [params.to],
        subject: params.subject,
        text: params.text,
      }),
    });

    if (!res.ok) {
      console.error('[email] Resend API error:', res.status, await res.text());
      return { sent: false, reason: 'send_error' };
    }

    return { sent: true };
  } catch (err) {
    console.error('[email] Failed to send notification via Resend:', err);
    return { sent: false, reason: 'send_error' };
  }
}
