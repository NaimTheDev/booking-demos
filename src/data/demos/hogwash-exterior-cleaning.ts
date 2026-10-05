import type { DemoEntry } from '../demo-entry'

// hogwashexteriorcleaning.com — Next.js one-pager: pale blue-white page, sticky frosted header, Sora bold
// headlines with tight tracking, Inter body, bright-blue pill buttons, dark photo hero. Owner-operated
// (the owner is on every job) out of Farmersville. No prices: "we price most jobs over the phone".
export default {
  client: {
    slug: 'hogwash-exterior-cleaning',
    name: 'Hogwash Exterior Cleaning',
    tagline: 'Fresh exterior cleaning without the hassle.',
    location: 'Farmersville, OH',
    region: 'southwest-ohio',
    address: 'Farmersville, OH',
    logo: { src: '/logos/hogwash-exterior-cleaning.png', background: '#FFFFFF' },
    primaryColor: '#1573D4',
    accentColor: '#0E1B2A',
    vertical: 'exterior',
    services: [
      { id: 'hog-roof', name: 'Roof Washing', price: null, durationHours: 3, description: 'Low-pressure soft wash that treats algae, moss, lichen and dark streaks without damaging shingles.', popular: true },
      { id: 'hog-house', name: 'House Washing', price: null, durationHours: 3, description: 'Heavy algae and grime removed from siding without harsh pressure.' },
      { id: 'hog-concrete', name: 'Driveways & Concrete', price: null, durationHours: 2, description: 'Years of dirt and tire staining lifted off residential concrete.' },
      { id: 'hog-pavers', name: 'Pavers', price: null, durationHours: 3, description: 'Weeds and buildup cleared to bring the paver pattern back to life.' },
      { id: 'hog-wood', name: 'Decks & Fences', price: null, durationHours: 3, description: 'Weathered gray wood brought back to a warm, natural finish.' },
      { id: 'hog-gutters', name: 'Gutter Cleaning & Brightening', price: null, durationHours: 1.5, description: 'Gutters cleared and the outside faces brightened.' },
    ],
    addons: [],
    freeRadiusZones: ['Farmersville', 'Dayton'],
  },
  theme: {
    googleFonts: ['Sora:wght@600;700', 'Inter:wght@400;500;600;700'],
    mode: 'light',
    display: { font: 'Sora', weight: 700, tracking: '-0.03em', color: '#FFFFFF' },
    heading: { font: 'Sora', weight: 700, tracking: '-0.02em', color: '#0E1B2A' },
    body: { font: 'Inter' },
    label: { font: 'Inter', weight: 700, case: 'uppercase', tracking: '0.14em', color: '#1573D4' },
    radius: 14,
    colors: {
      page: '#F5F8FC',
      surface: '#FFFFFF',
      surfaceAlt: '#EAF3FC',
      text: '#0E1B2A',
      muted: '#55657A',
      border: '#D9E3EF',
      brand: '#1573D4',
      brandFg: '#FFFFFF',
      accent: '#1573D4',
    },
    button: { bg: '#1573D4', fg: '#FFFFFF', radius: 999, weight: 600, font: 'Inter' },
    hero: {
      nav: {
        bg: 'rgba(245, 248, 252, 0.92)',
        fg: '#0E1B2A',
        wordmark: 'Hogwash',
        action: { label: 'Free quote', href: 'tel:5623436588', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(11,21,32,0.72), rgba(11,21,32,0.72)), linear-gradient(135deg, #5d6b78 0%, #2b3540 60%, #11181f 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Serving the Dayton area', style: 'caps', color: '#9CC8F5' },
      headline: 'Fresh exterior cleaning without the hassle.',
      sub: 'Roof, house, concrete and wood cleaning from the owner himself. Choose your services and request a day below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
