// ============================================================
// Kayoe Excursiones — Tour Catalog
// Source of truth: 02-TOURS-CATALOG.md
// Images: picsum placeholders — replace with /images/tours/[slug]/hero.jpg
// ============================================================

export type PriceType = 'fixed' | 'from' | 'quote' | 'free-tip' | 'group';
export type BadgeType = 'popular' | 'nuevo' | 'ecologico' | 'aventura' | 'familiar';
export type Category  =
  | 'city-tours' | 'ecoturismo' | 'aventura'
  | 'punta-cana' | 'samana'    | 'puerto-plata'
  | 'parques'    | 'educativas';

export interface PriceGroup { persons: number; price_usd: number; }

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
}

export const CATEGORIES: Record<Category, { label_es: string; label_en: string; count: number }> = {
  'city-tours':   { label_es: 'City Tours',        label_en: 'City Tours',        count: 11 },
  'ecoturismo':   { label_es: 'Ecoturismo',         label_en: 'Ecotourism',        count: 13 },
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
    description_es: `Recorrido panorámico por la primera Ciudad del Nuevo Mundo. Un experto guía local te llevará a descubrir los rincones más emblemáticos de la Ciudad Colonial de Santo Domingo, compartiendo anécdotas históricas y curiosidades.\n\nEn nuestro free tour, pagarás lo que consideres justo al finalizar el recorrido, según tu satisfacción. No se admiten reservas para más de 6 personas.`,
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
    duration:      '3h',
    duration_minutes: 180,
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
    description_es: `Recorrido por los monumentos más representativos de la Ciudad Colonial: Fortaleza Ozama, Casa de Bastidas, Panteón de la Patria, Museo de las Casas Reales, entre otros. Se exploran tanto exteriores como interiores.\n\nDisfruta de una demostración sobre destilación de mamajuana y una degustación incluida.`,
    rating:       4.9,
    review_count: 89,
    image:        'experiencia-colonial',
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
    duration:      '3h',
    duration_minutes: 180,
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
    description_es: `Experiencia auténtica en la capital dominicana. Sube al metro y al teleférico como la gente local, descubre el ritmo vibrante de la ciudad desde adentro. Inmersión total en la cultura urbana dominicana.`,
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
    price_usd:     59.95,
    price_note:    'Grupo de hasta 5 personas | Extensión 90min disponible',
    duration:      '45 min (opción 90 min)',
    duration_minutes: 45,
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
    description_es: `Descubre la magia del primer asentamiento europeo en América de la manera más original, cómoda y divertida. A bordo de nuestro Tuk-Tuk ecológico, podrás adentrarte en los callejones más estrechos, rincones ocultos y plazas vibrantes de la Zona Colonial (Patrimonio de la Humanidad por la UNESCO).\n\nPerfecto para parejas, familias, grupos de amigos y pasajeros de cruceros.`,
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
    schedule:      'Todos los días: 10:00am y 5:30pm',
    languages:     'ES, EN | FR, IT, PT (reserva previa)',
    meeting_point: 'Museo de las Casas Reales',
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
    description_es: `Tour fuera de la ciudad amurallada. Conoce el Barrio Chino, Santa Bárbara, La Negreta, Mercado Modelo y mucho más. Descubre la piedra nacional Larimar y su secreto.`,
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
    description_es: `Conoce lo mejor de Santo Domingo en un solo día. Combinación del tour colonial + Tres Ojos + Faro a Colón + Palacio Nacional. Opción de agregar almuerzo típico buffet.`,
    rating:       4.8,
    review_count: 22,
    image:        'city-tour-full-day',
  },

  {
    slug:          'city-tour-santiago',
    name_es:       'City Tour Santiago Experience',
    name_en:       'Santiago City Tour',
    category:      'city-tours',
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
    duration:      '3h',
    duration_minutes: 180,
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
    description_es: `Visita al Parque Nacional Los Tres Ojos: cuevas subterráneas con agua cristalina y 4 lagos. Luego el Faro a Colón, museo/mausoleo lleno de historia.\n\nPuede combinarse con el Tour Experiencia Colonial para un FULL DAY con almuerzo típico.`,
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
    description_es: `Joya del Parque Nacional del Este. Aguas turquesas, arenas blancas interminables. Experiencia con guía local experto, humor dominicano e historias reales.`,
    rating:       4.9,
    review_count: 98,
    image:        'isla-saona',
  },

  {
    slug:          'isla-saona-privado-punta-cana',
    name_es:       'Isla Saona Privado desde Punta Cana',
    name_en:       'Saona Island Private from Punta Cana',
    category:      'ecoturismo',
    location:      'PUNTA CANA',
    price_type:    'quote',
    duration:      'Día completo',
    description_es: 'Versión privada del tour a Isla Saona con salida desde Punta Cana.',
    image:         'isla-saona',
  },

  {
    slug:          'isla-saona-privado-santo-domingo',
    name_es:       'Isla Saona Privado desde Santo Domingo',
    name_en:       'Saona Island Private from Santo Domingo',
    category:      'ecoturismo',
    location:      'BAYAHÍBE',
    price_type:    'quote',
    min_persons:   5,
    duration:      'Día completo',
    description_es: 'Versión privada del tour a Isla Saona con salida desde Santo Domingo.',
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
    description_es: 'Versión VIP y privada del tour a Isla Saona desde Santo Domingo. Experiencia exclusiva.',
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
    description_es: `Isla frente a la costa de La Romana. Uno de los mejores puntos de snorkeling del país, con arrecifes llenos de vida marina. Playa bajo palmeras con vistas espectaculares.`,
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
    description_es: `Cascada rodeada de exuberante vegetación. Senderos verdes, piscina natural con agua cristalina. Ideal para aventura y relajación en plena naturaleza.`,
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
    description_es: `Cascada accesible y encantadora. Aguas cristalinas y amplia piscina natural. No requiere largas caminatas — apta para todas las edades.`,
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
    description_es: 'Excursión a la Cascada Cola de Pato en Jamao al Norte. Contactar para detalles y cotización.',
    image:         'cola-de-pato',
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
    description_es: `Recorrido en buggies por destinos únicos. Playa Macao, Casa Típica y Cueva Taína. Adaptable para toda la familia.`,
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

  { slug: 'punta-cana-isla-saona',         name_es: 'Isla Saona desde Punta Cana',    category: 'punta-cana', location: 'PUNTA CANA', price_type: 'fixed',  price_usd: 55, duration: 'Día completo', image: 'isla-saona',        includes: ['Guía', 'Transporte', 'Almuerzo'], instant_confirmation: true, free_cancellation: true },
  { slug: 'punta-cana-isla-catalina',      name_es: 'Isla Catalina',                  category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'isla-catalina',     description_es: 'Isla frente a la costa de La Romana. Snorkeling en arrecifes de coral. Playa bajo palmeras.' },
  { slug: 'punta-cana-party-boat',         name_es: 'Party Boat',                     category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Medio día',   image: 'party-boat',        description_es: 'Paseo en barco con DJ, open bar y snorkeling. La fiesta perfecta en el Caribe.' },
  { slug: 'punta-cana-coco-bongo',         name_es: 'Coco Bongo',                     category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Noche',       image: 'coco-bongo',        description_es: 'La discoteca más famosa del Caribe. Show de acróbatas, DJs internacionales y open bar.' },
  { slug: 'punta-cana-scape-park',         name_es: 'Scape Park',                     category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'scape-park',       description_es: 'Parque de aventuras con zip lines, cenotes, tirolesas y playas naturales.' },
  { slug: 'punta-cana-caribbean-lake',     name_es: 'Caribbean Lake Park',            category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'caribbean-lake',   description_es: 'Parque acuático familiar con toboganes, piscinas y atracciones.' },
  { slug: 'punta-cana-el-dorado',          name_es: 'El Dorado Water Park',           category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'el-dorado',        description_es: 'Parque de agua con toboganes de adrenalina y zona infantil.' },
  { slug: 'punta-cana-bavaro-adventure',   name_es: 'Bavaro Adventure – Sacred River',category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'bavaro-adventure', description_es: 'Aventura en río sagrado con tubing, tirolesas y caminata en la selva.' },
  { slug: 'punta-cana-la-hacienda',        name_es: 'La Hacienda Park',               category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'la-hacienda',      description_es: 'Parque temático con caballos, buggies, tirolesas y mucho más.' },
  { slug: 'punta-cana-zipline',            name_es: 'Zipline Punta Cana',             category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Medio día',   image: 'zipline-buggies',  description_es: 'Tirolesas sobre la selva y la playa. Adrenalina pura en Punta Cana.' },
  { slug: 'punta-cana-buggies',            name_es: 'Buggies Punta Cana',             category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Medio día',   image: 'buggies',          description_es: 'Recorrido en buggies por la selva y Playa Macao.' },
  { slug: 'punta-cana-monkeyland',         name_es: 'Monkeyland',                     category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Medio día',   image: 'monkeyland',       description_es: 'Parque con monos, perezosos y fauna caribeña. Ideal para familias.' },
  { slug: 'punta-cana-delfines',           name_es: 'Delfines (Dolphin Experience)',  category: 'punta-cana', location: 'PUNTA CANA', price_type: 'quote', duration: 'Medio día',   image: 'delfines',         description_es: 'Nada y juega con delfines en Punta Cana. Experiencia única e inolvidable.' },

  // ─────────────────────────────────────────────
  // SAMANÁ
  // ─────────────────────────────────────────────

  { slug: 'samana-cayo-levantado',         name_es: 'Cayo Levantado',                 category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Día completo', image: 'cayo-levantado',      description_es: 'Isla paradisíaca conocida como "Bacardí Island". Playas de arena blanca y aguas turquesas.' },
  { slug: 'samana-ballenas-jorobadas',     name_es: 'Ballenas Jorobadas',             category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Medio día',   image: 'ballenas',            description_es: 'Avistamiento de ballenas jorobadas (temporada enero–marzo). Un espectáculo único en el mundo.' },
  { slug: 'samana-los-haitises',           name_es: 'Los Haitises',                   category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Día completo', image: 'los-haitises',        description_es: 'Parque Nacional con manglares, cuevas taínas, fauna exótica y paisajes de otro mundo.' },
  { slug: 'samana-playas-secretas-vip',    name_es: 'Playas Secretas VIP',            category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Día completo', image: 'playas-secretas',     description_es: 'Recorrido VIP en lancha privada a playas vírgenes e inaccesibles por tierra.' },
  { slug: 'samana-salto-del-limon',        name_es: 'Salto del Limón',                category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Medio día',   image: 'salto-limon',         description_es: 'La cascada más famosa de RD. Cabalgata o caminata a través de la naturaleza exuberante.' },
  { slug: 'samana-playa-rincon',           name_es: 'Playa Rincón',                   category: 'samana', location: 'SAMANÁ', price_type: 'quote', duration: 'Día completo', image: 'playa-rincon',        description_es: 'Considerada una de las mejores playas de América Latina. Virgen, sin desarrollo, perfecta.' },

  // ─────────────────────────────────────────────
  // PUERTO PLATA
  // ─────────────────────────────────────────────

  { slug: 'puerto-plata-ocean-world',      name_es: 'Ocean World',                    category: 'puerto-plata', location: 'PUERTO PLATA', price_type: 'quote', duration: 'Día completo', image: 'ocean-world',  description_es: 'Parque temático marino con delfines, tiburones y shows de aves exóticas.' },
  { slug: 'puerto-plata-27-charcos',       name_es: '27 Charcos de Damajagua',        category: 'puerto-plata', location: 'PUERTO PLATA', price_type: 'quote', duration: 'Medio día',   image: 'charcos',      description_es: '27 pozas naturales en cascada. Saltos de agua, toboganes naturales y aventura en la selva.' },
  { slug: 'puerto-plata-city-tour',        name_es: 'City Tour Puerto Plata',         category: 'puerto-plata', location: 'PUERTO PLATA', price_type: 'quote', duration: 'Día completo', image: 'puerto-plata', description_es: 'Teleférico, Fortaleza San Felipe, centro histórico victoriano y Playa Dorada.' },

  // ─────────────────────────────────────────────
  // PARQUES ACUÁTICOS
  // ─────────────────────────────────────────────

  { slug: 'parque-scape-park',             name_es: 'Scape Park',                     category: 'parques', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'scape-park',       description_es: 'Parque de aventuras con zip lines, cenotes, tirolesas y playas naturales.' },
  { slug: 'parque-caribbean-lake',         name_es: 'Caribbean Lake Park',            category: 'parques', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'caribbean-lake',   description_es: 'Parque acuático familiar con toboganes, piscinas y atracciones acuáticas.' },
  { slug: 'parque-el-dorado',              name_es: 'El Dorado Water Park',           category: 'parques', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'el-dorado',        description_es: 'Parque de agua con toboganes de adrenalina y zona infantil.' },
  { slug: 'parque-bavaro-adventure',       name_es: 'Bavaro Adventure – Sacred River',category: 'parques', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'bavaro-adventure', description_es: 'Aventura en río sagrado con tubing, tirolesas y caminata en la selva.' },
  { slug: 'parque-la-hacienda',            name_es: 'La Hacienda Park',               category: 'parques', location: 'PUNTA CANA', price_type: 'quote', duration: 'Día completo', image: 'la-hacienda',      description_es: 'Parque temático con caballos, buggies, tirolesas y mucho más.' },

  // ─────────────────────────────────────────────
  // EDUCATIVAS
  // ─────────────────────────────────────────────

  { slug: 'educativa-puerto-plata',        name_es: 'City Tour Puerto Plata Experience',category: 'educativas', location: 'PUERTO PLATA', price_type: 'quote', duration: 'Día completo', image: 'puerto-plata', description_es: 'Tour educativo a Puerto Plata: historia victoriana, Fortaleza de San Felipe y cultura caribeña.' },
  { slug: 'educativa-santiago',            name_es: 'City Tour Santiago Experience',   category: 'educativas', location: 'SANTIAGO',     price_type: 'quote', duration: 'Día completo', image: 'santiago',     description_es: 'Tour educativo a Santiago: Monumento a los Héroes, Centro Cultural León y murales urbanos.' },
  { slug: 'educativa-bani',                name_es: 'Tour Ecológico Cultural Baní',    category: 'educativas', location: 'BANÍ',         price_type: 'quote', duration: 'Día completo', image: 'bani',         description_es: 'Tour educativo: energía eólica, dunas, salinas y ecosistemas únicos de Baní.' },
  { slug: 'educativa-san-cristobal',       name_es: 'City Tour San Cristóbal Experience',category: 'educativas', location: 'SAN CRISTÓBAL',price_type: 'quote', duration: 'Día completo', image: 'san-cristobal',description_es: 'Tour educativo a San Cristóbal: historia, cultura y patrimonios históricos dominicanos.' },
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

/** Returns picsum placeholder for dev. Replace with /images/tours/[image]/hero.jpg in production. */
export function tourImageUrl(imageKey: string, w = 800, h = 500): string {
  return `https://picsum.photos/seed/${imageKey}/${w}/${h}`;
}
