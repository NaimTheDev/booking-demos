import type { DemoEntry } from '../demo-entry'

// akroncantonkeys.com — Thryv-hosted template: pale grey page (#ECF0F1), centered red (#C0392B) Montserrat
// wordmark with grey tagline, red nav bar, royal-blue (#0039A2) "Call Us Today!" hero panel, Source Sans Pro body.
// No logo image. Family-owned since 1984, 24/7 road service. Booking is phone or email only. The only published
// price is "auto security keys starting at $16".
export default {
  client: {
    slug: 'a-security-safe-lock',
    name: 'A Security Safe & Lock',
    tagline: '24 hour emergency road service and car opening — family-owned since 1984.',
    location: 'Akron, OH',
    region: 'northeast-ohio',
    address: '2392 E Turkeyfoot Lake Rd, Akron, OH 44312',
    primaryColor: '#C0392B',
    accentColor: '#0039A2',
    vertical: 'locksmith',
    services: [
      { id: 'as-car-lockout', name: 'Car Lockout', price: null, durationHours: 0.5, description: '24/7 road service and car opening.', popular: true },
      { id: 'as-security-key', name: 'Auto Security Key', price: 16, startingAt: true, durationHours: 0.5, description: 'Replacement security keys for your vehicle.' },
      { id: 'as-chip-key', name: 'Chip Key Programming', price: null, durationHours: 1, description: 'Transponder keys cut and programmed.' },
      { id: 'as-ignition', name: 'Ignition & Door Lock Repair/Replacement', price: null, durationHours: 1.5, description: 'Worn or broken ignition and door locks.' },
      { id: 'as-home-lockout', name: 'Home or Business Lockout', price: null, durationHours: 0.5, description: 'Locked out of your house or office.' },
      { id: 'as-rekey', name: 'Locks Re-Keyed', price: null, durationHours: 1, description: 'New keys for your existing locks; keyed-alike available.' },
      { id: 'as-install', name: 'New Locks / Deadbolts Installed', price: null, durationHours: 1, description: 'Deadbolts, keyless access and ADA levers.' },
      { id: 'as-master', name: 'Master Key Systems', price: null, durationHours: 2, description: 'Master keying for businesses and rentals.' },
      { id: 'as-safe', name: 'Safe Opening, Repair & Combination Change', price: null, durationHours: 1.5, description: 'Safes opened, repaired or re-combinated; new and used safe sales.' },
    ],
    addons: [],
    freeRadiusZones: ['Akron', 'Green', 'Uniontown', 'Portage Lakes', 'New Franklin', 'Coventry', 'Barberton', 'Norton', 'Springfield Township', 'North Canton', 'Canton', 'Massillon'],
  },
  theme: {
    googleFonts: ['Montserrat:wght@400;600', 'Source+Sans+3:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Montserrat', weight: 600, color: '#FFFFFF' },
    heading: { font: 'Montserrat', weight: 400, color: '#C0392B' },
    body: { font: '"Source Sans 3", "Source Sans Pro"' },
    label: { font: '"Source Sans 3", "Source Sans Pro"', weight: 600, case: 'uppercase', tracking: '0.06em', color: '#6C7A89' },
    radius: 2,
    colors: {
      page: '#ECF0F1',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',
      text: '#333333',
      muted: '#6C7A89',
      border: '#CDD2D5',
      brand: '#C0392B',
      brandFg: '#FFFFFF',
      accent: '#0039A2',
    },
    button: { bg: '#C0392B', fg: '#FFFFFF', radius: 0, case: 'uppercase', tracking: '0.03em', weight: 600 },
    hero: {
      nav: {
        bg: '#C0392B',
        fg: '#FFFFFF',
        wordmark: 'A Security Safe & Lock',
        action: { label: '(330) 699-6943', href: 'tel:3306996943', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(90deg, #00268a 0%, #0039A2 60%, #0039A2 100%)',
      fg: '#FFFFFF',
      align: 'center',
      kicker: '24 Hour Emergency Road Service and Car Opening',
      headline: 'Call Us Today! (330) 699-6943',
      sub: 'Or skip the call — pick your lock or key service, tell us where you are, and request a time.',
      size: 'md',
      overlap: false,
    },
  },
} satisfies DemoEntry
