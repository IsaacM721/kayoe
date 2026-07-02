// Sends a plain-text notification email via Cloudflare Email Routing's
// "send_email" binding (env.SEND_EMAIL). This requires three things to be
// true, none of which are true yet as of this writing:
//   1. kayoeexcursiones.com's DNS is hosted on Cloudflare (zone must exist
//      in this account)
//   2. Email Routing is enabled on that zone, with reservas@kayoeexcursiones.com
//      verified as a destination address
//   3. A send_email binding named SEND_EMAIL is added to this Pages
//      project (Settings > Bindings), pointing at that destination
//
// Until all three are true, env.SEND_EMAIL is undefined and this function
// no-ops (logging why) so the booking flow never breaks just because email
// isn't wired up yet -- the booking still saves to D1 either way.
export async function sendBookingEmail(
    env: any,
    params: { to: string; fromAddr: string; subject: string; text: string }
  ): Promise<{ sent: boolean; reason?: string }> {
    if (!env.SEND_EMAIL) {
          console.log('[email] SEND_EMAIL binding not configured yet -- skipping notification email.');
          return { sent: false, reason: 'no_binding' };
    }

  try {
        const { EmailMessage } = await import('cloudflare:email');
        const raw =
                `From: Kayoe Excursiones <${params.fromAddr}>\r\n` +
                `To: ${params.to}\r\n` +
                `Subject: ${params.subject}\r\n` +
                `MIME-Version: 1.0\r\n` +
                `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
                params.text;

      const message = new EmailMessage(params.fromAddr, params.to, raw);
        await env.SEND_EMAIL.send(message);
        return { sent: true };
  } catch (err) {
        console.error('[email] Failed to send booking notification:', err);
        return { sent: false, reason: 'send_error' };
  }
}
