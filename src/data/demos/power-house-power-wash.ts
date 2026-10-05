import type { DemoEntry } from '../demo-entry'

// thepowerhousepros.com (GoHighLevel site builder, no calendar) — single page lists house washing, roof cleaning,
// gutter cleaning, pressure washing, driveway sealing, Christmas lights and permanent lighting. No prices, so all
// quotes. Every "Get An Estimate" scrolls to a request form. Service area from their Facebook page.
// Theme: white header with the dark-red house logo, Montserrat nav, Fira Sans headings, Roboto body, square
// royal-blue (#1254AB) buttons over a darkened truck/house photo.
export default {
  client: {
    slug: 'power-house-power-wash',
    name: 'Power House Power Wash',
    tagline: 'Family-owned exterior cleaning and lighting in Lorain County.',
    location: 'Elyria, OH',
    region: 'northeast-ohio',
    address: 'Elyria, OH',
    logo: { src: '/logos/power-house-power-wash.png', background: '#FFFFFF' },
    primaryColor: '#1254AB',
    accentColor: '#9B0F14',
    vertical: 'exterior',
    services: [
      { id: 'ph-house', name: 'House Washing (Soft Wash)', price: null, durationHours: 3, description: 'Soft washing that lifts algae, dirt and debris from siding without damage.', popular: true },
      { id: 'ph-roof', name: 'Roof Cleaning', price: null, durationHours: 3, description: 'Eco-friendly soft wash that removes the black streaks damaging your shingles.' },
      { id: 'ph-gutter', name: 'Gutter Cleaning', price: null, durationHours: 2, description: 'Gutters cleared and flushed so water drains properly.' },
      { id: 'ph-pressure', name: 'Pressure Washing (Driveways, Patios, Decks)', price: null, durationHours: 2, description: 'Concrete, walks, patios and decks — residential and commercial.' },
      { id: 'ph-xmas', name: 'Christmas Light Installation', price: null, durationHours: 4, description: 'Custom design, lights, install, maintenance, February take-down and storage.' },
      { id: 'ph-permanent', name: 'Permanent Lighting', price: null, durationHours: 6, description: 'Year-round app-controlled lighting — colors, patterns and effects.' },
    ],
    addons: [{ id: 'ph-seal', name: 'Driveway Sealing', price: null, addedHours: 2 }],
    freeRadiusZones: ['Elyria', 'North Ridgeville', 'Avon Lake', 'Westlake', 'Bay Village', 'Rocky River', 'Columbia Station', 'Grafton', 'Vermilion', 'Lorain County'],
  },
  theme: {
    googleFonts: ['Fira+Sans:wght@400;500;600;700', 'Roboto:wght@400;500;700', 'Montserrat:wght@500;600'],
    mode: 'light',
    display: { font: '"Fira Sans"', weight: 600, color: '#FFFFFF' },
    heading: { font: '"Fira Sans"', weight: 600, color: '#111111' },
    body: { font: 'Roboto' },
    label: { font: 'Montserrat', weight: 500, case: 'uppercase', tracking: '0.1em', color: '#C8102E' },
    radius: 0,
    colors: {
      page: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F5FB',
      text: '#1A1A1A',
      muted: '#5F6670',
      border: '#DCE3EC',
      brand: '#1254AB',
      brandFg: '#FFFFFF',
      accent: '#9B0F14',
    },
    button: { bg: '#1254AB', fg: '#FFFFFF', radius: 0, weight: 500, font: '"Fira Sans"' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#111111',
        action: { label: '440-848-5253', href: 'tel:4408485253', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(20,35,70,0.6), rgba(20,35,70,0.6)), linear-gradient(160deg, #6f8fb0 0%, #4c6a4a 55%, #2e3a2c 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Power House Power Wash',
      sub: 'Locally owned and family-operated — house washing, roof and gutter cleaning, pressure washing, plus Christmas and permanent lighting. Request your spot below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
