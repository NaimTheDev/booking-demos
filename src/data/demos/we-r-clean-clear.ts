import type { DemoEntry } from '../demo-entry'

// wercleanandclear.com — WordPress/Divi: black utility strip (email · phone · Text Us · Facebook), transparent
// header over a photo with the cartoon "WE-R CLEAN & CLEAR" logo, Oswald 700 uppercase nav/headline, Open Sans
// body, bright-yellow pill "CALL TODAY / TEXT TODAY" buttons, navy (#1C285A) accents. Booking today is call or
// text, or a short "Get a free quote" form. No prices published.
export default {
  client: {
    slug: 'we-r-clean-clear',
    name: 'We-R-Clean & Clear',
    tagline: 'You say it. We spray it! Exterior cleaning across Northeast Ohio since 2007.',
    location: 'Akron, OH',
    region: 'northeast-ohio',
    address: '2179 Killian Rd, Akron, OH 44312',
    logo: { src: '/logos/we-r-clean-clear.webp', background: '#FFFFFF' },
    primaryColor: '#1C285A',
    accentColor: '#FFF200',
    vertical: 'exterior',
    services: [
      { id: 'wr-roof', name: 'Roof Cleaning', price: null, durationHours: 3, description: 'Soft washing that removes damaging algae and protects your shingles.', popular: true },
      { id: 'wr-house', name: 'House Washing', price: null, durationHours: 3, description: 'A careful power wash of your home’s exterior with minimal disruption to your day.' },
      { id: 'wr-flat', name: 'Flat Surface / Concrete Washing', price: null, durationHours: 2, description: 'Driveways, walkways, porches and patios.' },
      { id: 'wr-windows', name: 'Window Cleaning', price: null, durationHours: 2, description: 'Eco-friendly window cleaning that leaves glass crisper and cleaner.' },
      { id: 'wr-gutters', name: 'Gutter Cleaning', price: null, durationHours: 1.5, description: 'Clogged, overflowing gutters cleared — and problems spotted early.' },
    ],
    addons: [],
    freeRadiusZones: ['Akron', 'Springfield Township', 'Lakemore', 'Mogadore', 'Tallmadge', 'Cuyahoga Falls', 'Stow', 'Green', 'Uniontown', 'Barberton', 'Fairlawn', 'Kent'],
  },
  theme: {
    googleFonts: ['Oswald:wght@500;700', 'Open+Sans:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Oswald', weight: 700, case: 'uppercase', color: '#FFFFFF' },
    heading: { font: 'Oswald', weight: 700, case: 'uppercase', color: '#1C285A' },
    body: { font: '"Open Sans"' },
    label: { font: '"Open Sans"', weight: 700, case: 'uppercase', tracking: '0.08em', color: '#107FD3' },
    radius: 6,
    colors: {
      page: '#F1F3F7',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF2FA',
      text: '#333333',
      muted: '#666666',
      border: '#D7DCE6',
      brand: '#1C285A',
      brandFg: '#FFFFFF',
      accent: '#107FD3',
    },
    button: { bg: '#FFF200', fg: '#111111', radius: 999, case: 'uppercase', weight: 700, font: '"Open Sans"' },
    hero: {
      topBar: { bg: '#161616', fg: '#FFFFFF', items: ['(330) 283-4301', 'Text Us', 'Akron, OH'], align: 'between' },
      nav: {
        bg: '#1C285A',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call Today', href: 'tel:3302834301', style: 'button', color: '#FFF200' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), linear-gradient(135deg, #3d5a2a 0%, #2d6fb0 55%, #6d6a60 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Pressure Washing Professionals Akron Ohio',
      subline: 'Revive Your Home’s Exterior with Pressure Washing',
      sub: 'Roof, house, windows, gutters and concrete — pick what you need and request a day. No phone tag.',
      size: 'lg',
      overlap: false,
      box: 'rgba(0, 0, 0, 0.55)',
    },
  },
} satisfies DemoEntry
