import type { DemoEntry } from '../demo-entry'

// ohiolock.com — single-page GoDaddy site: white page, teal (#16A39A) rule under the top strip, Vollkorn
// serif wordmark "Ball Security & Locksmith", Raleway light subline, black pill buttons. No logo image.
// Phone + a "Get a free quote" form only. No prices published.
export default {
  client: {
    slug: 'ball-security',
    name: 'Ball Security & Locksmith',
    tagline: 'A classical locksmith experience serving Westerville & Central Ohio since 2013',
    location: 'Westerville, OH',
    region: 'central-ohio',
    address: 'Westerville, OH',
    primaryColor: '#1B1B1B',
    accentColor: '#16A39A',
    vertical: 'locksmith',
    services: [
      { id: 'bsl-rekey', name: 'Re-Keys', price: null, durationHours: 1, description: 'Rekey residential and commercial locks.', popular: true },
      { id: 'bsl-lockout', name: 'Lockout Service', price: null, durationHours: 0.5, description: 'Home, business and vehicle lockouts. Call for emergencies.' },
      { id: 'bsl-car-keys', name: 'Car Keys & FOBs', price: null, durationHours: 1, description: 'Most car keys through 2018; FOB programming where the vehicle allows.' },
      { id: 'bsl-safe', name: 'Safe Entry & Service', price: null, durationHours: 1.5, description: 'Bonded safe technician — safe opening and combination changes.' },
      { id: 'bsl-probate', name: 'Probate Initial Entry', price: null, durationHours: 1, description: 'Initial property entry for estates and probate.' },
      { id: 'bsl-camera', name: 'Camera Installation', price: null, durationHours: 3, description: 'Security camera installation.' },
      { id: 'bsl-consult', name: 'Security Consultation', price: null, durationHours: 1, description: 'Confidential physical security assessment.' },
    ],
    addons: [],
    freeRadiusZones: ['Westerville', 'Columbus', 'Worthington', 'Lewis Center', 'Galena', 'Sunbury', 'Gahanna', 'New Albany', '43081', '43082'],
  },
  theme: {
    googleFonts: ['Vollkorn:wght@600;700', 'Raleway:wght@300;400;600'],
    mode: 'light',
    display: { font: 'Vollkorn', weight: 700, color: '#1B1B1B' },
    heading: { font: 'Vollkorn', weight: 600, color: '#1B1B1B' },
    body: { font: 'Raleway' },
    label: { font: 'Raleway', weight: 600, case: 'uppercase', tracking: '0.1em', color: '#16A39A' },
    radius: 6,
    colors: {
      page: '#F7F7F7',
      surface: '#FFFFFF',
      surfaceAlt: '#F2F2F2',
      text: '#1B1B1B',
      muted: '#5F5F5F',
      border: '#DDDDDD',
      brand: '#1B1B1B',
      brandFg: '#FFFFFF',
      accent: '#16A39A',
    },
    button: { bg: '#000000', fg: '#FFFFFF', radius: 48, case: 'uppercase', tracking: '0.06em', weight: 600, font: 'Raleway' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#1B1B1B',
        borderColor: '#16A39A',
        wordmark: 'Ball Security & Locksmith',
        action: { label: '614-419-0077', href: 'tel:6144190077', style: 'button' },
      },
      layout: 'panel',
      background: '#FFFFFF',
      fg: '#1B1B1B',
      align: 'center',
      eyebrow: { text: 'Member, Westerville Chamber of Commerce', style: 'caps', color: '#16A39A' },
      headline: 'Ball Security & Locksmith',
      subline: 'A Classical Locksmith Experience — Serving Westerville & Central Ohio',
      sub: 'Re-keys, lockouts, safe entry and security consultation. Choose the job and request a time below.',
      size: 'md',
      overlap: false,
    },
  },
} satisfies DemoEntry
