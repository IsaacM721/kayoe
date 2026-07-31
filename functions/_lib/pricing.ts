// Server-side price list for tours bookable through the PayPal reservation
// flow. Only "fixed"/"from" price-type tours (and, within a tour, only its
// "fixed"/"from" variants -- never "quote"/"group" ones) are included here --
// pricing is always looked up server-side (never trusted from the client),
// so a request can't be tampered with client-side to change the amount
// charged.
//
// This intentionally does NOT import src/data/tours.ts, because that file
// (via src/data/images.ts) uses node:fs, which isn't available in the
// Cloudflare Workers/Pages Functions runtime.
//
// Regenerate this list any time src/data/tours.ts prices change by running:
//   npx tsx extract-pricing.mjs
// from the site/ directory, then updating BOOKABLE_TOURS below.

export interface TourVariantPrice {
    id: string;
    label: string;
    price_usd: number;
    price_child_6_12: number | null;
}

export interface TourPrice {
    slug: string;
    name_es: string;
    price_usd: number;
    price_child_6_12: number | null;
    variants?: TourVariantPrice[];
}

export const BOOKABLE_TOURS: TourPrice[] = [
  // TEMPORARY for a live $1 PayPal test -- remove once src/data/tours.ts
  // reverts this tour to price_type: 'free-tip'.
  { slug: 'free-walking-tour-ciudad-colonial', name_es: 'FREE Walking Tour Ciudad Colonial', price_usd: 1, price_child_6_12: null },
  {
    slug: 'tour-experiencia-colonial-compartido', name_es: 'Tour Experiencia Colonial (Compartido)', price_usd: 25, price_child_6_12: 15,
    variants: [
      { id: 'compartido', label: 'Compartido', price_usd: 25, price_child_6_12: 15 },
    ],
  },
  { slug: 'street-tour-santo-domingo', name_es: 'Street Tour', price_usd: 35, price_child_6_12: null },
  { slug: 'tuk-tuk-santo-domingo', name_es: 'Tuk Tuk por Santo Domingo', price_usd: 25, price_child_6_12: null },
  { slug: 'mas-alla-de-las-murallas', name_es: 'Más allá de las Murallas', price_usd: 25, price_child_6_12: 15 },
  { slug: 'city-tour-full-day', name_es: 'City Tour Full Day Santo Domingo', price_usd: 55, price_child_6_12: null },
  { slug: 'tres-ojos-faro-colon', name_es: 'Parque Los Tres Ojos y Faro a Colón', price_usd: 35, price_child_6_12: 25 },
  {
    slug: 'isla-saona', name_es: 'Isla Saona', price_usd: 55, price_child_6_12: null,
    variants: [
      { id: 'compartido-bayahibe',    label: 'Compartido desde Bayahíbe',    price_usd: 55, price_child_6_12: null },
      { id: 'compartido-punta-cana',  label: 'Compartido desde Punta Cana',  price_usd: 55, price_child_6_12: null },
      { id: 'privado-punta-cana',     label: 'Privado desde Punta Cana',     price_usd: 80, price_child_6_12: null },
      { id: 'privado-santo-domingo',  label: 'Privado desde Santo Domingo',  price_usd: 80, price_child_6_12: null },
    ],
  },
  {
    slug: 'buggies-experience-punta-cana', name_es: 'Buggies Experience', price_usd: 70, price_child_6_12: null,
    variants: [
      { id: 'doble',    label: 'Buggy doble (2 personas)',        price_usd: 70,  price_child_6_12: null },
      { id: 'familiar', label: 'Buggy familiar (hasta 4 personas)', price_usd: 100, price_child_6_12: null },
    ],
  },
  { slug: 'punta-cana-isla-saona', name_es: 'Isla Saona desde Punta Cana', price_usd: 55, price_child_6_12: null },
  { slug: 'punta-cana-party-boat', name_es: 'Party Boat', price_usd: 65, price_child_6_12: null },
  { slug: 'punta-cana-scape-park', name_es: 'Scape Park', price_usd: 129, price_child_6_12: null },
  { slug: 'punta-cana-caribbean-lake', name_es: 'Caribbean Lake Park', price_usd: 99, price_child_6_12: null },
  { slug: 'punta-cana-el-dorado', name_es: 'El Dorado Water Park', price_usd: 129, price_child_6_12: 69 },
  { slug: 'punta-cana-bavaro-adventure', name_es: 'Bavaro Adventure – Sacred River', price_usd: 99, price_child_6_12: null },
  { slug: 'punta-cana-sacred-river-nocturno', name_es: 'Sacred River Nocturno – Bávaro Adventure', price_usd: 169, price_child_6_12: null },
  { slug: 'punta-cana-la-hacienda', name_es: 'La Hacienda Park', price_usd: 99, price_child_6_12: null },
  { slug: 'punta-cana-isla-catalina', name_es: 'Isla Catalina', price_usd: 60, price_child_6_12: null },
  { slug: 'isla-saona-privado-punta-cana', name_es: 'Isla Saona Privado desde Punta Cana', price_usd: 80, price_child_6_12: null },
  { slug: 'isla-saona-privado-santo-domingo', name_es: 'Isla Saona Privado desde Santo Domingo', price_usd: 80, price_child_6_12: null },
  { slug: 'samana-los-haitises', name_es: 'Los Haitises y Cayo Levantado', price_usd: 70, price_child_6_12: null },
  {
    slug: 'punta-cana-coco-bongo', name_es: 'Coco Bongo', price_usd: 90, price_child_6_12: null,
    variants: [
      { id: 'regular',     label: 'Regular – Barra libre',     price_usd: 90,  price_child_6_12: null },
      { id: 'premium',     label: 'Premium – Barra libre',     price_usd: 125, price_child_6_12: null },
      { id: 'gold-member', label: 'Gold Member – Barra libre', price_usd: 170, price_child_6_12: null },
      { id: 'front-row',   label: 'Front Row – Barra libre',   price_usd: 190, price_child_6_12: null },
    ],
  },
  {
    slug: 'punta-cana-monkeyland', name_es: 'Monkeyland', price_usd: 80, price_child_6_12: 50,
    variants: [
      { id: 'con-recogida', label: 'Con recogida en tu hotel (Punta Cana)', price_usd: 90, price_child_6_12: 50 },
      { id: 'sin-recogida', label: 'Sin recogida',                          price_usd: 80, price_child_6_12: 50 },
    ],
  },
  {
    slug: 'punta-cana-delfines', name_es: 'Delfines (Dolphin Experience)', price_usd: 45, price_child_6_12: 45,
    variants: [
      { id: 'explorer',   label: 'Explorer',                                 price_usd: 155, price_child_6_12: 120 },
      { id: 'funtastic',  label: 'Funtastic',                                price_usd: 120, price_child_6_12: 120 },
      { id: 'fur-seals',  label: 'Leones marinos – Fur Seals Encounter',     price_usd: 45,  price_child_6_12: 45 },
    ],
  },
  {
    slug: 'puerto-plata-ocean-world', name_es: 'Ocean World', price_usd: 41.65, price_child_6_12: 33.32,
    variants: [
      { id: 'pasadia-residente',    label: 'Pasadía — Residente RD',                                          price_usd: 41.65, price_child_6_12: 33.32 },
      { id: 'pasadia-extranjero',   label: 'Pasadía — Extranjero',                                             price_usd: 79,    price_child_6_12: 64 },
      { id: 'encuentro-residente',  label: 'Encuentro con el Delfín — Residente RD (pasadía incluido)',        price_usd: 58.32, price_child_6_12: 41.65 },
      { id: 'encuentro-extranjero', label: 'Encuentro con el Delfín — Extranjero (pasadía incluido)',          price_usd: 129,   price_child_6_12: 99 },
      { id: 'nado-residente',       label: 'Nado con el Delfín — Residente RD (pasadía incluido)',             price_usd: 58.32, price_child_6_12: 51.65 },
      { id: 'nado-extranjero',      label: 'Nado con el Delfín — Extranjero (pasadía incluido)',                price_usd: 189,   price_child_6_12: 144 },
    ],
  },
  ];

