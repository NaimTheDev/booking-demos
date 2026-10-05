import type { DemoEntry } from '../demo-entry'

// auto-restyle.com — WordPress/Elementor: white header with the gold-and-carbon "AR" shield, gold (#CC9933)
// Rubik uppercase buttons (5px radius), Playfair Display 700 headlines over a dark shop photo, Inter body.
// Instagram adds vinyl wraps, PPF and ceramic coatings. Every CTA is "GET A FREE QUOTE" (popup form) or a
// phone call. No prices published. Shop: 5317 Mahoning Ave (Austintown/Youngstown).
export default {
  client: {
    slug: 'automotive-restyle',
    name: 'Automotive Restyle',
    tagline: 'Window tint, vinyl wraps, PPF & ceramic coatings — Youngstown and nearby areas.',
    location: 'Youngstown, OH',
    region: 'northeast-ohio',
    address: '5317 Mahoning Ave, Youngstown, OH 44515',
    logo: { src: '/logos/automotive-restyle.jpg', background: '#FFFFFF' },
    primaryColor: '#CC9933',
    accentColor: '#1F1F1F',
    vertical: 'tint',
    services: [
      { id: 'ar-car-tint', name: 'Car Window Tinting', price: null, durationHours: 2.5, description: 'Union Carbon IR & Ceramic IR films with a lifetime warranty.', popular: true },
      { id: 'ar-tesla', name: 'Tesla Window Tinting', price: null, durationHours: 3, description: 'IR films with up to 98% heat reduction, including glass roofs.' },
      { id: 'ar-ppf', name: 'Paint Protection Film', price: null, durationHours: 8, description: 'Clear PPF for high-impact areas or full coverage.' },
      { id: 'ar-wrap', name: 'Vinyl Wraps', price: null, durationHours: 16, description: 'Color-change and accent wraps.' },
      { id: 'ar-ceramic', name: 'Ceramic Coating', price: null, durationHours: 6, description: 'Ceramic paint protection for gloss and easier washing.' },
      { id: 'ar-home', name: 'Home Window Tinting', price: null, durationHours: 4, description: 'UV and heat-rejecting film for residential windows.' },
      { id: 'ar-commercial', name: 'Commercial Window Film', price: null, durationHours: 6, description: 'Energy-saving and privacy film for storefronts and offices.' },
    ],
    addons: [],
    freeRadiusZones: ['Youngstown', 'Austintown', 'Boardman', 'Canfield', 'Niles', 'Warren', 'Poland', 'Girard', 'Columbiana', 'Salem', 'Struthers', 'Hermitage'],
  },
  theme: {
    googleFonts: ['Playfair+Display:wght@700;800', 'Rubik:wght@500', 'Inter:wght@400;600'],
    mode: 'light',
    display: { font: '"Playfair Display"', weight: 700, color: '#FFFFFF' },
    heading: { font: '"Playfair Display"', weight: 700, color: '#111111' },
    body: { font: 'Inter' },
    label: { font: 'Rubik', weight: 500, case: 'uppercase', tracking: '0.06em', color: '#CC9933' },
    radius: 6,
    colors: {
      page: '#F9F9F9',
      surface: '#FFFFFF',
      surfaceAlt: '#FAF5EA',
      text: '#1F1F1F',
      muted: '#666666',
      border: '#E3DED3',
      brand: '#CC9933',
      brandFg: '#FFFFFF',
      accent: '#B8862B',
    },
    button: { bg: '#CC9933', fg: '#FEFEFE', radius: 5, case: 'uppercase', weight: 500, font: 'Rubik' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#333333',
        logoSize: 'lg',
        action: { label: 'Call Us (330) 899-8846', href: 'tel:3308998846', style: 'button', color: '#CC9933' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), radial-gradient(ellipse at 70% 60%, #3a3a3a 0%, #121212 70%)',
      fg: '#FFFFFF',
      align: 'left',
      eyebrow: { text: 'Automotive Restyle', style: 'italic', color: '#CC9933' },
      headline: 'The Leading Window Tinting Specialists In Youngstown And Nearby Areas',
      sub: 'Pick your film and vehicle, choose a day, and we’ll have your bay ready — no waiting on a quote callback.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
