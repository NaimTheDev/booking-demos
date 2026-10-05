import type { DemoEntry } from '../demo-entry'

// djpowerwash.com — Squarespace: full-bleed house photo, Archivo Black uppercase headline, grey pill
// buttons in Space Grotesk, charcoal (#212020) sections, red house-shaped logo.
// Estimates only (form promises a quote in 24–48 hours); no prices are published.
export default {
  client: {
    slug: 'dj-power-wash',
    name: 'DJ Power Wash & Painting',
    tagline: 'We work best under pressure. Family owned and operated since 1991.',
    location: 'Lancaster, OH',
    region: 'central-ohio',
    address: 'Lancaster, OH 43130',
    logo: { src: '/logos/dj-power-wash.png', background: '#FFFFFF' },
    primaryColor: '#E73F3F',
    accentColor: '#212020',
    vertical: 'exterior',
    services: [
      { id: 'dj-house', name: 'House Washing', price: null, durationHours: 3, description: 'Two-step soft wash: anti-fungal pre-spray, then siding, soffits and gutter exteriors.', popular: true },
      { id: 'dj-roof', name: 'Roof Cleaning', price: null, durationHours: 3, description: 'Soft-wash roof cleaning to remove algae and black streaks.' },
      { id: 'dj-concrete', name: 'Driveways, Sidewalks & Patios', price: null, durationHours: 2, description: 'Hot water up to 200°F degreases driveways and brightens sidewalks.' },
      { id: 'dj-deck', name: 'Deck & Fence Cleaning', price: null, durationHours: 3, description: 'Wood and composite decks and fences, cleaned and ready to stain.' },
      { id: 'dj-gutter', name: 'Gutter & Downspout Cleaning', price: null, durationHours: 2, description: 'Unclog debris from gutters and downspouts. Gutter covers available.' },
      { id: 'dj-paint', name: 'Exterior Painting & Staining', price: null, durationHours: 16, description: 'Exterior painting and staining with Sherwin-Williams products.' },
      { id: 'dj-gravestone', name: 'Gravestone Cleaning', price: null, durationHours: 1, description: 'Gentle cleaning for headstones and monuments.' },
      { id: 'dj-commercial', name: 'Commercial Pressure Washing', price: null, durationHours: 4, description: 'Restaurants, banks, schools, storefronts, dumpster pads and graffiti removal.' },
    ],
    addons: [
      { id: 'dj-stain', name: 'Deck / Fence Staining', price: null, addedHours: 4 },
      { id: 'dj-gutter-covers', name: 'Gutter Cover Installation', price: null, addedHours: 2 },
    ],
    freeRadiusZones: [
      'Lancaster', 'Amanda', 'Ashville', 'Baltimore', 'Bexley', 'Bremen', 'Canal Winchester', 'Carroll', 'Circleville', 'Columbus',
      'Gahanna', 'Groveport', 'Logan', 'Millersport', 'Newark', 'New Albany', 'Pataskala', 'Pickerington', 'Reynoldsburg', 'Sugar Grove',
      'Thornville', 'Zanesville',
    ],
  },
  theme: {
    googleFonts: ['Archivo+Black', 'Space+Grotesk:wght@500;600;700', 'Inter:wght@400;600'],
    mode: 'light',
    display: { font: '"Archivo Black"', weight: 400, case: 'uppercase', tracking: '-0.02em', color: '#FFFFFF' },
    heading: { font: '"Archivo Black"', weight: 400, case: 'uppercase', tracking: '-0.01em', color: '#212020' },
    body: { font: 'Inter' },
    label: { font: '"Space Grotesk"', weight: 600, case: 'uppercase', tracking: '0.06em', color: '#212020' },
    radius: 4,
    colors: {
      page: '#DEDEDE',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F1F1',
      text: '#212020',
      muted: '#5A5858',
      border: '#CFCFCF',
      brand: '#E73F3F',
      brandFg: '#FFFFFF',
      accent: '#E73F3F',
    },
    button: { bg: '#BFBFBF', fg: '#000000', radius: 999, case: 'uppercase', tracking: '0.02em', weight: 600, font: '"Space Grotesk"' },
    hero: {
      topBar: { bg: '#BFBFBF', fg: '#000000', items: ['Call for a free estimate today — (740) 654-8140'], align: 'center' },
      nav: {
        bg: '#212020',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Contact Us', href: 'tel:7406548140', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(33,32,32,0.45), rgba(33,32,32,0.7)), linear-gradient(180deg, #7d9cc0 0%, #b9c7d6 38%, #6f8a52 62%, #3f5a2c 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'We work best under pressure.',
      sub: 'Soft washing for homes, roofs and decks — and exterior painting — across Central Ohio since 1991.',
      size: 'xl',
      overlap: false,
    },
  },
} satisfies DemoEntry
