# Images — how they work & how to replace them

Every image on the site is resolved by `src/data/images.ts` in this order:

1. **Your own file** (highest priority) — drop a file in this folder named
   `<key>.jpg` (or `.jpeg`, `.png`, `.webp`, `.avif`) and it instantly
   replaces everything below. This is where you put your own / Google /
   TripAdvisor / professional photos.
2. **A real, free-licensed Wikimedia Commons photo** of the actual location
   (already wired up, shows on the live site today).
3. A thematic Dominican-Republic fallback.

So the site looks finished right now, and you can perfect any image later by
just saving a file with the matching name below — no code changes needed.

> Note: photos were sourced from **Wikimedia Commons** (real, license-clean,
> hotlinkable). Google Images and TripAdvisor photos are copyrighted and block
> hotlinking, so they can't be embedded directly — but you can download your
> own and drop them in here to override any slot.

---

## Tour image keys

Save as `public/images/<key>.jpg`. Each key currently shows the real photo noted.

| Key | Subject to show | Currently showing (Wikimedia) |
|-----|-----------------|-------------------------------|
| `free-walking-tour` | Ciudad Colonial walking tour | Calle Las Damas |
| `experiencia-colonial` | Alcázar de Colón / Plaza España | Alcázar de Colón |
| `street-tour` | Urban Santo Domingo street life | Calle Las Damas |
| `tuk-tuk` | Tuk-tuk in the Zona Colonial | Calle Las Damas |
| `mas-alla-murallas` | Beyond-the-walls / colonial city | Alcázar de Colón |
| `city-tour-full-day` | Faro a Colón / SD landmarks | Faro a Colón |
| `fusion-criolla` | Dominican culture | Calle Las Damas |
| `tres-ojos` | Los Tres Ojos caves & lakes | Los Tres Ojos ✓ |
| `santiago` | Monumento a los Héroes, Santiago | Monumento Santiago ✓ |
| `puerto-plata` | Puerto Plata city / fort | Puerto Plata (aerial) |
| `san-cristobal` | San Cristóbal heritage | Calle Las Damas |
| `isla-saona` | Saona Island beach | Saona Island ✓ |
| `isla-catalina` | Catalina Island snorkeling | Caribbean beach |
| `cueva-maravillas` | Altos de Chavón / cave | Altos de Chavón ✓ |
| `cuevas-pomier` | Pomier caves rock art | Tres Ojos (cave) |
| `bani` | Dunas de Baní | Dunas de Baní ✓ |
| `salto-alto` | Waterfall (Monte Plata) | Salto El Limón |
| `salto-socoa` | Waterfall (Monte Plata) | Salto El Limón |
| `cola-de-pato` | Waterfall (Jamao) | Salto El Limón |
| `ecoturismo-rd` | DR nature / ecotourism | Los Haitises |
| `buggies` | Buggies on Playa Macao | Punta Cana beach |
| `zipline-buggies` | Zipline / adventure | Punta Cana beach |
| `party-boat` | Catamaran party boat | Punta Cana beach |
| `coco-bongo` | Coco Bongo nightlife | Punta Cana beach |
| `scape-park` | Scape Park / Hoyo Azul cenote | Tres Ojos |
| `caribbean-lake` | Water park | Punta Cana beach |
| `el-dorado` | Water park | Punta Cana beach |
| `bavaro-adventure` | Sacred River jungle | Los Haitises |
| `la-hacienda` | Ranch / horses | Punta Cana beach |
| `monkeyland` | Monkeys / wildlife | Los Haitises |
| `delfines` | Dolphin experience | Caribbean beach |
| `cayo-levantado` | Cayo Levantado island | Cayo Levantado ✓ |
| `ballenas` | Humpback whales, Samaná | Humpback whale (Samaná) ✓ |
| `los-haitises` | Los Haitises mangroves | Los Haitises ✓ |
| `playas-secretas` | Secret Samaná beaches | Cayo Levantado |
| `salto-limon` | Salto El Limón waterfall | Salto El Limón ✓ |
| `playa-rincon` | Playa Rincón | Cayo Levantado (Samaná) |
| `ocean-world` | Ocean World marine park | Puerto Plata |
| `charcos` | 27 Charcos de Damajagua | 27 Charcos / Damajagua ✓ |

✓ = the wired photo is the exact location. Others use a close DR match — replace
with an exact shot whenever you like.

## Page-section keys

| Key | Where |
|-----|-------|
| `explore-city-tours` | Home "Explore by type" — City Tours card |
| `explore-ecoturismo` | Home "Explore by type" — Ecotourism card |
| `explore-aventura` | Home "Explore by type" — Adventure card |
| `services-banner` | Servicios page banner |
| `about-hero` | Nosotros page hero |
| `about-team` | Nosotros "our story" photo |
| `blog-sd`, `blog-saona`, `blog-walking` | Blog post thumbnails |

## Team photos (real guides)

These are real people, so there is no stock photo. Until you add real headshots,
a clean brand-colored initials avatar is shown. To add real photos, save:

- `public/images/team/edward.jpg`
- `public/images/team/orlando.jpg`
- `public/images/team/leopoldo.jpg`
