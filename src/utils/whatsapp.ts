export const WHATSAPP_NUMBER = '18099950095';
export const PHONE_PRIMARY   = '+1 (809) 995-0095';
export const EMAIL            = 'reservas@kayoeexcursiones.com';

export function getWhatsAppURL(tourName?: string): string {
  const message = tourName
    ? `Hola, me interesa cotizar el tour: ${tourName}`
    : `Hola, me interesa conocer sus tours`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

