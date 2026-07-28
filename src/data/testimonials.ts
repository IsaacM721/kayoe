import { resolveImage } from './images';

export interface Testimonial {
  id:     number;
  name:   string;
  city:   string;
  rating: number;
  text:   string;
  source: 'tripadvisor' | 'google';
  url?:   string;
  /** Decorative avatar. Faces are generic stock placeholders (not the actual
   *  reviewer — real reviews don't come with a photo release). Landscape
   *  shots use the site's own DR destination photos instead of a stranger's
   *  face, which fits better for handle-style names ("Silverwolf"). */
  avatarUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id:     1,
    name:   'Cristina Valbuena',
    city:   'España',
    rating: 5,
    text:   'Un gran acierto contratar excursiones con esta empresa. Guías increíbles, muy profesionales y con un conocimiento extraordinario de la historia colonial. Lo recomiendo 100%.',
    source: 'tripadvisor',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id:     2,
    name:   'Silverwolf',
    city:   'Estados Unidos',
    rating: 5,
    text:   'Muy profesionales, es increíble la experiencia. Nuestro guía hizo todo para que disfrutáramos al máximo. Una experiencia que no olvidaré jamás.',
    source: 'tripadvisor',
    avatarUrl: resolveImage('cayo-levantado', 150, 150),
  },
  {
    id:     3,
    name:   'Quinyena',
    city:   'Venezuela',
    rating: 5,
    text:   'Muy buen servicio. Desde el primer contacto con Geraldin todo fue profesional. El tour superó todas mis expectativas. Definitivamente volvería con Kayoe.',
    source: 'tripadvisor',
    avatarUrl: resolveImage('salto-limon', 150, 150),
  },
  {
    id:     4,
    name:   'Lanny Thompson Womacks',
    city:   'Estados Unidos',
    rating: 5,
    text:   'Excelente recorrido por la ciudad colonial. Leo es un guía extraordinario, lleno de conocimiento e historias fascinantes. Altamente recomendado para cualquier visitante.',
    source: 'google',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id:     5,
    name:   'Jessika Paz',
    city:   'Colombia',
    rating: 5,
    text:   'Tomamos 2 tours con la agencia. El free walking tour y el daypass a Isla Saona. Ambos fueron perfectos. La organización, los guías y la atención al cliente: 10/10.',
    source: 'google',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id:     6,
    name:   'Jensy López Guzmán',
    city:   'República Dominicana',
    rating: 5,
    text:   'Nuestra experiencia en el tour de Isla Saona fue más que increíble. Paisajes impresionantes, guía excepcional y organización impecable. ¡Volvería mil veces!',
    source: 'google',
    avatarUrl: 'https://i.pravatar.cc/150?img=14',
  },
];
