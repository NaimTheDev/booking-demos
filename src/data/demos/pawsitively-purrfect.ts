import type { DemoEntry } from '../demo-entry'

// pawsitivelypurrfectsalon.org — Web.com template: white header with the lime script logo, lime-green
// (#9DCE05) nav bar, Dosis headings in green (#33972E), Open Sans body, full-width dog photo hero.
// "Please give us a call for all pricing information" — every service is a quote.
export default {
  client: {
    slug: 'pawsitively-purrfect',
    name: 'Pawsitively Purrfect',
    tagline: 'Mobile dog grooming at the convenience of your home or office — Josh & Michelle, since 2002',
    location: 'Lewis Center, OH',
    region: 'central-ohio',
    address: 'Lewis Center, OH 43035',
    logo: { src: '/logos/pawsitively-purrfect.png', background: '#FFFFFF' },
    primaryColor: '#9DCE05',
    accentColor: '#33972E',
    vertical: 'pet',
    services: [
      { id: 'pp-full', name: 'Full Groom', price: null, durationHours: 2, description: 'Breed-specific or customized groom — tell us the style you want.', popular: true },
      { id: 'pp-bath-brush', name: 'Bath & Brush Out', price: null, durationHours: 1.5, description: 'Bath, blow dry and a full brush out.' },
      { id: 'pp-bath', name: 'Bath Only', price: null, durationHours: 1, description: 'Bath and dry.' },
    ],
    addons: [],
    freeRadiusZones: ['Lewis Center', 'Powell', 'Delaware', 'Westerville', 'Worthington', 'Dublin', 'Hilliard', 'New Albany', 'Columbus', '43035'],
  },
  theme: {
    googleFonts: ['Dosis:wght@400;500;600;700', 'Open+Sans:wght@400;600;700', 'Kaushan+Script'],
    mode: 'light',
    display: { font: '"Open Sans"', weight: 700 },
    heading: { font: 'Dosis', weight: 600, color: '#33972E' },
    body: { font: '"Open Sans"' },
    label: { font: 'Dosis', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#33972E' },
    radius: 4,
    colors: {
      page: '#F5F9EC',
      surface: '#FFFFFF',
      surfaceAlt: '#F0F7DC',
      text: '#333333',
      muted: '#6B6B6B',
      border: '#DCEBB5',
      brand: '#33972E',
      brandFg: '#FFFFFF',
      accent: '#9DCE05',
    },
    button: { bg: '#9DCE05', fg: '#FFFFFF', radius: 4, case: 'uppercase', weight: 700, font: '"Open Sans"' },
    hero: {
      topBar: {
        bg: '#FFFFFF',
        fg: '#8DBA05',
        items: ['(614) 949-6633', 'Columbus, Hilliard, New Albany, Dublin, Lewis Center, Powell, Delaware, Worthington & Westerville'],
        align: 'between',
      },
      nav: {
        bg: '#9DCE05',
        fg: '#FFFFFF',
        logoPlate: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call (614) 949-6633', href: 'tel:6149496633', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(40, 70, 10, 0.35), rgba(40, 70, 10, 0.55)), linear-gradient(160deg, #7FB23A 0%, #4E8A22 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Pawsitively Purrfect', style: 'script', font: 'Kaushan Script', color: '#E6F7B0' },
      headline: 'The Convenience of',
      highlight: 'Mobile Dog Grooming',
      highlightOnNewLine: true,
      highlightColor: '#FFFFFF',
      sub: 'Josh and Michelle groom your dog at your home or office. Pick a groom and request a time — no phone tag.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
