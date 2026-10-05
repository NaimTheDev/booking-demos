import type { DemoEntry } from '../demo-entry'

// woolock.com — Duda site: white header with the red/black "The Locksmith Shop Inc." logo, maroon (#7F2C34)
// scalloped "24-Hr Emergency Services!" badge, maroon phone "(330) 262-5397 KEYS", black nav bar, Roboto 700
// headline over the shop's van, Open Sans body, maroon rounded buttons. Family owned for 30+ years serving
// Wayne, Holmes, Ashland, Richland and surrounding counties. Booking: "call today for an estimate". No prices.
export default {
  client: {
    slug: 'locksmith-shop-wooster',
    name: 'The Locksmith Shop',
    tagline: 'Lock, safe & door specialists — family owned & operated in Wooster.',
    location: 'Wooster, OH',
    region: 'northeast-ohio',
    address: '146 E Bowman St, Wooster, OH 44691',
    logo: { src: '/logos/locksmith-shop-wooster.jpg', background: '#FFFFFF' },
    primaryColor: '#7F2C34',
    accentColor: '#000000',
    vertical: 'locksmith',
    services: [
      { id: 'tls-lockout', name: 'Home or Business Lockout', price: null, durationHours: 0.5, description: '24-hour emergency lockout service.', popular: true },
      { id: 'tls-car-key', name: 'Car Key & Fob Replacement', price: null, durationHours: 1, description: 'Vehicle keys and key fobs cut and programmed.', popular: true },
      { id: 'tls-car-lockout', name: 'Auto Lockout', price: null, durationHours: 0.5, description: 'Locked out of your vehicle.' },
      { id: 'tls-rekey', name: 'Rekeying', price: null, durationHours: 1, description: 'New keys for your existing locks.' },
      { id: 'tls-hardware', name: 'Door Hardware & Padlocks', price: null, durationHours: 1, description: 'Locks, deadbolts and door hardware installed or repaired.' },
      { id: 'tls-access', name: 'High-Security & Commercial Access Systems', price: null, durationHours: 3, description: 'Complete high-security commercial lock and access systems.' },
      { id: 'tls-doors', name: 'Commercial Doors & Frames', price: null, durationHours: 4, description: 'New door frames, hardware and electronics for businesses.' },
      { id: 'tls-safe', name: 'Safe Delivery, Bolt-Down & Service', price: null, durationHours: 2, description: 'Safes delivered and bolted down; lost combinations and safe locks serviced.' },
    ],
    addons: [],
    freeRadiusZones: ['Wooster', 'Orrville', 'Apple Creek', 'Smithville', 'Shreve', 'Kidron', 'Dalton', 'Rittman', 'Creston', 'West Salem', 'Millersburg', 'Ashland'],
  },
  theme: {
    googleFonts: ['Roboto:wght@500;700', 'Open+Sans:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Roboto', weight: 700, color: '#FFFFFF' },
    heading: { font: 'Roboto', weight: 700, color: '#7F2C34' },
    body: { font: '"Open Sans"' },
    label: { font: '"Open Sans"', weight: 700, case: 'uppercase', tracking: '0.06em', color: '#333333' },
    radius: 8,
    colors: {
      page: '#F0F0F0',
      surface: '#FFFFFF',
      surfaceAlt: '#F7F1F2',
      text: '#222222',
      muted: '#666666',
      border: '#DDD5D6',
      brand: '#7F2C34',
      brandFg: '#FFFFFF',
      accent: '#7F2C34',
    },
    button: { bg: '#7F2C34', fg: '#FFFFFF', radius: 10, weight: 700, font: '"Open Sans"' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#000000',
        logoSize: 'lg',
        action: { label: '(330) 262-5397 KEYS', href: 'tel:3302625397', style: 'text', color: '#7F2C34' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), linear-gradient(160deg, #c9ced4 0%, #8d949c 55%, #5f666d 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: '24-Hr Emergency Services!', style: 'badge', color: '#7F2C34' },
      headline: 'Family Owned & Operated Locksmith in Wooster, OH',
      sub: 'Residential, commercial and automotive. Choose a service and request a time — we’ll confirm by phone.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
