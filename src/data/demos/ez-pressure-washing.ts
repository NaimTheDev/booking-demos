import type { DemoEntry } from '../demo-entry'

// ezpressurewashingohio.com — WordPress/Elementor: black header with the green EZ logo, Poppins 700 uppercase hero
// over a house photo, Open Sans body, square green (#0EC226 / #059118) buttons. The home page promises
// "Pick A Day & Time — schedule your service", but every button goes to a quote form ("we will reach out within
// the same business day"). No prices published, so every service is a custom quote.
export default {
  client: {
    slug: 'ez-pressure-washing',
    name: 'EZ Pressure Washing',
    tagline: 'Residential & commercial exterior cleaning with lasting results.',
    location: 'Canton, OH',
    region: 'northeast-ohio',
    address: 'Canton, OH',
    logo: { src: '/logos/ez-pressure-washing.png', background: '#000000' },
    primaryColor: '#0EC226',
    accentColor: '#000000',
    vertical: 'exterior',
    services: [
      { id: 'ez-house', name: 'House Washing (Soft Wash)', price: null, durationHours: 3, description: 'Soft wash system that safely removes dirt, algae and mildew without damaging siding or paint.', popular: true },
      { id: 'ez-roof', name: 'Roof Cleaning', price: null, durationHours: 3, description: 'Low-pressure soft washing that eliminates black streaks, moss and organic buildup.' },
      { id: 'ez-concrete', name: 'Concrete Cleaning & Sealing', price: null, durationHours: 3, description: 'Driveways, sidewalks and patios deep cleaned, then sealed to protect the surface.' },
      { id: 'ez-windows', name: 'Window Cleaning', price: null, durationHours: 2, description: 'Streak-free, spotless windows inside and out.' },
      { id: 'ez-gutters', name: 'Gutter Cleaning', price: null, durationHours: 2, description: 'Gutters and downspouts cleared to prevent clogs and water damage.' },
      { id: 'ez-deck', name: 'Deck & Fence Cleaning', price: null, durationHours: 2.5, description: 'Grime, mold and weather stains washed off wood and composite.' },
      { id: 'ez-patio', name: 'Patio Cleaning', price: null, durationHours: 1.5, description: 'Dirt, algae and stains removed from concrete, paver or stone patios.' },
      { id: 'ez-fleet', name: 'Fleet Washing', price: null, durationHours: 3, description: 'On-site washing for trucks, vans, trailers and other commercial vehicles.' },
    ],
    addons: [],
    freeRadiusZones: ['Canton', 'North Canton', 'Massillon', 'Louisville', 'Jackson Township', 'Plain Township', 'Perry Township', 'Canal Fulton', 'Green', 'Uniontown', 'Hartville', 'Alliance'],
  },
  theme: {
    googleFonts: ['Poppins:wght@500;700', 'Open+Sans:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Poppins', weight: 700, case: 'uppercase', tracking: '0', color: '#FFFFFF' },
    heading: { font: 'Poppins', weight: 700, color: '#000000' },
    body: { font: '"Open Sans"' },
    label: { font: 'Poppins', weight: 500, color: '#0EC226' },
    radius: 4,
    colors: {
      page: '#F4F5F4',
      surface: '#FFFFFF',
      surfaceAlt: '#EFF8F0',
      text: '#2A2F4F',
      muted: '#6B7080',
      border: '#DADDE2',
      brand: '#059118',
      brandFg: '#FFFFFF',
      accent: '#0EC226',
    },
    button: { bg: '#059118', fg: '#FFFFFF', radius: 0, weight: 700, font: 'Poppins' },
    hero: {
      nav: {
        bg: '#000000',
        fg: '#FFFFFF',
        borderColor: '#FFFFFF',
        action: { label: '(330) 284-0588', href: 'tel:3302840588', style: 'button', color: '#059118' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), linear-gradient(180deg, #5d6b78 0%, #3c5a3a 70%, #2d4a2a 100%)',
      fg: '#FFFFFF',
      align: 'center',
      kicker: 'EZ Pressure Washing',
      headline: 'Residential & Commercial Services',
      highlight: 'With Lasting Results',
      highlightColor: '#FFFFFF',
      highlightOnNewLine: true,
      sub: 'Pick a service, pick a day and time — your exterior cleaning, booked in three easy steps.',
      size: 'lg',
      overlap: true,
    },
  },
} satisfies DemoEntry
