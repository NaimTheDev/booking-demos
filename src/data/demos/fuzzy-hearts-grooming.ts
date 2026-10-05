import type { DemoEntry } from '../demo-entry'

// fuzzyheartsgrooming.dog — /services/pricing lists three services with "starting at" prices for under 20 lb,
// 21–50 lb and 51+ lb dogs, and says there are no add-ons (everything is included). Booking today is the
// contact form ("include a photo of your dog") or a call. Durations are estimates.
// Theme: GoDaddy site — white page, left sidebar nav, Raleway bold headings with wide tracking, red
// (#F94243) accents and square red buttons, red-brush dachshund logo.
export default {
  client: {
    slug: 'fuzzy-hearts-grooming',
    name: 'Fuzzy Hearts Grooming',
    tagline: 'The grooming salon comes to your home.',
    location: 'Brunswick, OH',
    region: 'northeast-ohio',
    address: 'Brunswick, OH',
    logo: { src: '/logos/fuzzy-hearts-grooming.jpg', background: '#FFFFFF' },
    primaryColor: '#F94243',
    accentColor: '#1B1B1B',
    vertical: 'pet',
    sizeTiers: {
      pet: {
        label: 'Dog weight',
        tiers: [
          { id: 'under-20', label: 'Under 20 lbs', hoursMultiplier: 1 },
          { id: '21-50', label: '21–50 lbs', hoursMultiplier: 1.2 },
          { id: '51-plus', label: '51+ lbs', hoursMultiplier: 1.4 },
        ],
      },
    },
    services: [
      { id: 'fh-bath', name: 'Bath & Nails (Short Haired)', price: 85, priceBySize: { 'under-20': 85, '21-50': 90, '51-plus': 95 }, startingAt: true, durationHours: 1, description: 'Bath, blow dry, brush out, nails trimmed and ears cleaned.' },
      { id: 'fh-deshed', name: 'Bath & De-shed (Medium / Double Coat)', price: 95, priceBySize: { 'under-20': 95, '21-50': 105, '51-plus': 120 }, startingAt: true, durationHours: 1.5, description: 'Bath, blow dry, de-shed, nails and ears, plus light trimming (sanitary, paw pads, belly, rear, leg furnishings).' },
      { id: 'fh-groom', name: 'Full Groom / Haircut', price: 95, priceBySize: { 'under-20': 95, '21-50': 105, '51-plus': 160 }, startingAt: true, durationHours: 2, description: 'Bath, blow dry, haircut, nails trimmed and ears cleaned. 21–50 lb dogs run $105–$140.', popular: true },
    ],
    addons: [],
    freeRadiusZones: ['Brunswick', 'Strongsville', 'Medina', 'Valley City', 'Hinckley'],
  },
  theme: {
    googleFonts: ['Raleway:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Raleway', weight: 700, tracking: '0.03em', color: '#1B1B1B' },
    heading: { font: 'Raleway', weight: 700, tracking: '0.02em', color: '#1B1B1B' },
    body: { font: 'Raleway' },
    label: { font: 'Raleway', weight: 600, case: 'uppercase', tracking: '0.14em', color: '#8A8A8A' },
    radius: 0,
    colors: {
      page: '#FFFFFF',
      surface: '#FFFFFF',
      surfaceAlt: '#F7F7F7',
      text: '#1B1B1B',
      muted: '#6E6E6E',
      border: '#E4E4E4',
      brand: '#F94243',
      brandFg: '#FFFFFF',
      accent: '#E0393A',
    },
    button: { bg: '#F94243', fg: '#FFFFFF', radius: 0, case: 'uppercase', tracking: '0.14em', weight: 700, font: 'Raleway' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#1B1B1B',
        borderColor: '#EEEEEE',
        logoSize: 'lg',
        action: { label: '234-802-5353', href: 'tel:2348025353', style: 'text', color: '#E0393A' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(255,255,255,0.86), rgba(255,255,255,0.86)), linear-gradient(135deg, #d9dde2 0%, #f1f1f1 60%, #c9cfd4 100%)',
      fg: '#1B1B1B',
      align: 'center',
      eyebrow: { text: 'Welcome', style: 'caps', color: '#E0393A' },
      headline: 'Mobile Dog Grooming',
      sub: 'Full-service grooming in our climate-controlled trailer, right in your driveway — Brunswick, Strongsville, Medina, Valley City and Hinckley. Pick your dog’s size and service and grab a time.',
      ornament: 'rule',
      ornamentColor: '#F94243',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
