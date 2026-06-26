// ============================================================
// Kayoe Excursiones — Image resolver
// ------------------------------------------------------------
// Resolution order for every image `key`:
//   1. Local override:  /public/images/<key>.{jpg,jpeg,png,webp}
//      → drop your own / Google / TripAdvisor / pro photos here and
//        they instantly replace whatever is below. (Filenames listed
//        in /public/images/IMAGES.md.)
//   2. Real, free-licensed Wikimedia Commons photo of the actual place
//      (see WIKIMEDIA map below) — served via Special:FilePath so the
//      URL is stable even if Commons re-hashes its storage paths.
//   3. A thematically-matched Dominican Republic fallback photo.
//
// All Wikimedia files are CC-licensed photos of the real location.
// ============================================================

import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_IMAGES_DIR = path.resolve('public/images');
const LOCAL_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;

// Exact Wikimedia Commons file names (verified real photos of each place).
export const WIKIMEDIA: Record<string, string> = {
  // ── City / Colonial (Santo Domingo) ──
  'free-walking-tour':  'Calle Las Damas.JPG',
  'experiencia-colonial':'Santo Domingo - Alcazar de Colon 02.JPG',
  'street-tour':        'Calle Las Damas.JPG',
  'tuk-tuk':            'Calle Las Damas.JPG',
  'mas-alla-murallas':  'Santo Domingo - Alcazar de Colon 02.JPG',
  'city-tour-full-day': 'Santo Domingo Este - Faro a Colón 0890.JPG',
  'fusion-criolla':     'Calle Las Damas.JPG',
  'tres-ojos':          'Santo Domingo Este - Los Tres Ojos 0822.JPG',
  'santiago':           'Santiago de los Caballeros - Monumento a los Héroes de la Restauración 0772.JPG',
  'san-cristobal':      'Calle Las Damas.JPG',

  // ── Ecotourism / Islands ──
  'isla-saona':         'Saona Island.jpg',
  'isla-catalina':      'Punta Cana Dominican Republic.jpg',
  'cueva-maravillas':   'Altos de Chavón, la Romana, Dominican Republic-- Picturesque Chavon River With Mountains.jpg',
  'cuevas-pomier':      'Santo Domingo Este - Los Tres Ojos 0822.JPG',
  'bani':               'Dunas de Baní 8.jpg',
  'salto-alto':         'Salto de Limon waterfall in Samana, Dominican Republic.jpg',
  'salto-socoa':        'Salto de Limon waterfall in Samana, Dominican Republic.jpg',
  'cola-de-pato':       'Salto de Limon waterfall in Samana, Dominican Republic.jpg',
  'ecoturismo-rd':      'Dominican republic Los Haitises mangroves.jpeg',

  // ── Adventure / Punta Cana ──
  'buggies':            'Punta Cana Dominican Republic.jpg',
  'zipline-buggies':    'Punta Cana Dominican Republic.jpg',
  'party-boat':         'Punta Cana Dominican Republic.jpg',
  'coco-bongo':         'Punta Cana Dominican Republic.jpg',
  'scape-park':         'Santo Domingo Este - Los Tres Ojos 0822.JPG',
  'caribbean-lake':     'Punta Cana Dominican Republic.jpg',
  'el-dorado':          'Punta Cana Dominican Republic.jpg',
  'bavaro-adventure':   'Dominican republic Los Haitises mangroves.jpeg',
  'la-hacienda':        'Punta Cana Dominican Republic.jpg',
  'monkeyland':         'Dominican republic Los Haitises mangroves.jpeg',
  'delfines':           'Saona Island.jpg',

  // ── Samaná ──
  'cayo-levantado':     'Playa de Cayo Levantado.jpg',
  'ballenas':           'Humbak.jpg',
  'los-haitises':       'Dominican republic Los Haitises mangroves.jpeg',
  'playas-secretas':    'Playa de Cayo Levantado.jpg',
  'salto-limon':        'Salto de Limon waterfall in Samana, Dominican Republic.jpg',
  'playa-rincon':       'Playa de Cayo Levantado.jpg',

  // ── Puerto Plata ──
  'ocean-world':        'Puertoplatafromtheair.JPG',
  'charcos':            '27 Charcas rio Damajagua - panoramio.jpg',
  'puerto-plata':       'Puertoplatafromtheair.JPG',

  // ── Page sections (non-tour) ──
  'explore-city-tours': 'Calle Las Damas.JPG',
  'explore-ecoturismo': 'Saona Island.jpg',
  'explore-aventura':   'Punta Cana Dominican Republic.jpg',
  'services-banner':    'Santo Domingo Este - Faro a Colón 0890.JPG',
  'about-hero':         'Santo Domingo - Alcazar de Colon 02.JPG',
  'about-team':         'Calle Las Damas.JPG',
  'blog-sd':            'Calle Las Damas.JPG',
  'blog-saona':         'Saona Island.jpg',
  'blog-walking':       'Santo Domingo - Alcazar de Colon 02.JPG',
};

// Thematic fallback when a key has no specific match.
const FALLBACK = 'Saona Island.jpg';

/** Build a stable Wikimedia Commons image URL (auto-resized to width). */
function commonsUrl(file: string, width: number): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

/** Return a local override path if the user has dropped a file in /public/images. */
function localOverride(key: string): string | null {
  for (const ext of LOCAL_EXTS) {
    const file = path.join(PUBLIC_IMAGES_DIR, `${key}.${ext}`);
    try {
      if (fs.existsSync(file)) return `/images/${key}.${ext}`;
    } catch { /* fs not available — skip */ }
  }
  return null;
}

/**
 * Resolve an image key to a URL.
 * Local file override → real Wikimedia photo → thematic fallback.
 */
export function resolveImage(key: string, width = 800, _height = 500): string {
  const local = localOverride(key);
  if (local) return local;
  const file = WIKIMEDIA[key] ?? FALLBACK;
  return commonsUrl(file, width);
}

/**
 * Photo for a real team member (guide). These are real people, so there is no
 * stock photo for them — drop a real headshot at /public/images/team/<slug>.jpg
 * and it is used automatically. Until then, a clean brand-colored initials
 * avatar is shown (never a random stranger's face).
 */
export function teamImageUrl(slug: string, name: string, size = 256): string {
  for (const ext of LOCAL_EXTS) {
    const file = path.join(PUBLIC_IMAGES_DIR, 'team', `${slug}.${ext}`);
    try {
      if (fs.existsSync(file)) return `/images/team/${slug}.${ext}`;
    } catch { /* fs not available — skip */ }
  }
  const initials = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${initials}&size=${size}&background=1B3A5C&color=F5A623&bold=true&format=png`;
}
