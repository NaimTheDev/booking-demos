import type { DemoEntry } from '../demo-entry'

// deamautocare.com — custom-built site: frosted light-grey header with the DAC shield and a spaced "DEAM AUTO
// CARE" wordmark, huge black 900-weight headline with "ADVANCED" in blue, pill eyebrow badge, blue 8px buttons.
// Every BOOK NOW / BOOK ONLINE / SCHEDULE NOW button opens a Wix quote-request form (forms.deamautocare.com).
// Prices from the service pages: detailing by car vs truck/SUV, tint by coupe/sedan/truck ("starting at"),
// ceramic + correction "starting at" for sedans, wrap tiers "+". $100 deposit to secure ceramic bookings.
export default {
  client: {
    slug: 'deam-auto-care',
    name: 'Deam Auto Care',
    tagline: "Sidney, Ohio's premier detailing experience.",
    location: 'Sidney, OH',
    region: 'southwest-ohio',
    address: '219 N Ohio Ave, Sidney, OH 45365',
    logo: { src: '/logos/deam-auto-care.png', background: '#E4EAF1' },
    primaryColor: '#0B62DA',
    accentColor: '#1D2530',
    vertical: 'multi',
    sizeTiers: {
      auto: {
        label: 'Vehicle',
        tiers: [
          { id: 'car', label: 'Car', hoursMultiplier: 1 },
          { id: 'truck-suv', label: 'Truck / SUV', hoursMultiplier: 1.2 },
        ],
      },
      tint: {
        label: 'Vehicle',
        tiers: [
          { id: 'coupe', label: 'Coupe', hoursMultiplier: 1 },
          { id: 'sedan', label: 'Sedan', hoursMultiplier: 1.15 },
          { id: 'truck-suv', label: 'Truck / SUV', hoursMultiplier: 1.3 },
        ],
      },
    },
    services: [
      { id: 'dac-premium', name: 'Premium Detail Package', price: 320, priceBySize: { car: 320, 'truck-suv': 350 }, durationHours: 6, description: 'Everything in Basic plus tar removal, iron & clay treatment, 6-month sealant, engine bay, shampoo and ozone.', category: 'auto', popular: true },
      { id: 'dac-basic', name: 'Basic Detail Package', price: 220, priceBySize: { car: 220, 'truck-suv': 250 }, durationHours: 4, description: 'Hand wash, bugs, windows, wheels & tires, door jambs, vacuum, plastics and a 3-month sealant.', category: 'auto' },
      { id: 'dac-ext', name: 'Premium Exterior', price: 150, priceBySize: { car: 150, 'truck-suv': 160 }, durationHours: 3, description: 'Hand wash, bug/tar removal, wheels, jambs, clay treatment, engine bay and a 6-month sealant.', category: 'auto' },
      { id: 'dac-int', name: 'Premium Interior', price: 200, priceBySize: { car: 200, 'truck-suv': 220 }, durationHours: 3, description: 'Vacuum, plastics, leather, mats, UV protectant, carpet/seat shampoo and ozone if needed.', category: 'auto' },
      { id: 'dac-ceramic-3', name: 'Ceramic Coating — 3 Year (Devil\'s Blood)', price: 999, startingAt: true, durationHours: 10, description: 'Wash, clay, light paint correction and 1 layer of Fireball Devil\'s Blood. Starting price for sedans.', category: 'auto' },
      { id: 'dac-ceramic-5', name: 'Ceramic Coating — 5 Year (Silla)', price: 1499, startingAt: true, durationHours: 14, description: '2-stage paint correction, Fireball Silla coating and wheel faces. Starting price for sedans.', category: 'auto' },
      { id: 'dac-ceramic-10', name: 'Ceramic Coating — 10 Year (Dok-Do)', price: 1800, startingAt: true, durationHours: 18, description: 'Multi-stage correction, 2 layers of Dok-Do, wheel faces and windshield. Starting price for sedans.', category: 'auto' },
      { id: 'dac-correction', name: 'Paint Correction — Stage 2', price: 549, startingAt: true, durationHours: 16, description: 'Two-step correction removing 80–90% of defects, with exterior detail and 6-month sealant.', category: 'auto' },
      { id: 'dac-tint-ceramic', name: 'Ceramic Window Tint', price: 350, priceBySize: { coupe: 350, sedan: 450, 'truck-suv': 500 }, startingAt: true, durationHours: 3, description: 'Our most popular film — 82% heat rejection. Side and rear windows.', category: 'tint', popular: true },
      { id: 'dac-tint-carbon', name: 'Carbon Window Tint', price: 250, priceBySize: { coupe: 250, sedan: 350, 'truck-suv': 400 }, startingAt: true, durationHours: 3, description: 'Baseline film with excellent privacy and just under 60% heat rejection.', category: 'tint' },
      { id: 'dac-tint-apex', name: 'Apex Window Tint', price: 450, priceBySize: { coupe: 450, sedan: 550, 'truck-suv': 600 }, startingAt: true, durationHours: 3, description: 'Top-tier film with over 94% heat rejection.', category: 'tint' },
      { id: 'dac-front-doors', name: 'Factory Match Front Doors (Carbon)', price: 150, startingAt: true, durationHours: 1, description: 'Match your factory rear tint on the front doors.', category: 'tint' },
      { id: 'dac-wrap-accent', name: 'Accent Wrap', price: 300, startingAt: true, durationHours: 4, description: 'Roof, chrome delete or hood in 3M, Avery Dennison or KPMF film.', category: 'tint' },
      { id: 'dac-wrap-full', name: 'Full Vinyl Wrap', price: 3000, startingAt: true, durationHours: 80, description: 'Complete color change. 10+ day installation.', category: 'tint' },
    ],
    addons: [
      { id: 'dac-windshield', name: 'Windshield Tint (Carbon)', price: 150, startingAt: true, addedHours: 1, category: 'tint' },
      { id: 'dac-glass', name: 'Glass Shield Windshield Coating', price: 100, addedHours: 0.5, category: 'auto' },
      { id: 'dac-wheels', name: 'Talon Wheel Coating (Faces)', price: 150, addedHours: 1, category: 'auto' },
    ],
    freeRadiusZones: ['Sidney', 'Piqua', 'Troy', 'Anna', 'Bellefontaine', 'Urbana', 'Wapakoneta', 'Lima', 'Dayton'],
  },
  theme: {
    googleFonts: ['Inter:wght@400;500;700;900', 'Rajdhani:wght@600;700'],
    mode: 'light',
    display: { font: 'Inter', weight: 900, case: 'uppercase', tracking: '0.01em', color: '#1D2530' },
    heading: { font: 'Inter', weight: 900, case: 'uppercase', color: '#1D2530' },
    body: { font: 'Inter' },
    label: { font: 'Inter', weight: 700, case: 'uppercase', tracking: '0.12em', color: '#0B62DA' },
    radius: 8,
    colors: {
      page: '#F9FAFB',
      surface: '#FFFFFF',
      surfaceAlt: '#E4EAF1',
      text: '#1D2530',
      muted: '#5B6675',
      border: '#D3DCE6',
      brand: '#0B62DA',
      brandFg: '#FFFFFF',
      accent: '#1F7AF9',
    },
    button: { bg: '#0B62DA', fg: '#FFFFFF', radius: 8, case: 'uppercase', tracking: '0.02em', weight: 700, font: 'Inter' },
    hero: {
      nav: {
        bg: 'rgba(228, 234, 241, 0.95)',
        fg: '#1D2530',
        borderColor: '#C9D3DF',
        wordmark: 'Deam Auto Care',
        action: { label: 'Book Now', href: 'tel:9379091993', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(120deg, rgba(228,234,241,0.97) 0%, rgba(228,234,241,0.9) 55%, rgba(160,168,178,0.85) 100%), #C9D0D8',
      fg: '#1D2530',
      align: 'center',
      eyebrow: { text: "Sidney, Ohio's premier detailing", style: 'pill', color: '#0B62DA' },
      headline: 'Experience',
      highlight: 'Advanced Auto Care',
      highlightColor: '#0B62DA',
      highlightOnNewLine: true,
      sub: 'Ceramic coatings • Professional detailing • Window tinting • Paint correction • Vinyl wraps',
      size: 'xl',
      overlap: false,
    },
  },
} satisfies DemoEntry
