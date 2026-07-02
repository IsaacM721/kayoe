// Regenerates the bookable-tours pricing snapshot used by
// functions/_lib/pricing.ts (the Workers runtime can't import
// src/data/tours.ts directly because it pulls in node:fs via
// src/data/images.ts).
//
// Usage:
//   npx tsx extract-pricing.mjs
// then copy the relevant entries into functions/_lib/pricing.ts.
import { tours } from './src/data/tours.ts';

const pricing = tours
  .filter((t) => t.price_type !== 'quote' && t.active !== false)
  .map((t) => ({
        slug: t.slug,
        name_es: t.name_es,
        price_type: t.price_type,
        price_usd: t.price_usd ?? null,
        price_child_6_12: t.price_child_6_12 ?? null,
  }));

console.log(JSON.stringify(pricing, null, 2));
console.error('COUNT:', pricing.length);
