import type { DemoEntry } from '../demo-entry'

// baysidemobilegrooming.com — /services and /faq: all-inclusive groom from $95, all-inclusive bath from $85,
// nail trims $20 + $10 travel fee; dogs under 30 lb only; serves Bay Village, Avon, Avon Lake and Westlake.
// Booking today: "text message or email us … we will let you know if we have availability"; replies within 24h.
// Theme: Squarespace — warm cream page (#F8F2E7), deep navy (#0C1D40), coral badge (#F26B5B), wide-tracked
// uppercase sans nav, light-weight headings, cream wordmark logo (needs a navy plate).
export default {
  client: {
    slug: 'bayside-mobile-grooming',
    name: 'Bayside Mobile Pet Grooming',
    tagline: 'Always one-on-one grooming, in your driveway.',
    location: 'Bay Village, OH',
    region: 'northeast-ohio',
    address: 'Bay Village, OH',
    logo: { src: '/logos/bayside-mobile-grooming.png', background: '#0C1D40' },
    primaryColor: '#0C1D40',
    accentColor: '#F26B5B',
    vertical: 'pet',
    sizeTiers: {
      pet: { label: 'Dog size', tiers: [{ id: 'under-30', label: 'Dogs under 30 lbs', hoursMultiplier: 1 }] },
    },
    services: [
      { id: 'bmg-groom', name: 'All-Inclusive Grooming Package', price: 95, startingAt: true, durationHours: 1.5, description: 'Soothing shampoo, moisturizing conditioner, hand blow dry, brush & comb out, nail trim & filing, ear cleaning and haircut.', popular: true },
      { id: 'bmg-bath', name: 'All-Inclusive Bath Package', price: 85, startingAt: true, durationHours: 1, description: 'Shampoo, conditioner, hand blow dry, brush out, nails and ears — no haircut.' },
      { id: 'bmg-nails', name: 'Nail Trim Visit', price: 20, durationHours: 0.5, description: 'Nail trim for any breed or size ($20 per pet + $10 travel fee; additional dogs at the same stop $20).' },
    ],
    addons: [{ id: 'bmg-matting', name: 'Matted Coat', price: null, addedHours: 0.5 }],
    freeRadiusZones: ['Bay Village', 'Avon Lake', 'Avon', 'Westlake'],
  },
  theme: {
    googleFonts: ['Montserrat:wght@500;600;700', 'Mulish:wght@300;400;600'],
    mode: 'light',
    display: { font: 'Mulish', weight: 300, tracking: '0.02em', color: '#FFFFFF' },
    heading: { font: 'Mulish', weight: 600, tracking: '0.01em', color: '#0C1D40' },
    body: { font: 'Mulish' },
    label: { font: 'Montserrat', weight: 600, case: 'uppercase', tracking: '0.16em', color: '#0C1D40' },
    radius: 4,
    colors: {
      page: '#F8F2E7',
      surface: '#FFFFFF',
      surfaceAlt: '#FBF7F0',
      text: '#1C1C1C',
      muted: '#6B6660',
      border: '#E7DDCC',
      brand: '#0C1D40',
      brandFg: '#F8F2E7',
      accent: '#F26B5B',
    },
    button: { bg: '#0C1D40', fg: '#F8F2E7', radius: 4, case: 'uppercase', tracking: '0.16em', weight: 600, font: 'Montserrat' },
    hero: {
      nav: {
        bg: '#0C1D40',
        fg: '#F8F2E7',
        action: { label: '216-310-6595', href: 'sms:2163106595', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(12,29,64,0.72), rgba(12,29,64,0.72)), linear-gradient(120deg, #6b3a2e 0%, #3c2a26 45%, #1b1f2c 100%)',
      fg: '#F8F2E7',
      align: 'center',
      eyebrow: { text: 'Bay Village · Avon · Avon Lake · Westlake', style: 'caps', color: '#F26B5B' },
      headline: 'Always 1 on 1',
      sub: 'Kayla brings the salon to your driveway for dogs under 30 lbs. Choose a package and a time here instead of texting back and forth about availability.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
