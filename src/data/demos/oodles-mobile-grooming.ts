import type { DemoEntry } from '../demo-entry'

// oodles.dog — Divi site: deep-purple nav bar, lavender-to-purple bubble hero with the flower-badge logo,
// groovy bubble headline "Immeasurably More Brought to Your Door", Open Sans body, purple rounded buttons.
// Owner Heidi Holland grooms dogs up to 50 lbs from a climate-controlled trailer. Prices from /services/
// ("starting at", by small vs medium breed). "Wait List" → "Request a Booking" form, then a call back.
export default {
  client: {
    slug: 'oodles-mobile-grooming',
    name: 'Oodles Mobile Grooming',
    tagline: 'Immeasurably more brought to your door.',
    location: 'Centerville, OH',
    region: 'southwest-ohio',
    address: 'Southern Dayton, OH',
    logo: { src: '/logos/oodles-mobile-grooming.png', background: '#FFFFFF' },
    primaryColor: '#59007A',
    accentColor: '#C59BDB',
    vertical: 'pet',
    sizeTiers: {
      pet: {
        label: 'Dog size',
        tiers: [
          { id: 'small', label: 'Small breed (up to 25 lbs)', hoursMultiplier: 1 },
          { id: 'medium', label: 'Medium breed (26–50 lbs)', hoursMultiplier: 1.25 },
        ],
      },
    },
    services: [
      {
        id: 'oo-full',
        name: 'Full Groom Package',
        price: 119,
        priceBySize: { small: 119, medium: 141 },
        startingAt: true,
        durationHours: 2,
        description: 'Everything in Bath & Tidy plus a haircut or shave-down. De-matting fees may apply.',
        popular: true,
      },
      {
        id: 'oo-bath',
        name: 'Bath & Tidy Package',
        price: 98,
        priceBySize: { small: 98, medium: 113 },
        startingAt: true,
        durationHours: 1.5,
        description: 'Hydro massage bath, face & feet trim, fluff dry, brush out, nails, sanitary trim, ears, spritz and a bow or bandana.',
      },
    ],
    addons: [
      { id: 'oo-anal', name: 'Anal Gland Expression', price: null, addedHours: 0.1 },
      { id: 'oo-breath', name: 'Breath Freshener', price: null, addedHours: 0.1 },
      { id: 'oo-pawlish', name: 'Pawlish', price: null, addedHours: 0.25 },
      { id: 'oo-deshed', name: 'De-Shedding Treatment', price: null, addedHours: 0.5 },
      { id: 'oo-balm', name: 'Paw Balm', price: null, addedHours: 0.1 },
      { id: 'oo-tuff', name: 'Tuff Mutts Mohawk or Mullet', price: null, addedHours: 0.25 },
    ],
    freeRadiusZones: ['Bellbrook', 'Centerville', 'Kettering', 'Lebanon', 'Miamisburg', 'Springboro'],
  },
  theme: {
    googleFonts: ['Shrikhand', 'Open+Sans:wght@400;500;600;700'],
    mode: 'light',
    display: { font: 'Shrikhand', weight: 400, color: '#59007A' },
    heading: { font: '"Open Sans"', weight: 700, color: '#380056' },
    body: { font: '"Open Sans"' },
    label: { font: '"Open Sans"', weight: 600, case: 'uppercase', tracking: '0.1em', color: '#7B3A99' },
    radius: 10,
    colors: {
      page: '#F7F0FB',
      surface: '#FFFFFF',
      surfaceAlt: '#F1E4F8',
      text: '#212121',
      muted: '#6A5A73',
      border: '#E2CFEC',
      brand: '#59007A',
      brandFg: '#FFFFFF',
      accent: '#9B4DC0',
    },
    button: { bg: '#59007A', fg: '#FFFFFF', radius: 5, weight: 600, font: '"Open Sans"' },
    hero: {
      nav: {
        bg: '#59007A',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call or text 937-232-4494', href: 'tel:9372324494', style: 'outline', color: '#FFFFFF' },
      },
      layout: 'banner',
      background: 'radial-gradient(circle at 12% 30%, rgba(255,255,255,0.7) 0 18px, transparent 19px), radial-gradient(circle at 88% 22%, rgba(255,255,255,0.6) 0 14px, transparent 15px), linear-gradient(180deg, #FFFFFF 0%, #EBDDF3 45%, #A55CC9 85%, #59007A 100%)',
      fg: '#380056',
      align: 'center',
      headline: 'Immeasurably More',
      highlight: 'Brought to Your Door',
      highlightColor: '#59007A',
      highlightOnNewLine: true,
      sub: 'Quiet, cage-free, one-on-one grooming in our climate-controlled mobile salon. Pick a package and request your spot below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
