import type { DemoEntry } from '../demo-entry'

// ericspowerwashing.com (GoDaddy) — /our-services lists residential and commercial services; no prices, so all
// quotes. The only way in is the "Contact Us / Leave your info below" form or the phone number.
// Instagram: "Servicing all of Northeast Ohio" from Lakewood.
// Theme: Crimson Text serif headline over a power-washed paver photo, Lato body, black 4px uppercase buttons,
// translucent white header, blue/green house-and-spray logo.
export default {
  client: {
    slug: 'erics-power-washing',
    name: "Eric's Power Washing",
    tagline: 'Full service commercial & residential washing.',
    location: 'Lakewood, OH',
    region: 'northeast-ohio',
    address: 'Lakewood, OH 44107',
    logo: { src: '/logos/erics-power-washing.png', background: '#FFFFFF' },
    primaryColor: '#1A6FC4',
    accentColor: '#3FA535',
    vertical: 'exterior',
    services: [
      { id: 'epw-house', name: 'House Washing (Moss/Algae Removal)', price: null, durationHours: 3, description: 'Biodegradable detergent lifts dirt, pollen and algae from siding.', popular: true },
      { id: 'epw-concrete', name: 'Concrete Cleaning', price: null, durationHours: 2, description: 'Surface-cleaner equipment removes moss, algae and stains from drives and walks.' },
      { id: 'epw-roof', name: 'Roof Washing', price: null, durationHours: 3, description: 'Soft wash removes moss, algae and streaking without damaging shingles or tiles.' },
      { id: 'epw-gutter', name: 'Gutter Cleaning / Brightening', price: null, durationHours: 1.5, description: 'Gutters cleaned out and faces brightened.' },
      { id: 'epw-deck', name: 'Deck & Wood Cleaning', price: null, durationHours: 2, description: 'Decks, fences and wood surfaces cleaned.' },
      { id: 'epw-restaurant', name: 'Restaurant & Storefront Cleaning', price: null, durationHours: 3, description: 'Hot-water cleaning for grease and oil buildup, awnings and building washes.' },
      { id: 'epw-dumpster', name: 'Dumpster Pad Cleaning & Sanitization', price: null, durationHours: 1, description: 'Commercial dumpster areas cleaned and sanitized.' },
      { id: 'epw-lot', name: 'Parking Lot / Garage Cleaning & Striping', price: null, durationHours: 4, description: 'Parking garage cleaning and parking lot striping.' },
    ],
    addons: [{ id: 'epw-grease', name: 'Oil / Grease Stain Removal', price: null, addedHours: 1 }],
    freeRadiusZones: ['Lakewood', 'Rocky River', 'Cleveland', 'Fairview Park', 'Westlake', 'Bay Village', '44107'],
  },
  theme: {
    googleFonts: ['Crimson+Text:wght@400;600;700', 'Lato:wght@400;700'],
    mode: 'light',
    display: { font: '"Crimson Text", serif', weight: 700, color: '#111111' },
    heading: { font: '"Crimson Text", serif', weight: 700, color: '#111111' },
    body: { font: 'Lato' },
    label: { font: 'Lato', weight: 700, case: 'uppercase', tracking: '0.1em', color: '#555555' },
    radius: 4,
    colors: {
      page: '#F6F6F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F3F3',
      text: '#161616',
      muted: '#5C5C5C',
      border: '#E0E0E0',
      brand: '#1A6FC4',
      brandFg: '#FFFFFF',
      accent: '#3FA535',
    },
    button: { bg: '#000000', fg: '#FFFFFF', radius: 4, case: 'uppercase', tracking: '0.06em', weight: 700, font: 'Lato' },
    hero: {
      nav: {
        bg: 'rgba(255, 255, 255, 0.9)',
        fg: '#161616',
        action: { label: '216-645-6455', href: 'tel:2166456455', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), linear-gradient(120deg, #2f5a2c 0%, #7a4a3a 45%, #a4574a 70%, #c98a6a 100%)',
      fg: '#111111',
      align: 'center',
      box: 'rgba(255, 255, 255, 0.82)',
      headline: "Eric's Power Washing",
      subline: '216-645-6455',
      sub: 'Full service commercial & residential washing from Lakewood across Northeast Ohio. Pick a service and a time instead of leaving your info and waiting.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
