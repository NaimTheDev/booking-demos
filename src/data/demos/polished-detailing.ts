import type { DemoEntry } from '../demo-entry'

// polishedcincinnati.com — Squarespace: transparent header over a drone video, gold POLISHED logo, Kepler serif
// headlines (Adobe — Crimson Pro is the closest Google match), yellow pill buttons with black text, charcoal panels.
// Prices from the site: interior from $200, exterior from $100, paint correction from $300, ceramic from $1,000,
// monthly maintenance $125/$150/$175, boats per foot (30 ft and under).
export default {
  client: {
    slug: 'polished-detailing',
    name: 'Polished Automotive Detailing',
    tagline: 'Pristine. Perfection. Polished.',
    location: 'Cincinnati, OH',
    region: 'southwest-ohio',
    address: 'Cincinnati, OH',
    logo: { src: '/logos/polished-detailing.webp', background: '#282D30' },
    primaryColor: '#FED400',
    accentColor: '#282D30',
    vertical: 'multi',
    sizeTiers: {
      marine: {
        label: 'Boat length (30 ft and under)',
        tiers: [
          { id: 'under-20', label: 'Under 20 ft', hoursMultiplier: 1, referenceFeet: 18 },
          { id: '20-26', label: '20 – 26 ft', hoursMultiplier: 1.2, referenceFeet: 24 },
          { id: '27-30', label: '27 – 30 ft', hoursMultiplier: 1.4, referenceFeet: 30 },
        ],
      },
    },
    services: [
      { id: 'pad-interior', name: 'Interior Detail', price: 200, priceBySize: { sedan: 200, suv: null, truck: null }, startingAt: true, durationHours: 3, description: 'Steam clean, shampoo and extraction, leather care and glass. Price depends on size and condition.', category: 'auto', popular: true },
      { id: 'pad-exterior', name: 'Exterior Detail', price: 100, priceBySize: { sedan: 100, suv: null, truck: null }, startingAt: true, durationHours: 2, description: 'Foam hand wash, wheels and tires, clay bar and spray wax.', category: 'auto' },
      { id: 'pad-maintenance', name: 'Monthly Maintenance Detail', price: 125, priceBySize: { sedan: 125, suv: 150, truck: 175 }, durationHours: 2, description: 'Monthly interior and exterior refresh with ceramic spray sealant.', category: 'auto' },
      { id: 'pad-correction', name: 'Paint Correction', price: 300, priceBySize: { sedan: 300, suv: null, truck: null }, startingAt: true, durationHours: 5, description: 'One-step enhancement and up — removes swirls and scratches.', category: 'auto' },
      { id: 'pad-ceramic', name: 'Ceramic Coating (3 or 5 yr)', price: 1000, priceBySize: { sedan: 1000, suv: null, truck: null }, startingAt: true, durationHours: 8, description: 'Gtechniq ceramic coating with full decontamination prep.', category: 'auto' },
      { id: 'pad-boat-wash', name: 'Boat Wash Only', price: 8, priceUnit: 'per-foot', startingAt: true, durationHours: 2, description: 'Pressure rinse and foam hand wash.', category: 'marine' },
      { id: 'pad-boat-wax-ext', name: 'Boat Wash & Wax — Exterior Only', price: 20, priceUnit: 'per-foot', startingAt: true, durationHours: 4, description: 'Wash, non-skid, vinyl UV protectant, brightwork and marine sealant.', category: 'marine' },
      { id: 'pad-boat-wax-full', name: 'Boat Wash & Wax — Full Interior & Exterior', price: 30, priceUnit: 'per-foot', startingAt: true, durationHours: 5, description: 'Everything above plus interior, compartments, hatches and bimini top.', category: 'marine' },
      { id: 'pad-boat-polish-ext', name: 'Boat Cut & Polish — Exterior Only', price: 30, priceUnit: 'per-foot', startingAt: true, durationHours: 7, description: 'Multi-stage compounding to remove oxidation, finished with marine paste wax.', category: 'marine' },
      { id: 'pad-boat-polish-full', name: 'Boat Cut & Polish — Full Interior & Exterior', price: 40, priceUnit: 'per-foot', startingAt: true, durationHours: 8, description: 'Full gelcoat restoration plus the full interior wash & wax.', category: 'marine' },
    ],
    addons: [
      { id: 'pad-sealant', name: 'Paint Sealant (6–12 months)', price: null, addedHours: 1, category: 'auto' },
    ],
    freeRadiusZones: ['Cincinnati'],
  },
  theme: {
    googleFonts: ['Crimson+Pro:wght@400;600;700', 'Mulish:wght@400;600;700'],
    mode: 'dark',
    display: { font: '"Crimson Pro"', weight: 700, color: '#FFFFFF' },
    heading: { font: '"Crimson Pro"', weight: 600, color: '#FED400' },
    body: { font: 'Mulish' },
    label: { font: 'Mulish', weight: 700, case: 'uppercase', tracking: '0.18em', color: '#C9C9C9' },
    radius: 12,
    colors: {
      page: '#1E2224',
      surface: '#282D30',
      surfaceAlt: '#323840',
      text: '#F8F8F8',
      muted: '#B0B4B8',
      border: '#3C4348',
      brand: '#FED400',
      brandFg: '#000000',
      accent: '#FED400',
    },
    button: { bg: '#FED400', fg: '#000000', radius: 999, weight: 600, font: '"Crimson Pro"' },
    hero: {
      nav: {
        bg: 'transparent',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call/text Casey 513-800-7333', href: 'tel:5138007333', style: 'text', color: '#FED400' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), radial-gradient(ellipse at 60% 40%, #8A8A7E 0%, #4A4C48 55%, #26282A 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: "Cincinnati's Premium Mobile Car Detailing Service",
      sub: 'Interior & exterior detailing, ceramic coatings and boat detailing delivered to your home, workplace or marina. Pick a service and lock in your date.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
