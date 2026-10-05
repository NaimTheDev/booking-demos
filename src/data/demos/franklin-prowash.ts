import type { DemoEntry } from '../demo-entry'

// franklinprowash.com — WordPress/Elementor: light grey header with the black hexagon "F" mark, Lato
// uppercase headlines over a dark house photo, black pill buttons (25px). /pricing publishes
// "starting price" for four services; window cleaning is a quote. Zones from their Facebook intro.
export default {
  client: {
    slug: 'franklin-prowash',
    name: 'Franklin ProWash',
    tagline: 'Pressure washing and soft washing in Central Ohio — exterior cleaning that elevates',
    location: 'Dublin & Central OH',
    region: 'central-ohio',
    address: 'Dublin, OH',
    logo: { src: '/logos/franklin-prowash.png', background: '#FFFFFF' },
    primaryColor: '#000000',
    accentColor: '#6EC1E4',
    vertical: 'exterior',
    services: [
      { id: 'fpw-house', name: 'House Washing', price: 275, startingAt: true, durationHours: 3, description: 'Soft wash for siding — removes dirt, mold and algae without high pressure.', popular: true },
      { id: 'fpw-pressure', name: 'Pressure Washing', price: 175, startingAt: true, durationHours: 2, description: 'Driveways, sidewalks, patios and other concrete surfaces.' },
      { id: 'fpw-roof', name: 'Roof Cleaning', price: 425, startingAt: true, durationHours: 3, description: 'Soft wash roof cleaning for black streaks and moss.' },
      { id: 'fpw-gutter', name: 'Gutter Cleaning', price: 175, startingAt: true, durationHours: 1.5, description: 'Gutters cleared and downspouts flushed.' },
      { id: 'fpw-window', name: 'Window Cleaning', price: null, durationHours: 2, description: 'Exterior window cleaning. Custom quote.' },
    ],
    addons: [],
    freeRadiusZones: [
      'Dublin', 'Hilliard', 'Upper Arlington', 'Worthington', 'Westerville', 'Powell', 'Lewis Center', 'Grove City',
      'New Albany', 'Gahanna', 'Sunbury', 'Columbus',
    ],
  },
  theme: {
    googleFonts: ['Lato:ital,wght@0,400;0,700;0,900;1,400'],
    mode: 'light',
    display: { font: 'Lato', weight: 900, case: 'uppercase', tracking: '0.01em' },
    heading: { font: 'Lato', weight: 700, case: 'uppercase', tracking: '0.04em', color: '#000000' },
    body: { font: 'Lato' },
    label: { font: 'Lato', weight: 700, case: 'uppercase', tracking: '0.1em', color: '#4B4F58' },
    radius: 10,
    colors: {
      page: '#F4F4F4',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F4F4',
      text: '#4B4F58',
      muted: '#7A7E87',
      border: '#D9D9D9',
      brand: '#000000',
      brandFg: '#FFFFFF',
      accent: '#042551',
    },
    button: { bg: '#000000', fg: '#FFFFFF', radius: 25, case: 'uppercase', tracking: '0.1em', weight: 700, font: 'Lato' },
    hero: {
      nav: {
        bg: '#F4F4F4',
        fg: '#000000',
        logoSize: 'lg',
        action: { label: 'Get a Fast Quote', href: 'tel:6142857225', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.62)), #2B2F33',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Pressure & Soft Washing',
      highlight: 'in Central Ohio',
      highlightColor: '#D9D9D9',
      highlightOnNewLine: true,
      sub: 'Exterior cleaning services that completely restore the curb appeal of your home. Pick a service, see the starting price and book your spot.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
