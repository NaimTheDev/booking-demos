import type { DemoEntry } from '../demo-entry'

// hydrowerksllc.com — GoDaddy site: purple utility bar, near-black page, Archivo Black caps headline in
// violet-blue, Montserrat caps buttons. Veteran-owned soft wash + pressure wash out of Springfield.
// No prices are published ("Free Quote" form / call or text), so every service is a custom quote.
// Service area from the Google Business Profile and the Facebook intro.
export default {
  client: {
    slug: 'hydro-werks',
    name: 'Hydro Werks LLC',
    tagline: 'Veteran owned & operated soft wash + pressure wash.',
    location: 'Springfield, OH',
    region: 'southwest-ohio',
    address: 'Springfield, OH',
    logo: { src: '/logos/hydro-werks.png', background: '#161616' },
    primaryColor: '#4D35D4',
    accentColor: '#161616',
    vertical: 'exterior',
    services: [
      { id: 'hw-house', name: 'House Washing (Soft Wash)', price: null, durationHours: 3, description: 'Low-pressure soft wash with eco-friendly soaps that eat away grime without damaging siding.', popular: true },
      { id: 'hw-concrete', name: 'Concrete Cleaning', price: null, durationHours: 2, description: 'Driveways, sidewalks and patios — high-pressure cleaning that lifts dirt, grease and stains.' },
      { id: 'hw-brick', name: 'Brick Cleaning', price: null, durationHours: 2.5, description: 'Brick walls, patios and walkways cleaned of dirt, grime and stains.' },
      { id: 'hw-deck', name: 'Deck Restoration', price: null, durationHours: 4, description: 'Clean, stain or seal your deck so it looks great and lasts.' },
      { id: 'hw-fence', name: 'Fence Restoration', price: null, durationHours: 3, description: 'Strip grime, mold and algae from fencing and bring it back to life.' },
      { id: 'hw-gutters', name: 'Gutter Cleaning & Brightening', price: null, durationHours: 2, description: 'Clear debris and brighten streaked gutters.' },
      { id: 'hw-graffiti', name: 'Graffiti Removal', price: null, durationHours: 2, description: 'Remove unwanted graffiti from buildings, concrete and more.' },
      { id: 'hw-commercial', name: 'Commercial Pressure Washing', price: null, durationHours: 5, description: 'Restaurants to warehouses — plus car washes and hood and oven cleaning.' },
      { id: 'hw-fleet', name: 'Fleet Washing', price: null, durationHours: 3, description: 'Fleet vehicles, heavy machinery, equipment and tractor trailers.' },
    ],
    addons: [],
    freeRadiusZones: ['Springfield', 'Dayton', 'Urbana', 'Piqua', 'London', 'Bellefontaine', 'Russells Point'],
  },
  theme: {
    googleFonts: ['Archivo+Black', 'Montserrat:wght@400;600;700'],
    mode: 'dark',
    display: { font: '"Archivo Black"', weight: 400, case: 'uppercase', tracking: '0.01em', color: '#4F4FE0' },
    heading: { font: '"Archivo Black"', weight: 400, case: 'uppercase', tracking: '0.01em', color: '#FFFFFF' },
    body: { font: 'Montserrat' },
    label: { font: 'Montserrat', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#A9A9B8' },
    radius: 4,
    colors: {
      page: '#161616',
      surface: '#1F1F1F',
      surfaceAlt: '#282828',
      text: '#F6F6F6',
      muted: '#A9A9B8',
      border: '#353535',
      brand: '#4D35D4',
      brandFg: '#FFFFFF',
      accent: '#6F5BEA',
    },
    button: { bg: '#4D35D4', fg: '#FFFFFF', radius: 4, case: 'uppercase', tracking: '0.06em', weight: 700, font: 'Montserrat' },
    hero: {
      topBar: { bg: '#4D35D4', fg: '#FFFFFF', items: ['Call or Text (937) 504-1411 for a quick and easy quote today!'], align: 'center' },
      nav: {
        bg: '#161616',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Free Quote', href: 'tel:9375041411', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(22,22,22,0.92), rgba(22,22,22,0.92)), #161616',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Expert Pressure Washing Services',
      headlineColor: '#4F4FE0',
      sub: 'Revitalize your property with our eco-friendly pressure washing & soft washing. Pick a service and request your spot below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
