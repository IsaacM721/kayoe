// ============================================================
// Kayoe Excursiones — Tour Catalog
// Source of truth: 02-TOURS-CATALOG.md
// Images: resolved via src/data/images.ts (local override → real Wikimedia photo)
// ============================================================

import { resolveImage } from './images';

export type PriceType = 'fixed' | 'from' | 'quote' | 'free-tip' | 'group';
export type BadgeType = 'popular' | 'nuevo' | 'ecologico' | 'aventura' | 'familiar' | 'temporada';
export type Category  =
  | 'city-tours' | 'ecoturismo' | 'aventura'
  | 'punta-cana' | 'samana'    | 'puerto-plata'
  | 'parques'    | 'educativas';

export interface PriceGroup { persons: number; price_usd: number; }

export interface TourVariant {
  id:              string;
  label:           string;
  price_type:      PriceType;
  price_usd?:      number;
  price_display?:  string;
  price_groups?:   PriceGroup[];
  location?:       string;
  badge?:          BadgeType;
  min_persons?:    number;
  description_es?: string;
}

export interface Tour {
  slug:                string;
  name_es:             string;
  name_en?:            string;
  category:            Category;
  location:            string;
  badge?:              BadgeType;
  price_type:          PriceType;
  price_usd?:          number;
  price_child_6_12?:   number;
  price_child_0_5?:    number;
  price_groups?:       PriceGroup[];
  price_display?:      string;
  price_note?:         string;
  duration?:           string;
  duration_minutes?:   number;
  languages?:          string;
  schedule?:           string;
  meeting_point?:      string;
  booking_deadline?:   string;
  instant_confirmation?: boolean;
  free_cancellation?:  boolean;
  includes?:           string[];
  excludes?:           string[];
  itinerary?:          string[];
  description_es?:     string;
  description_en?:     string;
  rating?:             number;
  review_count?:       number;
  min_persons?:        number;
  max_persons?:        number;
  notes?:              string;
  image:               string; // key for image path — matches /public/images/tours/[image]/hero.jpg
  active?:             boolean;
  categories?:         Category[];   // secondary categories for multi-category filter support
  variants?:           TourVariant[];
}

export const CATEGORIES: Record<Category, { label_es: string; label_en: string; count: number }> = {
  'city-tours':   { label_es: 'City Tours',        label_en: 'City Tours',        count: 11 },
  'ecoturismo':   { label_es: 'Ecoturismo',         label_en: 'Ecotourism',        count: 16 },
  'aventura':     { label_es: 'Aventura',            label_en: 'Adventure',         count: 2  },
  'punta-cana':   { label_es: 'Punta Cana',          label_en: 'Punta Cana',        count: 13 },
  'samana':       { label_es: 'Samaná',              label_en: 'Samaná',            count: 6  },
  'puerto-plata': { label_es: 'Puerto Plata',        label_en: 'Puerto Plata',      count: 3  },
  'parques':      { label_es: 'Parques Acuáticos',   label_en: 'Water Parks',       count: 5  },
  'educativas':   { label_es: 'Educativas',          label_en: 'Educational Tours', count: 4  },
};

