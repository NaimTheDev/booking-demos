import type { DemoEntry } from '../demo-entry'

// outshineohio.com — WordPress/Elementor: light header with the orange/blue Outshine logo, orange (#F8821E)
// "GET A QUOTE" and sky-blue (#00B0ED) phone buttons, Poppins 700 uppercase hero over a dark house photo,
// sky-blue section bands. "GET A QUOTE" opens a QuoteIQ quote-request form (no scheduling). Services page lists
// house washing, roof washing and concrete cleaning; no prices published.
export default {
  client: {
    slug: 'outshine-pressure-washing',
    name: 'Outshine Pressure Washing',
    tagline: 'The clean you deserve — Canton & Stark County.',
    location: 'Canton, OH',
    region: 'northeast-ohio',
    address: 'Canton, OH',
    logo: { src: '/logos/outshine-pressure-washing.png', background: '#FFFFFF' },
    primaryColor: '#F8821E',
    accentColor: '#00B0ED',
    vertical: 'exterior',
    services: [
      { id: 'op-house', name: 'House Washing (Soft Wash)', price: null, durationHours: 3, description: 'Low-pressure soft wash that removes dirt, grime, mold and mildew without damaging siding.', popular: true },
      { id: 'op-roof', name: 'Roof Washing', price: null, durationHours: 3, description: 'Kills moss, algae and lichen and keeps them from growing back. Allow 6–8 weeks for rain to wash away dead organics.' },
      { id: 'op-concrete', name: 'Concrete Cleaning', price: null, durationHours: 2, description: 'Driveways, sidewalks, patios and lots — dirt, oil stains, algae and mildew removed.' },
    ],
    addons: [],
    freeRadiusZones: ['Canton', 'North Canton', 'Massillon', 'Louisville', 'Jackson Township', 'Plain Township', 'Perry Township', 'Canal Fulton', 'Hartville', 'Uniontown', 'Alliance', 'Navarre'],
  },
  theme: {
    googleFonts: ['Poppins:wght@500;700', 'Roboto:wght@400;500;600'],
    mode: 'light',
    display: { font: 'Poppins', weight: 700, case: 'uppercase', color: '#FFFFFF' },
    heading: { font: 'Poppins', weight: 700, color: '#1F2A37' },
    body: { font: 'Roboto' },
    label: { font: 'Roboto', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#00A0D8' },
    radius: 8,
    colors: {
      page: '#F7FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#EAF8FE',
      text: '#2D3748',
      muted: '#69727D',
      border: '#D5E3EC',
      brand: '#00B0ED',
      brandFg: '#FFFFFF',
      accent: '#F8821E',
    },
    button: { bg: '#F8821E', fg: '#FFFFFF', radius: 5, weight: 600, font: 'Roboto' },
    hero: {
      nav: {
        bg: '#F7FAFC',
        fg: '#1F2A37',
        logoSize: 'lg',
        action: { label: '(330) 936-6149', href: 'tel:3309366149', style: 'button', color: '#00B0ED' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(10,14,22,0.62), rgba(10,14,22,0.62)), linear-gradient(160deg, #3a4250 0%, #23272f 100%)',
      fg: '#FFFFFF',
      align: 'left',
      kicker: 'Experience “The Clean You Deserve”',
      headline: 'Welcome to Outshine Pressure Washing',
      sub: 'Servicing Stark County and surrounding areas — fully licensed and insured. Choose your service and request a day below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
