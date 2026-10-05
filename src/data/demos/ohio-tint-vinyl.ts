import type { DemoEntry } from '../demo-entry'

// theohtv.com — Next.js/Tailwind, all black: white wordmark logo, fixed translucent header, huge bold
// system-sans headlines ("EXPERT-LEVEL PAINT PROTECTION") over a darkened shot of a green Charger with
// a wrapped hood, black 6px "Get A Free Quote" buttons. "Book An Appointment" only links to the contact form.
// No prices are published.
export default {
  client: {
    slug: 'ohio-tint-vinyl',
    name: 'The Ohio Tint & Vinyl Company',
    tagline: 'Ohio’s premier tinting and vinyl wrapping destination.',
    location: 'Carroll, OH',
    region: 'central-ohio',
    address: '3818 Columbus-Lancaster Rd NW, Carroll, OH 43112',
    logo: { src: '/logos/ohio-tint-vinyl.png', background: '#000000' },
    primaryColor: '#FFFFFF',
    accentColor: '#000000',
    vertical: 'tint',
    services: [
      { id: 'otv-tint', name: 'Window Tinting', price: null, durationHours: 2.5, description: 'Premium automotive window film — UV protection, glare reduction and privacy.', popular: true },
      { id: 'otv-windshield', name: 'Windshield Tint', price: null, durationHours: 1, description: 'Don’t forget the windshield — clear heat-rejecting film.' },
      { id: 'otv-ppf', name: 'Paint Protection Film', price: null, durationHours: 8, description: 'Clear protection film on the most vulnerable areas against chips and road debris.' },
      { id: 'otv-wrap', name: 'Vinyl Car Wrap', price: null, durationHours: 24, description: 'Full color-change wraps in a wide range of colors and finishes.' },
      { id: 'otv-commercial', name: 'Commercial Branding Wrap', price: null, durationHours: 16, description: 'Company branding and graphics for work vehicles.' },
    ],
    addons: [],
    freeRadiusZones: ['Carroll', 'Lancaster', 'Canal Winchester', 'Pickerington', 'Columbus', 'Groveport', 'Reynoldsburg', 'Baltimore', '43112', '43130'],
  },
  theme: {
    googleFonts: ['Inter:wght@400;600;700;800'],
    mode: 'dark',
    display: { font: 'Inter', weight: 800, case: 'uppercase', tracking: '0.01em', color: '#FFFFFF' },
    heading: { font: 'Inter', weight: 700, color: '#FFFFFF' },
    body: { font: 'Inter' },
    label: { font: 'Inter', weight: 600, case: 'uppercase', tracking: '0.12em', color: '#A3A3A3' },
    radius: 6,
    colors: {
      page: '#000000',
      surface: '#111111',
      surfaceAlt: '#1C1C1C',
      text: '#FFFFFF',
      muted: '#A3A3A3',
      border: '#334155',
      brand: '#FFFFFF',
      brandFg: '#000000',
      accent: '#94A07A',
    },
    button: { bg: '#FFFFFF', fg: '#000000', radius: 6, weight: 700, font: 'Inter' },
    hero: {
      nav: {
        bg: 'rgba(0, 0, 0, 0.6)',
        fg: '#FFFFFF',
        action: { label: '(614) 496-7840', href: 'tel:6144967840', style: 'outline' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), radial-gradient(ellipse at 60% 35%, #4b5a3a 0%, #252b1e 45%, #0b0b0b 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Expert-Level Window Tinting',
      sub: 'Tint, paint protection film and vinyl wraps in Carroll. Pick your service and book the bay — no more waiting on a quote form.',
      size: 'xl',
      overlap: false,
    },
  },
} satisfies DemoEntry
