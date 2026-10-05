import type { DemoEntry } from '../demo-entry'

// jwwauto.com — WordPress one-pager: white header with the blue italic "JWW AUTO ACCESSORIES" logo, deep-blue
// (#003C8D → #1F6FB8) gradient hero with Ubuntu 500 uppercase, tight-tracked headline, Roboto body and white
// pill "Call 330-428-1007" button. Over 30 years in Alliance; services list: audio/video, remote starts, keyless
// entry, window tint, auto detailing and truck accessories. Booking is call or stop in. No prices published.
export default {
  client: {
    slug: 'jww-auto',
    name: 'JWW Auto Accessories',
    tagline: 'Your one stop accessory shop — window tint, detailing & more in Alliance.',
    location: 'Alliance, OH',
    region: 'northeast-ohio',
    address: '1100 W Ely St, Alliance, OH 44601',
    logo: { src: '/logos/jww-auto.png', background: '#FFFFFF' },
    primaryColor: '#003C8D',
    accentColor: '#1F6FB8',
    vertical: 'multi',
    services: [
      { id: 'jww-tint', name: 'Window Tint', price: null, durationHours: 2.5, description: 'Automotive window tint for cars, trucks and SUVs.', category: 'tint', popular: true },
      { id: 'jww-detail', name: 'Auto Detailing', price: null, durationHours: 4, description: 'Interior and exterior detailing.', category: 'auto' },
    ],
    addons: [],
    freeRadiusZones: ['Alliance', 'Sebring', 'Beloit', 'Louisville', 'Minerva', 'Damascus', 'Homeworth', 'Marlboro', 'Hartville', 'North Benton', 'Atwater', 'Canton'],
  },
  theme: {
    googleFonts: ['Ubuntu:wght@400;500;700', 'Roboto:wght@400;600;800'],
    mode: 'light',
    display: { font: 'Ubuntu', weight: 500, case: 'uppercase', tracking: '-0.04em', color: '#FFFFFF' },
    heading: { font: 'Ubuntu', weight: 500, case: 'uppercase', tracking: '-0.02em', color: '#111111' },
    body: { font: 'Roboto' },
    label: { font: 'Roboto', weight: 600, case: 'uppercase', tracking: '0.1em', color: '#003C8D' },
    radius: 10,
    colors: {
      page: '#F7F7F8',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF3FA',
      text: '#333333',
      muted: '#777777',
      border: '#DCE2EA',
      brand: '#003C8D',
      brandFg: '#FFFFFF',
      accent: '#1F6FB8',
    },
    button: { bg: '#003C8D', fg: '#FFFFFF', radius: 9999, weight: 600, font: 'Roboto' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#555555',
        logoSize: 'lg',
        action: { label: 'Call 330-428-1007', href: 'tel:3304281007', style: 'button', color: '#003C8D' },
      },
      layout: 'banner',
      background: 'linear-gradient(120deg, #003C8D 0%, #1A5FAA 55%, #2271BA 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Your One Stop Accessory Shop',
      sub: 'Over 30 years experience. Book your tint or detail for a day that works — then stop in.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