export const tours: Tour[] = [

  // ─────────────────────────────────────────────
  // CITY TOURS
  // ─────────────────────────────────────────────

  {
    slug:          'free-walking-tour-ciudad-colonial',
    name_es:       'FREE Walking Tour Ciudad Colonial',
    name_en:       'FREE Walking Tour Colonial City',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    badge:         'popular',
    price_type:    'free-tip',
    price_display: 'Tú decides',
    price_note:    'Propina sugerida: US$10–$50 según satisfacción',
    duration:      '1h 30min',
    duration_minutes: 90,
    min_persons:   5,
    max_persons:   6,
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    schedule:      'Todos los días: 09:00am, 10:30am, 3:00pm, 6:10pm',
    meeting_point: 'Museo de las Casas Reales (junto al reloj del sol y los animales de hierro)',
    booking_deadline: 'Hasta las 10:00AM del día anterior',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Guía local experto',
      'Recorrido principales puntos Ciudad Colonial',
      'Experiencia histórica y cultural única',
      'Degustación de bebida Nacional (opcional)',
    ],
    excludes: ['Entradas a museos', 'Transporte'],
    itinerary: [
      'Museo de las Casas Reales (punto de encuentro)',
      'Plaza de España',
      'Ruinas de San Francisco',
      'Hospital San Nicolás de Bari (primer hospital de América)',
      'Convento de los Dominicos',
      'Catedral Primada de América',
      'Palacio Consistorial',
      'Parque Colón',
    ],
    description_es: `Recorrido histórico cultural, cargado de informaciones y anécdotas de los museos, monumentos y atractivos a visitar (como la Catedral Primada de América, las ruinas de San Nicolás de Bari "el primer hospital del nuevo mundo", la casa del Cordón, entre otros) destacando en ellos características únicas vividas en el periodo colonial.\n\nEs un tour de PAGO Libre por lo que al final del recorrido le otorgas al guía una valoración económica personal a partir de 10 dólares por persona o su equivalente en pesos dominicanos.`,
    rating:       4.9,
    review_count: 127,
    image:        'free-walking-tour',
  },

  {
    slug:          'tour-experiencia-colonial-compartido',
    name_es:       'Tour Experiencia Colonial (Compartido)',
    name_en:       'Colonial Experience Tour (Shared)',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    price_type:    'fixed',
    price_usd:     25,
    price_child_6_12: 15,
    price_child_0_5:  0,
    duration:      '2h 30min',
    duration_minutes: 150,
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    schedule:      'Todos los días: 10:00am y 4:00pm',
    meeting_point: 'Museo de las Casas Reales (junto al reloj del sol y los animales de hierro)',
    booking_deadline: 'Hasta las 10:00AM del día anterior',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Guía local experto',
      'Entrada a un monumento o museo',
      'Recorrido calles Ciudad Colonial',
    ],
    itinerary: [
      'Museo de las Casas Reales',
      'Panteón Nacional',
      'Plaza de España (Alcázar de Colón)',
      'Calle Las Damas (Casa de Rodrigo Bastidas, Nicolás de Ovando, Dávila)',
      'Catedral Primada de América',
      'Fortaleza Ozama',
      'Parque Duarte',
      'Iglesia de los Dominicos',
      'Museo del Larimar (degustación de mamajuana/ron)',
    ],
    description_es: `Vive y explora el tesoro de la primera ciudad del Nuevo Mundo. Tenemos el primer hospital, la primera calle, la primera iglesia, la primera universidad entre otros — somos primados de América.\n\nConoce la historia y cultura desde la época colonial hasta nuestros días, en un recorrido a cargo de un guía local experto quien te transportará a esos días por las calles de la ciudad colonial, pues no se trata sólo de visitarla sino de conocerla.\n\nDisponible todos los días, bajo reserva previa. Pregunta por las ofertas de grupos.`,
    rating:       4.9,
    review_count: 89,
    image:        'experiencia-colonial',
    variants: [
      {
        id:          'compartido',
        label:       'Compartido',
        price_type:  'fixed',
        price_usd:   25,
        location:    'CIUDAD COLONIAL',
        description_es: 'Recorrido compartido con otros viajeros. $25 por persona (niños 6–12: $15 · menores de 5: GRATIS). Horario fijo: 10:00am y 4:00pm todos los días.',
      },
      {
        id:          'privado',
        label:       'Privado (grupo exclusivo)',
        price_type:  'group',
        location:    'CIUDAD COLONIAL',
        price_groups: [
          { persons: 5,  price_usd: 130 },
          { persons: 10, price_usd: 197 },
          { persons: 15, price_usd: 251 },
          { persons: 20, price_usd: 330 },
          { persons: 25, price_usd: 415 },
          { persons: 30, price_usd: 495 },
        ],
        description_es: 'El mismo recorrido pero exclusivo para tu grupo. Elige tu horario y personaliza el itinerario. Ideal para familias, grupos corporativos y grupos de estudiantes.',
      },
    ],
  },

  {
    slug:          'tour-experiencia-colonial-privado',
    name_es:       'Tour Experiencia Colonial (Privado)',
    name_en:       'Colonial Experience Tour (Private)',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    price_type:    'group',
    price_groups: [
      { persons: 5,  price_usd: 130 },
      { persons: 10, price_usd: 197 },
      { persons: 15, price_usd: 251 },
      { persons: 20, price_usd: 330 },
      { persons: 25, price_usd: 415 },
      { persons: 30, price_usd: 495 },
    ],
    price_display: 'Desde $130 (grupo hasta 5 personas)',
    duration:      '2h 30min',
    duration_minutes: 150,
    schedule:      'El cliente elige su horario',
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    meeting_point: 'Museo de las Casas Reales (junto al reloj del sol)',
    instant_confirmation: false,
    free_cancellation:    true,
    includes: [
      'Guía local experto (exclusivo para tu grupo)',
      'Entrada a un monumento o museo',
      'Recorrido calles Ciudad Colonial',
      'Itinerario personalizable',
    ],
    description_es: `El Tour Experiencia Colonial pero exclusivo para tu grupo. Escoge tu horario y personaliza el itinerario. Ideal para familias, grupos corporativos y grupos de estudiantes.`,
    rating:       4.9,
    review_count: 45,
    image:        'experiencia-colonial',
  },

  {
    slug:          'street-tour-santo-domingo',
    name_es:       'Street Tour',
    name_en:       'Street Tour Santo Domingo',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    price_type:    'fixed',
    price_usd:     35,
    price_note:    'Mínimo 2 personas por reserva',
    duration:      '3h',
    duration_minutes: 180,
    schedule:      'Todos los días: 10:00am, 2:30pm y 5:30pm',
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    meeting_point: 'Plaza de la Cultura / Parque Independencia',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Guía local experto',
      'Tickets del Metro y Teleférico',
      'Recorrido por Plaza de la Cultura',
      'Degustación de bebida nacional (opcional)',
    ],
    itinerary: [
      'Plaza de la Cultura',
      'Zonas menos turísticas de la ciudad',
      'Metro y Teleférico (como un local)',
      'Calles fuera del centro histórico',
      'Degustación: mamajuana, ron dominicano, chocolate o café',
    ],
    description_es: `Street Tour, cultura y sabor. Nos reunimos en el parque independencia para recorrer las calles fuera del centro histórico, subir al metro y teleférico para ver la ciudad desde otra perspectiva.\n\nLuego podrás degustar la mamajuana, ron dominicano, chocolate dominicano y si deseas al final comida típica del país (no incluido en el precio).\n\nSomos un pueblo lleno de cultura, sabores y merengue. En este tour podrás conocer más de nuestras raíces, visitar lugares emblemáticos dominicanos y ver lo que nos hace especiales.`,
    rating:       4.9,
    review_count: 67,
    image:        'street-tour',
  },

  {
    slug:          'tuk-tuk-santo-domingo',
    name_es:       'Tuk Tuk por Santo Domingo',
    name_en:       'Tuk Tuk Tour Santo Domingo',
    category:      'city-tours',
    location:      'ZONA COLONIAL',
    badge:         'nuevo',
    price_type:    'from',
    price_usd:     25,
    price_note:    'Por persona (máx. 5 por tuk-tuk) | Extensión 90min disponible',
    duration:      '45 min (opción 90 min)',
    duration_minutes: 45,
    min_persons:   2,
    languages:     'ES, EN',
    schedule:      'Bajo reserva — horario flexible',
    meeting_point: 'Museo de las Casas Reales (recogida gratis en hoteles dentro de Zona Colonial)',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Paseo privado en Tuk-Tuk ecológico',
      'Chofer-guía local con conocimiento histórico',
      'Paradas fotográficas',
      'Recogida gratuita en hoteles de Zona Colonial',
    ],
    excludes: [
      'Entradas al interior de monumentos/museos',
      'Propinas (opcionales)',
      'Alimentos y bebidas (salvo paquete con almuerzo)',
    ],
    itinerary: [
      'Museo de las Casas Reales (punto de encuentro)',
      'Catedral Primada de América (apreciación exterior)',
      'Panteón Nacional',
      'Ruinas del Monasterio de San Francisco',
      'Calle Las Damas y callejones ocultos',
      'Retorno en Parque Colón',
      'Opcional: Malecón, Palacio Presidencial, Centro de los Héroes',
    ],
    description_es: `Descubre la magia de la primera ciudad del Nuevo Mundo de una forma única, cómoda y encantadora. Disfruta de una experiencia diferente recorriendo la histórica Zona Colonial y el icónico Malecón de Santo Domingo a bordo de nuestro tuk-tuk ecológico.\n\nOlvídate de los recorridos tradicionales y del cansancio de caminar bajo el sol. Nuestro tuk-tuk te llevará por calles empedradas, callejones llenos de historia, plazas vibrantes y rincones escondidos que hacen de la Ciudad Colonial un lugar inolvidable y Patrimonio Mundial de la UNESCO.\n\nPerfecto para parejas, familias, grupos de amigos y pasajeros de cruceros que desean conocer la cultura, la historia y la esencia de la República Dominicana de una manera auténtica e inolvidable.`,
    rating:       5.0,
    review_count: 12,
    image:        'tuk-tuk',
  },

  {
    slug:          'mas-alla-de-las-murallas',
    name_es:       'Más allá de las Murallas',
    name_en:       'Beyond the Walls Tour',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    price_type:    'fixed',
    price_usd:     25,
    price_child_6_12: 15,
    price_child_0_5:  0,
    duration:      '2h',
    duration_minutes: 120,
    schedule:      'Todos los días: 5:30pm',
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    meeting_point: 'Museo de las Casas Reales (junto al reloj del sol)',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: ['Guía local experto'],
    itinerary: [
      'Museo de las Casas Reales',
      'La Negrera',
      'Santa Bárbara (grafitis urbanos, Iglesia de Santa Bárbara)',
      'Fuerte de Santa Bárbara',
      'Fuerte del Ángulo',
      'Barrio Chino',
      'Mercado Modelo',
      'Malecón (Obelisco Macho y Hembra)',
      'Puertas históricas (Don Diego, Atarazana, Pequeña, etc.)',
    ],
    description_es: `Tour diseñado para divertirse y conocer Santa Bárbara, La Negreta, el Barrio Chino, Mercado Modelo, Fray Antón de Montesinos, Malecón de Santo Domingo y mucho más.\n\nSomos un pueblo lleno de cultura, sabor y merengue. En este tour podrás conocer más sobre nuestras raíces, visitar lugares donde poder disfrutar la gastronomía y ver qué nos hace especiales. Además, puedes probar la mamajuana, el ron dominicano, el chocolate dominicano y la gastronomía típica del país.`,
    rating:       4.8,
    review_count: 33,
    image:        'mas-alla-murallas',
  },

  {
    slug:          'city-tour-full-day',
    name_es:       'City Tour Full Day Santo Domingo',
    name_en:       'Santo Domingo Full Day City Tour',
    category:      'city-tours',
    location:      'CIUDAD COLONIAL',
    price_type:    'from',
    price_usd:     55,
    duration:      'Día completo',
    includes: [
      'Zona Colonial',
      'Parque Los Tres Ojos',
      'Faro a Colón',
      'Palacio Nacional',
      'Guía local experto',
      'Transporte',
    ],
    description_es: `Al llegar iniciamos en el Parque Nacional Los Tres Ojos. Belleza oculta dentro una caverna que alberga 4 lagos, los cuales en un principio era solo 1, hoy día separados uno del otro poseen características muy diferentes. Seguimos hacia el Faro a Colón, un mausoleo museo construido en honor al navegante.\n\nContinuamos la visita guiada en la Ciudad Colonial de Santo Domingo, entraremos al Museo de las Casas Reales y Panteón Nacional, luego Plaza de España, en la que se encuentra el emblemático Alcázar de Colón.\n\nMás adelante, nos detendremos para admirar la Casa de Rodrigo Bastidas, fundador de diferentes ciudades de América del Sur. También contemplaremos las antiguas residencias de Nicolás de Ovando y Dávila.\n\nSeguimos hasta la Catedral Primada de América, también conocida como Basílica Menor de Santa María de la Encarnación. Tras ver este templo construido por orden de Carlos V, nos dirigiremos al fuerte más antiguo construido por los europeos en América: la Fortaleza Ozama.\n\nOpción de agregar almuerzo por un monto extra.`,
    rating:       4.8,
    review_count: 22,
    image:        'city-tour-full-day',
  },

  {
    slug:          'city-tour-santiago',
    name_es:       'City Tour Santiago Experience',
    name_en:       'Santiago City Tour',
    category:      'city-tours',
    categories:    ['city-tours', 'educativas'],
    location:      'SANTIAGO',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    description_es: `Santiago de los Caballeros, nombrada por los 30 aristócratas que siguieron a Colón (1495). Segunda ciudad más grande de RD, apodada "Ciudad Corazón". Visita el Monumento a los Héroes, el Centro Cultural León, Ruta de los Murales y el Barrio Los Pepines.`,
    image:         'santiago',
  },

  {
    slug:          'city-tour-puerto-plata',
    name_es:       'City Tour Puerto Plata Experience',
    name_en:       'Puerto Plata City Tour',
    category:      'city-tours',
    categories:    ['city-tours', 'educativas', 'puerto-plata'],
    location:      'PUERTO PLATA',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    description_es: `"La novia del Atlántico" — paisaje que combina mar, montañas, verdes valles, ríos y playas. Visita el Teleférico, Paseo Doña Blanca, Fortaleza de San Felipe y el centro histórico.`,
    image:         'puerto-plata',
  },

  {
    slug:          'fusion-criolla-experience',
    name_es:       'Fusión Criolla Experience',
    name_en:       'Criolla Fusion Experience',
    category:      'city-tours',
    location:      'REPÚBLICA DOMINICANA',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    description_es: `Conoce el origen de las costumbres y tradiciones dominicanas. Recorrido de día completo que muestra las raíces y el sincretismo cultural del pueblo dominicano.`,
    image:         'fusion-criolla',
  },

  {
    slug:          'tres-ojos-faro-colon',
    name_es:       'Parque Los Tres Ojos y Faro a Colón',
    name_en:       'Three Eyes Park and Columbus Lighthouse',
    category:      'city-tours',
    location:      'SANTO DOMINGO ESTE',
    badge:         'ecologico',
    price_type:    'fixed',
    price_usd:     35,
    price_child_6_12: 25,
    price_child_0_5:  0,
    duration:      '4h',
    duration_minutes: 240,
    schedule:      'Todos los días: cada hora desde 09:00am hasta 3:00pm',
    min_persons:   2,
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    meeting_point: 'Parque los Tres Ojos (recogida disponible en hoteles Ciudad Colonial)',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Guía local experto',
      'Entrada al Parque Los Tres Ojos',
      'Entrada al Faro a Colón',
      'Transporte durante el recorrido',
      'Seguro de viaje',
    ],
    notes: 'Los lunes el Faro a Colón está cerrado. Se sustituye con recorrido panorámico y entrada a la Catedral. No está permitido bañarse en el parque.',
    description_es: `Iniciamos nuestra excursión en el Parque Nacional Los Tres Ojos. Belleza oculta dentro una caverna que alberga 4 lagos, los cuales en un principio era solo 1, hoy día separados uno del otro poseen características muy diferentes.\n\nLuego, pasaremos al Faro a Colón un museo/mausoleo lleno de historia y cultura. Será un día lleno de conocimiento y diversión.\n\nPuede combinarse con el Tour Experiencia Colonial para un FULL DAY con almuerzo típico.`,
    rating:       4.8,
    review_count: 54,
    image:        'tres-ojos',
  },

  // ─────────────────────────────────────────────
  // ECOTURISMO
  // ─────────────────────────────────────────────

  {
    slug:          'isla-saona',
    name_es:       'Isla Saona',
    name_en:       'Saona Island',
    category:      'ecoturismo',
    location:      'PARQUE NACIONAL DEL ESTE',
    badge:         'ecologico',
    price_type:    'fixed',
    price_usd:     55,
    price_note:    'Si el hotel está dentro de la zona de recogida',
    duration:      'Día completo',
    instant_confirmation: true,
    free_cancellation:    true,
    includes: [
      'Guía local experto',
      'Transporte',
      'Almuerzo',
    ],
    description_es: `Joya del Parque Nacional del Este. Aguas turquesas, arenas blancas interminables. Un lugar donde el agua turquesa, la arena blanca y las palmeras crean el escenario perfecto para desconectarte y vivir una experiencia inolvidable.\n\nUna de las paradas más especiales es la famosa piscina natural, donde podrás bañarte en aguas poco profundas rodeado de estrellas de mar. Durante el trayecto en catamarán, disfruta de música, baile y un ambiente caribeño inigualable.\n\nDeléitate con un almuerzo tipo buffet en la playa, acompañado de bebidas refrescantes mientras disfrutas de una vista espectacular.`,
    rating:       4.9,
    review_count: 98,
    image:        'isla-saona',
    variants: [
      {
        id:          'compartido-bayahibe',
        label:       'Compartido desde Bayahíbe',
        price_type:  'fixed',
        price_usd:   55,
        location:    'BAYAHÍBE',
        description_es: 'La experiencia clásica compartida con otros viajeros. Salida desde Bayahíbe en catamarán con guía local, almuerzo buffet en la playa y parada en la piscina natural con estrellas de mar.',
      },
      {
        id:          'compartido-punta-cana',
        label:       'Compartido desde Punta Cana',
        price_type:  'fixed',
        price_usd:   55,
        location:    'PUNTA CANA',
        description_es: 'La experiencia clásica compartida con otros viajeros, con salida desde Punta Cana. Catamarán con guía local, almuerzo buffet en la playa y parada en la piscina natural con estrellas de mar.',
      },
      {
        id:          'privado-punta-cana',
        label:       'Privado desde Punta Cana',
        price_type:  'quote',
        location:    'PUNTA CANA',
        description_es: 'Versión privada con salida exclusiva desde Punta Cana. Ideal para grupos y familias que buscan privacidad y flexibilidad en sus horarios.',
      },
      {
        id:          'privado-santo-domingo',
        label:       'Privado desde Santo Domingo',
        price_type:  'group',
        price_groups: [
          { persons: 4, price_usd: 80 },
        ],
        price_display: 'Desde $80 (grupo hasta 4 personas)',
        location:    'BAYAHÍBE',
        min_persons: 4,
        description_es: 'Versión privada del tour con salida desde Santo Domingo. Incluye traslado hasta Bayahíbe y regreso. Mínimo 4 personas.',
      },
      {
        id:          'vip-privado',
        label:       'VIP – Privado',
        price_type:  'quote',
        badge:       'nuevo',
        location:    'BAYAHÍBE',
        description_es: 'La experiencia más exclusiva en Isla Saona. Lancha privada, servicio personalizado, almuerzo premium y acceso a rincones menos concurridos de la isla. Una experiencia que querrás repetir una y otra vez.',
      },
    ],
  },

  {
    slug:          'isla-saona-privado-punta-cana',
    name_es:       'Isla Saona Privado desde Punta Cana',
    name_en:       'Saona Island Private from Punta Cana',
    category:      'ecoturismo',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    description_es: 'Versión privada del tour a Isla Saona con salida exclusiva desde Punta Cana. Ideal para grupos y familias que buscan privacidad y flexibilidad en sus horarios.',
    image:         'isla-saona',
  },

  {
    slug:          'isla-saona-privado-santo-domingo',
    name_es:       'Isla Saona Privado desde Santo Domingo',
    name_en:       'Saona Island Private from Santo Domingo',
    category:      'ecoturismo',
    location:      'BAYAHÍBE',
    price_type:    'group',
    price_groups: [
      { persons: 4, price_usd: 80 },
    ],
    price_display: 'Desde $80 (grupo hasta 4 personas)',
    min_persons:   4,
    duration:      'Día completo',
    description_es: 'Versión privada del tour a Isla Saona con salida desde Santo Domingo. Incluye traslado hasta Bayahíbe y regreso. Mínimo 4 personas.',
    image:         'isla-saona',
  },

  {
    slug:          'isla-saona-vip',
    name_es:       'Isla Saona VIP – Privado desde Santo Domingo',
    name_en:       'Saona Island VIP Private',
    category:      'ecoturismo',
    location:      'BAYAHÍBE',
    badge:         'nuevo',
    price_type:    'quote',
    duration:      'Día completo',
    description_es: `Descubre la magia de Isla Saona, el destino más icónico de la República Dominicana. Un lugar donde el agua turquesa, la arena blanca y las palmeras crean el escenario perfecto para desconectarte y vivir una experiencia inolvidable.\n\nRelájate en playas paradisíacas, camina por la orilla con vistas espectaculares o simplemente déjate llevar por la tranquilidad del mar.\n\nUna de las paradas más especiales es la famosa piscina natural, donde podrás bañarte en aguas poco profundas rodeado de estrellas de mar. Durante el trayecto en lancha privada, disfruta de música, baile y un ambiente caribeño que hace de esta excursión algo más que un simple tour.\n\nDeléitate con un almuerzo tipo buffet en la playa, acompañado de bebidas refrescantes mientras disfrutas de una vista espectacular.`,
    image:         'isla-saona',
  },

  {
    slug:          'isla-catalina',
    name_es:       'Isla Catalina',
    name_en:       'Catalina Island',
    category:      'ecoturismo',
    location:      'LA ROMANA',
    price_type:    'quote',
    duration:      'Día completo',
    description_es: `Escápate al paraíso con Kayoe Excursiones y descubre la espectacular Isla Catalina, una joya del Caribe dominicano donde el agua turquesa, la arena blanca y la tranquilidad se combinan para regalarte una experiencia inolvidable.\n\nUbicada frente a la costa de La Romana, esta isla es perfecta para quienes buscan desconectarse, relajarse y vivir un día lleno de belleza natural.\n\nSumérgete en uno de los mejores puntos de snorkeling del país, donde podrás explorar arrecifes llenos de vida marina. Si prefieres relajarte, disfruta de la playa bajo la sombra de las palmeras, con una vista simplemente espectacular.`,
    image:         'isla-catalina',
  },

  {
    slug:          'cueva-maravillas-altos-chavon',
    name_es:       'Cueva de las Maravillas + Altos de Chavón',
    name_en:       'Cave of Wonders + Altos de Chavon',
    category:      'ecoturismo',
    location:      'LA ROMANA',
    badge:         'familiar',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    includes: ['Guía local experto', 'Transporte'],
    description_es: `La Cueva de las Maravillas: formaciones rocosas, estalactitas, estalagmitas y petroglifos/pictogramas taínos de hace 800 años.\n\nAltos de Chavón: réplica de un pueblo mediterráneo del siglo XVI con talleres artísticos, museo arqueológico, iglesia de San Estanislao, anfiteatro de 5,000 asientos y vistas del Río Chavón y el Mar Caribe.`,
    image:         'cueva-maravillas',
  },

  {
    slug:          'cuevas-del-pomier',
    name_es:       'Cuevas del Pomier o Borbón',
    name_en:       'Pomier Caves',
    category:      'ecoturismo',
    location:      'SAN CRISTÓBAL',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    includes: [
      'Guía local experto',
      'Recorrido por las Cuevas',
      'Explicaciones sobre arte rupestre e historia indígena',
    ],
    description_es: `Descubiertas en 1849, estas cuevas son un tesoro arqueológico con arte rupestre indígena: grabados y pictografías de aves, peces, reptiles y figuras humanas. Declaradas Patrimonio de la Humanidad. Más de 6,000 pinturas prehistóricas en 55 cuevas.`,
    image:         'cuevas-pomier',
  },

  {
    slug:          'tour-ecologico-bani',
    name_es:       'Tour Ecológico Cultural Baní',
    name_en:       'Baní Ecological Cultural Tour',
    category:      'ecoturismo',
    categories:    ['ecoturismo', 'educativas'],
    location:      'BANÍ',
    badge:         'ecologico',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    itinerary: [
      'Parque Eólico Matafongo (generación de energía renovable)',
      'Dunas (pequeño desierto de arenas finas conectado al mar)',
      'Almuerzo',
      'Salinas (montañas de sal, producción y comercialización)',
      'Tierra Tropical (fotos temáticas)',
    ],
    description_es: `Disfruta de un recorrido rodeado de la naturaleza y cultura. Un pequeño desierto, parque eólico, tierra tropical y las Salinas. Lugares perfectos para fotos, con opción de chapuzón en la playa.`,
    image:         'bani',
  },

  {
    slug:          'salto-alto-monte-plata',
    name_es:       'Salto Alto – Monte Plata',
    name_en:       'Salto Alto Waterfall',
    category:      'ecoturismo',
    location:      'MONTE PLATA',
    badge:         'aventura',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Descubre uno de los tesoros naturales más impresionantes de la República Dominicana: el majestuoso Salto Alto en Monte Plata.\n\nUna cascada rodeada de exuberante vegetación donde el sonido del agua, el aire puro y la tranquilidad crean el escape perfecto lejos del ruido de la ciudad.\n\nVive la emoción de caminar entre senderos verdes hasta llegar a esta imponente caída de agua cristalina. Sumérgete en su piscina natural y siente la frescura revitalizante que solo la naturaleza puede ofrecer.\n\nEste destino es ideal tanto para amantes de la aventura como para quienes buscan relajarse. Puedes explorar, tomar fotos increíbles o simplemente disfrutar del paisaje.`,
    image:         'salto-alto',
  },

  {
    slug:          'salto-socoa-monte-plata',
    name_es:       'Salto Socoa – Monte Plata',
    name_en:       'Salto Socoa Waterfall',
    category:      'ecoturismo',
    location:      'MONTE PLATA',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Déjate sorprender por la belleza natural del Salto de Socoa, una de las cascadas más accesibles y encantadoras de la República Dominicana. Ubicado en Monte Plata, este destino es perfecto para una escapada rápida llena de frescura, naturaleza y buena energía.\n\nDisfruta de sus aguas cristalinas y su amplia piscina natural, ideal para bañarte, relajarte y compartir en un ambiente rodeado de naturaleza.\n\nA diferencia de otros destinos, Salto de Socoa no requiere largas caminatas, lo que lo convierte en una opción perfecta para todas las edades.`,
    image:         'salto-socoa',
  },

  {
    slug:          'cola-de-pato-jamao',
    name_es:       'Cola de Pato – Jamao al Norte',
    name_en:       'Cola de Pato Waterfall',
    category:      'ecoturismo',
    location:      'JAMAO AL NORTE',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Atrévete a descubrir uno de los rincones más espectaculares y poco explorados de la República Dominicana: Cola de Pato en Jamao al Norte.\n\nUn destino mágico donde la naturaleza se muestra en su máxima expresión, con aguas cristalinas, formaciones rocosas únicas y un entorno que te hará desconectarte por completo del mundo.\n\nLa experiencia comienza con una caminata rodeada de vegetación exuberante, cruzando senderos que te conectan con la esencia más pura del campo dominicano. Al llegar, el premio es simplemente inolvidable.\n\nSu impresionante caída de agua y su piscina natural de tonos turquesa crean el escenario perfecto para refrescarte, relajarte y vivir un momento único.`,
    image:         'cola-de-pato',
  },

  {
    slug:          'hongo-magico-jamao',
    name_es:       'Hongo Mágico',
    name_en:       'Magic Mushroom Rock',
    category:      'ecoturismo',
    location:      'JAMAO AL NORTE',
    badge:         'ecologico',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Descubre uno de los lugares más curiosos y sorprendentes del norte dominicano: el Hongo Mágico en Jamao al Norte.\n\nUna formación natural impresionante en forma de hongo, creada por el paso del agua a lo largo del tiempo, que hoy se convierte en un escenario perfecto para conectar con la naturaleza y vivir una experiencia diferente.\n\nBajo esta enorme roca en forma de hongo, el agua fluye creando una piscina natural refrescante, ideal para relajarte, disfrutar y dejarte envolver por la magia del lugar.\n\nEste destino combina aventura suave, exploración y paisajes únicos que no encontrarás en cualquier lugar. Perfecto para quienes buscan algo distinto y auténtico.`,
    image:         'hongo-magico',
  },

  {
    slug:          'rio-partido-jamao',
    name_es:       'Río Partido',
    name_en:       'Río Partido',
    category:      'ecoturismo',
    location:      'JAMAO AL NORTE',
    badge:         'aventura',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Atrévete a vivir una de las experiencias más impresionantes del norte dominicano en Río Partido, Jamao al Norte.\n\nUn lugar único donde el río literalmente atraviesa las rocas formando pasadizos naturales, creando un paisaje que parece de otro mundo.\n\nCaminar dentro del río, rodeado de paredes de piedra y aguas cristalinas, es una experiencia que mezcla adrenalina, exploración y conexión total con la naturaleza.\n\nLas formaciones rocosas, esculpidas por el agua a lo largo de los años, hacen de Río Partido un destino inigualable en la República Dominicana.`,
    image:         'rio-partido',
  },

  {
    slug:          'salto-el-berro',
    name_es:       'Salto El Berro',
    name_en:       'Salto El Berro Waterfall',
    category:      'ecoturismo',
    location:      'REPÚBLICA DOMINICANA',
    badge:         'ecologico',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    description_es: `Descubre la belleza pura de Salto El Berro, una cascada escondida que te regala una experiencia auténtica en contacto directo con la naturaleza dominicana.\n\nRodeado de montañas y vegetación exuberante, este destino es perfecto para quienes buscan aventura, tranquilidad y paisajes vírgenes.\n\nDéjate sorprender por su impresionante caída de agua y su piscina natural de aguas frescas, ideales para relajarte y desconectar del mundo.\n\nLa experiencia incluye una caminata entre senderos naturales que hacen del recorrido parte de la aventura, conectándote con el entorno desde el primer momento.`,
    image:         'salto-el-berro',
  },

  {
    slug:          'saltos-de-jima',
    name_es:       'Saltos de Jima',
    name_en:       'Saltos de Jima Waterfalls',
    category:      'ecoturismo',
    location:      'BONAO',
    badge:         'ecologico',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Medio día',
    includes: [
      'Tour guiado con expertos locales',
      'Transporte seguro y cómodo',
    ],
    description_es: `Sumérgete en la belleza de Bonao, donde el verde de las montañas y el sonido de las cascadas te envolverán en una experiencia única.\n\nSi buscas una escapada llena de emociones y paisajes que te quitarán el aliento, este es el destino perfecto. Uno de los secretos mejor guardados de la República Dominicana.\n\nExplora estas impresionantes cascadas en compañía de guías locales expertos que te mostrarán cada rincón de este paraíso natural.`,
    image:         'saltos-de-jima',
  },

  {
    slug:          'ecoturismo-republica-dominicana',
    name_es:       'Ecoturismo en la República Dominicana',
    name_en:       'Ecotourism Dominican Republic',
    category:      'ecoturismo',
    price_type:    'quote',
    location:      'REPÚBLICA DOMINICANA',
    min_persons:   5,
    duration:      'Variable',
    description_es: `Excursiones a rincones naturales y vírgenes de la República Dominicana. Recorridos privados adaptados a tus gustos y preferencias. Incluye explicaciones sobre flora, fauna y cultura local.`,
    image:         'ecoturismo-rd',
  },

  // ─────────────────────────────────────────────
  // AVENTURA
  // ─────────────────────────────────────────────

  {
    slug:          'buggies-experience-punta-cana',
    name_es:       'Buggies Experience',
    name_en:       'Buggies Experience Punta Cana',
    category:      'aventura',
    categories:    ['aventura', 'punta-cana'],
    location:      'PUNTA CANA',
    badge:         'aventura',
    price_type:    'fixed',
    price_usd:     70,
    price_note:    'Doble $70 | Familiar (4 pers.) $100',
    duration:      'Medio día',
    instant_confirmation: false,
    free_cancellation:    true,
    includes: ['Casco', 'Seguro', 'Guía'],
    itinerary: [
      'Playa Macao (playa salvaje y virgen del Caribe)',
      'Casa Típica (cultura y tradiciones dominicanas)',
      'Cueva Taína (historia ancestral de los pueblos originarios)',
    ],
    description_es: `Prepárate para ensuciarte y disfrutarlo al máximo. Vive la experiencia de Buggies en Punta Cana, una aventura llena de adrenalina donde recorrerás caminos off-road, atravesarás charcos de barro y descubrirás paisajes increíbles.\n\nConduce tu buggy a través de senderos rurales, selva tropical y terrenos desafiantes. Disfruta de paradas en cuevas o cenotes de aguas cristalinas y visita Playa Macao, donde podrás combinar la adrenalina con vistas espectaculares.\n\nAdaptable para toda la familia — Playa Macao, Casa Típica y Cueva Taína.`,
    rating:       4.8,
    review_count: 61,
    image:        'buggies',
  },

  {
    slug:          'zipline-buggies-caballo',
    name_es:       'Zipline – Buggies – Caballo',
    name_en:       'Zipline, Buggies & Horseback Riding',
    category:      'aventura',
    location:      'PUNTA CANA',
    badge:         'aventura',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    description_es: `Actividad de día completo adaptable para toda la familia. Cabalgata a caballos, río en propiedad privada, Zipline de 8 tirolesas en fibra de carbono (únicos en el país) y recorrido de ~2 horas en Buggies.\n\nOpción al final: chapuzón en Playa Macao y fiesta con DJ en Coco Bongo.`,
    image:         'zipline-buggies',
  },

  // ─────────────────────────────────────────────
  // PUNTA CANA
  // ─────────────────────────────────────────────

  {
    slug:          'punta-cana-isla-saona',
    name_es:       'Isla Saona desde Punta Cana',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'fixed',
    price_usd:     55,
    duration:      'Día completo',
    image:         'isla-saona',
    includes:      ['Guía', 'Transporte', 'Almuerzo'],
    description_es: 'La joya del Parque Nacional del Este. Aguas turquesas, arenas blancas y piscina natural con estrellas de mar. Salida desde Punta Cana con guía local experto, catamarán y almuerzo buffet.',
    instant_confirmation: true,
    free_cancellation: true,
  },

  {
    slug:          'punta-cana-isla-catalina',
    name_es:       'Isla Catalina',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'isla-catalina',
    description_es: `Escápate al paraíso y descubre la espectacular Isla Catalina, una joya del Caribe dominicano. Ubcada frente a la costa de La Romana, con agua turquesa, arena blanca y uno de los mejores puntos de snorkeling del país, donde podrás explorar arrecifes llenos de vida marina.`,
  },

  {
    slug:          'punta-cana-party-boat',
    name_es:       'Party Boat',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'from',
    price_usd:     65,
    price_note:    '$65 sin comida · $75 con BBQ (pollo, cerdo, pescado)',
    duration:      '3h',
    image:         'party-boat',
    description_es: `Navega por la impresionante costa de Bávaro en un catamarán lleno de fiesta y diversión durante 3 horas de pura alegría en el mar Caribe.\n\nFiesta a bordo con DJ y música tropical. Piscina natural en aguas poco profundas y cristalinas. Barra libre: selección de cervezas, ron y refrescos. Snorkel en los vibrantes arrecifes de coral.\n\nQué llevar: gafas de sol, traje de baño, toalla y protector solar ecológico.\n\nRestricciones: edad mínima 4 años. Bebidas alcohólicas solo para mayores de 18 años. No apto para mujeres embarazadas o personas bajo la influencia de alcohol.`,
  },

  {
    slug:          'punta-cana-coco-bongo',
    name_es:       'Coco Bongo',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Noche',
    image:         'coco-bongo',
    description_es: `Prepárate para una noche fuera de lo común en Coco Bongo Punta Cana, el espectáculo más impactante del Caribe. No es solo una discoteca — es una combinación explosiva de show en vivo, acrobacias, música, luces y energía que te dejará sin aliento.\n\nDisfruta de increíbles imitaciones de artistas famosos, coreografías espectaculares, efectos especiales y presentaciones que te mantendrán al borde de tu asiento. Puedes elegir entre diferentes paquetes con bebidas incluidas, áreas preferenciales y servicio exclusivo para disfrutar la noche como mereces.`,
  },

  {
    slug:          'punta-cana-scape-park',
    name_es:       'Scape Park',
    category:      'punta-cana',
    categories:    ['punta-cana', 'parques'],
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'scape-park',
    description_es: `Descubre Scape Park en Cap Cana, un parque de aventuras donde la adrenalina y la naturaleza se combinan para ofrecerte una experiencia inolvidable.\n\nUno de los atractivos principales es el impresionante Hoyo Azul, una piscina natural de aguas cristalinas color turquesa rodeada de acantilados. Un lugar mágico que no puedes dejar de visitar.\n\nDisfruta de tirolesas, cuevas, senderos ecológicos y múltiples actividades diseñadas para despertar tu espíritu aventurero. Explora cavernas, cenotes y paisajes únicos que hacen de Scape Park uno de los destinos más completos de Punta Cana.`,
  },

  {
    slug:          'punta-cana-caribbean-lake',
    name_es:       'Caribbean Lake Park',
    category:      'punta-cana',
    categories:    ['punta-cana', 'parques'],
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'caribbean-lake',
    description_es: `Si buscas una experiencia llena de emoción y diversión en Punta Cana, Caribbean Lake Park es el lugar perfecto. Un parque acuático donde la adrenalina se mezcla con risas, retos y momentos inolvidables.\n\nAtrévete a probar el wakeboard, deslízate sobre el lago o desafía los inflables acuáticos con tus amigos. No importa si eres principiante o experto: encontrarás opciones para disfrutar al máximo — juegos, retos, tirolesas y más.`,
  },

  {
    slug:          'punta-cana-el-dorado',
    name_es:       'El Dorado Water Park',
    category:      'punta-cana',
    categories:    ['punta-cana', 'parques'],
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'el-dorado',
    description_es: `Disfruta de un día lleno de risas, agua y diversión en El Dorado Water Park, el lugar ideal para compartir en familia o con amigos en Punta Cana.\n\nDesde emocionantes toboganes hasta áreas seguras para niños, este parque está diseñado para que todos encuentren su forma de divertirse. Si prefieres algo más tranquilo, también puedes descansar en las áreas de piscina o simplemente disfrutar del ambiente tropical.`,
  },

  {
    slug:          'punta-cana-bavaro-adventure',
    name_es:       'Bavaro Adventure – Sacred River',
    category:      'punta-cana',
    categories:    ['punta-cana', 'parques'],
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'bavaro-adventure',
    description_es: `Vive una experiencia llena de acción en Bávaro Adventure Park, el lugar donde la aventura no tiene límites en Punta Cana.\n\nDisfruta de un parque con múltiples experiencias: tirolesas, buggies, paseos a caballo, circuitos de cuerdas y mucho más. Recorre caminos off-road en buggy, atravesando terrenos llenos de adrenalina y diversión.\n\nExplora senderos rodeados de vegetación tropical mientras vives cada actividad al máximo. Este parque combina aventura extrema con momentos de relax, ideal para quienes quieren vivirlo todo en un solo lugar.`,
  },

  {
    slug:          'punta-cana-la-hacienda',
    name_es:       'La Hacienda Park',
    category:      'punta-cana',
    categories:    ['punta-cana', 'parques'],
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'la-hacienda',
    description_es: `Descubre La Hacienda Park, una experiencia única en Punta Cana donde la aventura se combina con la cultura dominicana en un entorno natural impresionante.\n\nDisfruta de múltiples actividades en un solo lugar: tirolesas, buggies, paseos a caballo, telesilla panorámica y más. Explora el campo dominicano, conoce tradiciones locales y sumérgete en un ambiente natural lleno de vida.\n\nDesde la telesilla podrás disfrutar de paisajes espectaculares. Perfecto tanto para adrenalina como para experiencias relajadas.`,
  },

  {
    slug:          'punta-cana-zipline',
    name_es:       'Zipline Punta Cana',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'zipline-buggies',
    description_es: `Siente la adrenalina de volar sobre paisajes espectaculares con la experiencia de Zipline en Punta Cana. Deslízate a gran velocidad entre plataformas mientras disfrutas de una vista única de la selva tropical y las montañas.\n\nDesde lo más alto, podrás contemplar paisajes verdes, ríos y naturaleza en su máxima expresión. Equipos certificados y guías expertos te acompañarán en todo momento para que disfrutes con total tranquilidad.`,
  },

  {
    slug:          'punta-cana-monkeyland',
    name_es:       'Monkeyland',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'monkeyland',
    description_es: `Vive una experiencia única y llena de ternura en Monkeyland Punta Cana, donde podrás interactuar de cerca con adorables monos ardilla en su entorno natural.\n\nObserva, alimenta y comparte con estos curiosos y juguetones monos que saltarán sobre ti creando momentos divertidos y memorables. El tour también incluye una visita a una casa típica dominicana donde conocerás sobre la producción de café y cacao, conectando con nuestras raíces culturales.\n\nPerfecto para niños, parejas y grupos que buscan una experiencia diferente, segura y educativa.`,
  },

  {
    slug:          'punta-cana-delfines',
    name_es:       'Delfines (Dolphin Experience)',
    category:      'punta-cana',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'delfines',
    description_es: `Vive una de las experiencias más emocionantes del Caribe en Dolphin Explorer Punta Cana: la oportunidad de nadar e interactuar con delfines en un entorno seguro y espectacular.\n\nSiente la emoción de estar cara a cara con delfines, aprender sobre ellos y vivir interacciones únicas como abrazos, juegos y demostraciones. No necesitas experiencia previa — es una actividad perfecta para niños, adultos, parejas y familias.\n\nAdemás de la diversión, conocerás más sobre la vida marina, el comportamiento de los delfines y la importancia de su cuidado.`,
  },

  // ─────────────────────────────────────────────
  // SAMANÁ
  // ─────────────────────────────────────────────

  {
    slug:          'samana-cayo-levantado',
    name_es:       'Cayo Levantado',
    category:      'samana',
    location:      'SAMANÁ',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'cayo-levantado',
    description_es: `Descubre la magia de Cayo Levantado, también conocido como Isla Bacardí, uno de los destinos más hermosos de la República Dominicana.\n\nUbicado en la impresionante Bahía de Samaná, este pequeño paraíso te regala playas de arena blanca, aguas cristalinas y un ambiente perfecto para desconectarte.\n\nDisfruta de un día de sol, mar y tranquilidad en una de las playas más icónicas del país. Degusta un delicioso almuerzo típico dominicano mientras contemplas una vista espectacular del océano.`,
  },

  {
    slug:          'samana-ballenas-jorobadas',
    name_es:       'Ballenas Jorobadas',
    category:      'samana',
    location:      'SAMANÁ',
    badge:         'temporada',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'ballenas',
    notes:         'Disponible solo en temporada: enero a marzo.',
    description_es: 'Avistamiento de ballenas jorobadas (temporada enero–marzo). Un espectáculo único en el mundo.',
  },

  {
    slug:          'samana-los-haitises',
    name_es:       'Los Haitises',
    category:      'samana',
    location:      'SAMANÁ',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'los-haitises',
    description_es: 'Parque Nacional con manglares, cuevas taínas, fauna exótica y paisajes de otro mundo.',
  },

  {
    slug:          'samana-playas-secretas-vip',
    name_es:       'Playas Secretas VIP',
    category:      'samana',
    location:      'SAMANÁ',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'playas-secretas',
    description_es: 'Recorrido VIP en lancha privada a playas vírgenes e inaccesibles por tierra.',
  },

  {
    slug:          'samana-salto-del-limon',
    name_es:       'Salto del Limón',
    category:      'samana',
    location:      'SAMANÁ',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'salto-limon',
    description_es: `Descubre uno de los paisajes más impresionantes de la República Dominicana en Salto El Limón, una majestuosa cascada escondida en las montañas de Samaná.\n\nCon más de 40 metros de altura, esta cascada cae en una piscina natural de aguas frescas y cristalinas, perfecta para un baño revitalizante. La cascada más famosa de RD, accesible a caballo o caminata a través de la naturaleza exuberante.`,
  },

  {
    slug:          'samana-playa-rincon',
    name_es:       'Playa Rincón',
    category:      'samana',
    location:      'SAMANÁ',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'playa-rincon',
    description_es: `Descubre el paraíso en su máxima expresión en Playa Rincón, una joya natural ubicada en Samaná y considerada una de las playas más bellas del Caribe.\n\nA diferencia de otras playas, Playa Rincón conserva su esencia natural, ofreciendo un ambiente tranquilo, amplio y perfecto para desconectar.\n\nDisfruta de la experiencia de bañarte donde el río Caño Frío se une con el mar, creando un contraste refrescante que hace este lugar aún más especial.`,
  },

  // ─────────────────────────────────────────────
  // PUERTO PLATA
  // ─────────────────────────────────────────────

  {
    slug:          'puerto-plata-ocean-world',
    name_es:       'Ocean World',
    category:      'puerto-plata',
    location:      'PUERTO PLATA',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'ocean-world',
    description_es: `Vive un día inolvidable en Ocean World Adventure Park, el parque marino más completo de la costa norte de la República Dominicana.\n\nConoce de cerca delfines, leones marinos y otras especies fascinantes. Podrás ver shows, aprender sobre ellos e incluso vivir experiencias interactivas.\n\nDisfruta de piscinas, áreas de snorkeling, acuarios tropicales y múltiples actividades diseñadas para todas las edades. Un plan perfecto para compartir, aprender y crear recuerdos inolvidables con los tuyos.`,
  },

  {
    slug:          'puerto-plata-27-charcos',
    name_es:       '27 Charcos de Damajagua',
    category:      'puerto-plata',
    location:      'PUERTO PLATA',
    price_type:    'quote',
    duration:      'Medio día',
    image:         'charcos',
    description_es: `Atrévete a vivir una de las excursiones más emocionantes de la República Dominicana en los 27 Charcos de Damajagua, ubicados en Puerto Plata.\n\nUn paraíso natural donde podrás deslizarte por toboganes de roca, saltar en piscinas naturales y recorrer cascadas en medio de la selva tropical.\n\nCada charco es una nueva experiencia: saltos, deslizamientos y momentos llenos de adrenalina. Rodeado de montañas y vegetación exuberante. Puedes elegir diferentes niveles de recorrido según tu energía y condición física.`,
  },

  // ─────────────────────────────────────────────
  // EDUCATIVAS
  // ─────────────────────────────────────────────

  {
    slug:          'educativa-san-cristobal',
    name_es:       'City Tour San Cristóbal Experience',
    category:      'educativas',
    location:      'SAN CRISTÓBAL',
    price_type:    'quote',
    duration:      'Día completo',
    image:         'san-cristobal',
    includes: [
      'Transporte cómodo ida y vuelta',
      'Guía especializado en historia',
      'Recorrido por puntos emblemáticos',
      'Paradas culturales y fotográficas',
    ],
    description_es: `Descubre la esencia histórica de la República Dominicana con un recorrido por San Cristóbal, una provincia llena de legado, cultura y momentos que marcaron el rumbo del país.\n\nSan Cristóbal es reconocida como la cuna de la primera Constitución Dominicana (1844). Aquí caminarás por lugares donde se tomaron decisiones que definieron nuestra nación.\n\nVisita monumentos, iglesias y espacios emblemáticos que cuentan la historia de grandes personajes y eventos importantes del país. Más allá de la historia, también conocerás la vida local, costumbres y la esencia de una provincia llena de identidad.`,
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(t => t.slug === slug);
}

export function getToursByCategory(category: Category): Tour[] {
  return tours.filter(t => t.category === category && t.active !== false);
}

export function getFeaturedTours(): Tour[] {
  const featuredSlugs = [
    'free-walking-tour-ciudad-colonial',
    'tres-ojos-faro-colon',
    'tuk-tuk-santo-domingo',
    'tour-experiencia-colonial-compartido',
    'isla-saona',
    'buggies-experience-punta-cana',
  ];
  return featuredSlugs
    .map(slug => getTourBySlug(slug))
    .filter((t): t is Tour => t !== undefined);
}

export function formatPrice(tour: Tour): string {
  if (tour.price_type === 'free-tip') return tour.price_display ?? 'Tú decides';
  if (tour.price_type === 'quote')    return 'Cotizar';
  if (tour.price_type === 'group')    return tour.price_display ?? `Desde $${tour.price_groups?.[0]?.price_usd}`;
  if (tour.price_type === 'from')     return `Desde $${tour.price_usd}`;
  if (tour.price_usd !== undefined)   return `$${tour.price_usd}`;
  return 'Consultar';
}

/**
 * Resolve a tour's image URL.
 * Prefers a local override in /public/images/<key>.jpg, otherwise a real
 * Wikimedia Commons photo of the actual location. See src/data/images.ts.
 */
export function tourImageUrl(imageKey: string, w = 800, h = 500): string {
  return resolveImage(imageKey, w, h);
}
