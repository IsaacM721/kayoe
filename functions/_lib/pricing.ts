// Server-side price list for tours bookable through the PayPal reservation
// flow. Only "fixed"/"from" price-type tours are included here -- pricing is
// always looked up server-side (never trusted from the client), so a
// request can't be tampered with client-side to change the amount charged.
//
// This intentionally does NOT import src/data/tours.ts, because that file
// (via src/data/images.ts) uses node:fs, which isn't available in the
// Cloudflare Workers/Pages Functions runtime.
//
// Regenerate this list any time src/data/tours.ts prices change by running:
//   npx tsx extract-pricing.mjs
// from the site/ directory, then updating BOOKABLE_TOURS below.

export interface TourPrice {
    slug: string;
    name_es: string;
    price_usd: number;
    price_child_6_12: number | null;
}

export const BOOKABLE_TOURS: TourPrice[] = [
  { slug: 'tour-experiencia-colonial-compartido', name_es: 'Tour Experiencia Colonial (Compartido)', price_usd: 25, price_child_6_12: 15 },
  { slug: 'street-tour-santo-domingo', name_es: 'Street Tour', price_usd: 35, price_child_6_12: null },
  { slug: 'tuk-tuk-santo-domingo', name_es: 'Tuk Tuk por Santo Domingo', price_usd: 25, price_child_6_12: null },
  { slug: 'mas-alla-de-las-murallas', name_es: 'Más allá de las Murallas', price_usd: 25, price_child_6_12: 15 },
  { slug: 'city-tour-full-day', name_es: 'City Tour Full Day Santo Domingo', price_usd: 55, price_child_6_12: null },
  { slug: 'tres-ojos-faro-colon', name_es: 'Parque Los Tres Ojos y Faro a Colón', price_usd: 35, price_child_6_12: 25 },
  { slug: 'isla-saona', name_es: 'Isla Saona', price_usd: 55, price_child_6_12: null },
  { slug: 'buggies-experience-punta-cana', name_es: 'Buggies Experience', price_usd: 70, price_child_6_12: null },
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
  { slug: 'punta-cana-coco-bongo', name_es: 'Coco Bongo', price_usd: 90, price_child_6_12: null },
  { slug: 'punta-cana-monkeyland', name_es: 'Monkeyland', price_usd: 80, price_child_6_12: 50 },
  { slug: 'punta-cana-delfines', name_es: 'Delfines (Dolphin Experience)', price_usd: 45, price_child_6_12: 45 },
  { slug: 'puerto-plata-ocean-world', name_es: 'Ocean World', price_usd: 41.65, price_child_6_12: 33.32 },
  ];

export function findTour(slug: string): TourPrice | undefined {
    return BOOKABLE_TOURS.find((t) => t.slug === slug);
}

export function calcTotal(tour: TourPrice, adults: number, children: number): number {
    const a = Math.max(0, Math.min(20, Math.floor(adults) || 0));
    const c = Math.max(0, Math.min(10, Math.floor(children) || 0));
    const childPrice = tour.price_child_6_12 ?? tour.price_usd;
    const total = a * tour.price_usd + c * childPrice;
    return Math.round(total * 100) / 100;
}