export function findTour(slug: string): TourPrice | undefined {
    return BOOKABLE_TOURS.find((t) => t.slug === slug);
}

/**
 * Resolves the price to charge for a tour: a specific variant's price if a
 * valid variant_id is given, otherwise the tour's own base price. Returns
 * null when variant_id is given but doesn't belong to this tour -- callers
 * must treat that as an invalid request, never fall back silently (that
 * would let a stale/tampered variant_id silently charge the wrong amount).
 */
export function resolveVariant(
    tour: TourPrice,
    variantId?: string | null
): { price_usd: number; price_child_6_12: number | null; label: string } | null {
    if (!variantId) {
        return { price_usd: tour.price_usd, price_child_6_12: tour.price_child_6_12, label: tour.name_es };
    }
    const variant = tour.variants?.find((v) => v.id === variantId);
    if (!variant) return null;
    return {
        price_usd: variant.price_usd,
        price_child_6_12: variant.price_child_6_12,
        label: `${tour.name_es} — ${variant.label}`,
    };
}

export function calcTotal(
    priced: { price_usd: number; price_child_6_12: number | null },
    adults: number,
    children: number
): number {
    const a = Math.max(0, Math.min(20, Math.floor(adults) || 0));
    const c = Math.max(0, Math.min(10, Math.floor(children) || 0));
    const childPrice = priced.price_child_6_12 ?? priced.price_usd;
    const total = a * priced.price_usd + c * childPrice;
    return Math.round(total * 100) / 100;
}
