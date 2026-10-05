import type { DemoEntry } from '../demo-entry'

// soakcitysoftwash.com — Duda site: dark-navy utility bar with cyan "GET A FREE ESTIMATE" line, white header,
// Poppins hero over a navy-tinted photo, Crimson Text italic tagline, navy pill buttons. Family-run, Troy.
// No prices published; the quote form asks for house size (1 story / 1.5–2+ story), mirrored as size tiers.
// Service area from the /service-area page and the Facebook page.
export default {
  client: {
    slug: 'soak-city-softwash',
    name: 'Soak City Softwash',
    tagline: 'Exterior pressure washing at its best.',
    location: 'Troy, OH',
    region: 'southwest-ohio',
    address: '1453 Michael Dr, Troy, OH 45373',
    logo: { src: '/logos/soak-city-softwash.png', background: '#FFFFFF' },
    primaryColor: '#0D0F8D',
    accentColor: '#29ABE2',
    vertical: 'exterior',
    sizeTiers: {
      exterior: {
        label: 'House size',
        tiers: [
          { id: '1-story', label: '1 Story House', hoursMultiplier: 1 },
          { id: '2-story', label: '1.5 – 2+ Story House', hoursMultiplier: 1.4 },
          { id: 'commercial', label: 'Commercial Property', hoursMultiplier: 1.8 },
        ],
      },
    },
    services: [
      { id: 'sc-house', name: 'House Soft Wash', price: null, durationHours: 3, description: 'Soft wash that is safe for every siding type — vinyl, stucco, brick and wood — and lasts longer than pressure washing.', popular: true },
      { id: 'sc-roof', name: 'Roof Soft Wash', price: null, durationHours: 3, description: 'Removes algae, dirt and grime with zero risk of roof damage. Safe on shingle, tile and metal.' },
      { id: 'sc-concrete', name: 'Driveway & Sidewalk Pressure Washing', price: null, durationHours: 2, description: '4+ GPM hot-scrubbed concrete cleaning for instant, dramatic results.' },
      { id: 'sc-windows', name: 'Window Cleaning (Outside)', price: null, durationHours: 2, description: 'Exterior windows left streak-free and spotless.' },
      { id: 'sc-gutters', name: 'Gutter Cleaning', price: null, durationHours: 1.5, description: 'All gutters and downspouts cleaned out.' },
      { id: 'sc-deck', name: 'Deck & Patio Washing', price: null, durationHours: 2, description: 'Removes dirt, algae, grime and mold spots from your outdoor living space.' },
      { id: 'sc-fence', name: 'Fence Washing', price: null, durationHours: 2, description: 'Wood, vinyl or metal fencing — the right method for every material.' },
    ],
    addons: [{ id: 'sc-brighten', name: 'Gutter Brightening (black streaks)', price: null, addedHours: 1 }],
    freeRadiusZones: [
      'Troy', 'Tipp City', 'Piqua', 'Casstown', 'Fletcher', 'Conover', 'Covington', 'Laura', 'Ludlow Falls', 'Pleasant Hill',
      'West Milton', 'Union', 'Sidney', 'Huber Heights', 'Vandalia', 'Englewood', 'Dayton',
    ],
  },
  theme: {
    googleFonts: ['Poppins:wght@400;500;600', 'Kumbh+Sans:wght@400;600', 'Source+Sans+3:wght@400;600', 'Crimson+Text:ital,wght@1,400'],
    mode: 'light',
    display: { font: 'Poppins', weight: 400, color: '#FFFFFF' },
    heading: { font: '"Kumbh Sans"', weight: 600, color: '#1B1F6B' },
    body: { font: '"Source Sans 3", "Source Sans Pro"' },
    label: { font: 'Poppins', weight: 500, case: 'uppercase', tracking: '0.06em', color: '#5A5F8A' },
    radius: 10,
    colors: {
      page: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',
      text: '#2A2A29',
      muted: '#5F6170',
      border: '#DADBE6',
      brand: '#0D0F8D',
      brandFg: '#FFFFFF',
      accent: '#29ABE2',
    },
    button: { bg: '#0D0F8D', fg: '#FFFFFF', radius: 50, weight: 600, font: 'Poppins' },
    hero: {
      topBar: {
        bg: 'linear-gradient(90deg, #050D63 0%, #0A1A3F 100%)',
        fg: '#29ABE2',
        items: ['Get a free estimate — call 937.552.5577'],
        align: 'start',
        uppercase: true,
      },
      nav: {
        bg: '#FFFFFF',
        fg: '#1B1F6B',
        logoSize: 'lg',
        action: { label: 'Free Quote', href: 'tel:9375525577', style: 'button', color: '#E81C1C' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(5,13,99,0.55), rgba(5,13,99,0.55)), linear-gradient(160deg, #8A93A8 0%, #4E5B78 55%, #2E3B57 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Pressure Washing Experts in Troy, Ohio',
      eyebrow: { text: "Exterior pressure washing at it's best!", style: 'script', font: '"Crimson Text"', color: '#FFFFFF' },
      sub: 'House, roof and concrete washing across the Miami Valley. Pick your services and request a date below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
