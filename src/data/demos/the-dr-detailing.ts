import type { DemoEntry } from '../demo-entry'

// thedrdetail.com — Squarespace: transparent header over a black-and-white wheel video, centered "The Dr." script
// badge, bold uppercase Helvetica Neue (Arimo fallback), warm-grey body text on a #E8E8E8 page, dark-grey and
// stone buttons with 10px corners. Prices from /detailing, /ceramic-coating and /ceramic-coating-1 (paint
// correction), all "starting at". "BOOK A DETAIL" / "BOOK NOW" just link to the /contact form today.
// Only starting prices are published, so every size tier keeps the starting price (no size multipliers).
const HELVETICA = '"Helvetica Neue", Helvetica, Arial, Arimo'

export default {
  client: {
    slug: 'the-dr-detailing',
    name: 'The Dr. Detailing',
    tagline: 'Luxury protection, expert detailing and ceramic coatings in Mentor.',
    location: 'Mentor, OH',
    region: 'northeast-ohio',
    address: '9436 Hamilton Dr, Mentor, OH 44060',
    logo: { src: '/logos/the-dr-detailing.webp', background: '#FFFFFF' },
    primaryColor: '#575757',
    accentColor: '#817A7A',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'sedan', label: 'Sedan / Coupe', hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV / Crossover', hoursMultiplier: 1.1 },
          { id: 'truck', label: 'Truck / 3-Row SUV', hoursMultiplier: 1.2 },
        ],
      },
    },
    services: [
      { id: 'dr-wash-seal', name: 'Exterior Wash & Seal', price: 150, startingAt: true, durationHours: 2, description: '3-stage pressure/hand wash, wheels & tires, bug/tar removal, 4-month paint sealant.' },
      { id: 'dr-full', name: 'A+ Full Detail', price: 220, startingAt: true, durationHours: 4, description: 'Complete interior and exterior detail.', popular: true },
      { id: 'dr-premium', name: 'AAA+ Premium Detail', price: 400, startingAt: true, durationHours: 6, description: 'Our most thorough inside-and-out detail.' },
      { id: 'dr-correct-1', name: '1-Step Paint Correction', price: 550, startingAt: true, durationHours: 6, description: 'Light swirls and minor scratches on newer or well-kept paint.' },
      { id: 'dr-correct-2', name: '2-Step Paint Correction', price: 750, startingAt: true, durationHours: 9, description: 'Cut and polish for moderate swirls and defects.' },
      { id: 'dr-correct-3', name: '3-Step Paint Correction', price: 1000, startingAt: true, durationHours: 12, description: 'Maximum defect removal for heavily marred paint.' },
      { id: 'dr-coat-2', name: '2-Year Ceramic Coating', price: 550, startingAt: true, durationHours: 8, description: 'Wash + full decon, correction package, coating on paint, trim and lights.' },
      { id: 'dr-coat-3', name: '3-Year Ceramic Coating', price: 650, startingAt: true, durationHours: 9, description: 'Longer-lasting hydrophobic protection.' },
      { id: 'dr-coat-5', name: '5-Year Ceramic Coating', price: 700, startingAt: true, durationHours: 10, description: 'Our top-tier coating.' },
    ],
    addons: [],
    freeRadiusZones: ['Mentor', 'Willoughby', 'Wickliffe', 'Eastlake', 'Willowick', 'Kirtland', 'Concord Township', 'Painesville', 'Madison'],
  },
  theme: {
    googleFonts: ['Arimo:ital,wght@0,400;0,500;0,700;1,700'],
    mode: 'light',
    display: { font: HELVETICA, weight: 700, case: 'uppercase', tracking: '-0.02em', color: '#FBFBFB' },
    heading: { font: HELVETICA, weight: 700, case: 'uppercase', tracking: '-0.01em', color: '#111111' },
    body: { font: HELVETICA },
    label: { font: HELVETICA, weight: 700, case: 'uppercase', tracking: '0.06em', color: '#817A7A' },
    radius: 10,
    colors: {
      page: '#E8E8E8',
      surface: '#FBFBFB',
      surfaceAlt: '#F0EFED',
      text: '#2B2828',
      muted: '#817A7A',
      border: '#D6D2CE',
      brand: '#575757',
      brandFg: '#FFFFFF',
      accent: '#817A7A',
    },
    button: { bg: '#575757', fg: '#FFFFFF', radius: 10, case: 'uppercase', weight: 700 },
    hero: {
      nav: {
        bg: '#1E1E1E',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call (440) 221-8852', href: 'tel:4402218852', style: 'outline' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.56)), radial-gradient(circle at 50% 45%, #bdbdbd 0%, #6e6e6e 40%, #2a2a2a 100%)',
      fg: '#FBFBFB',
      align: 'center',
      headline: 'Elite Protection for Your Vehicle',
      subline: 'Luxury protection · expert detailing · ceramic coatings',
      sub: 'Pick your detail, correction or coating and request a drop-off time in Mentor — we’ll confirm within the day.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
