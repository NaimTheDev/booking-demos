import type { DemoEntry } from '../demo-entry'

// ohiopropowerwashcarroll.com — Footbridge Media template: white header with the swoosh logo and a
// "15% discount for first responders & military" banner, blue (#0061AE) nav bar, Eurostile Bold headlines
// (Saira here), navy (#273890) translucent hero box over a house photo, 5px buttons.
// Every CTA goes to a free-estimate form; no prices are published.
export default {
  client: {
    slug: 'ohio-pro-power-wash',
    name: 'Ohio Pro Power Wash LLC',
    tagline: 'Quality cleaning at an impeccable price — Pickerington’s pressure washing pros since 2011.',
    location: 'Carroll, OH (Pickerington area)',
    region: 'central-ohio',
    address: '5844 Rauch Rd, Carroll, OH 43112',
    logo: { src: '/logos/ohio-pro-power-wash.webp', background: '#FFFFFF' },
    primaryColor: '#0061AE',
    accentColor: '#273890',
    vertical: 'exterior',
    services: [
      { id: 'opp-house', name: 'House Washing', price: null, durationHours: 3, description: 'Low-pressure soft wash that lifts mold, mildew and algae from vinyl and stucco.', popular: true },
      { id: 'opp-driveway', name: 'Driveway Washing', price: null, durationHours: 2, description: 'Surface-cleaner wash for driveways and stained concrete.' },
      { id: 'opp-concrete', name: 'Concrete Washing', price: null, durationHours: 2, description: 'Sidewalks, steps and other concrete surfaces.' },
      { id: 'opp-patio', name: 'Patio Cleaning', price: null, durationHours: 2, description: 'Patios cleaned of organic buildup with a large surface cleaner.' },
      { id: 'opp-paver', name: 'Paver Cleaning & Resanding', price: null, durationHours: 5, description: 'Deep-clean pavers, then resand the joints.' },
      { id: 'opp-gutter', name: 'Gutter Cleaning', price: null, durationHours: 2, description: 'Clear gutters and downspouts before the heavy rains.' },
      { id: 'opp-commercial', name: 'Commercial Pressure Washing', price: null, durationHours: 4, description: 'Storefronts, entrances and sidewalks for Columbus-area businesses.' },
    ],
    addons: [],
    freeRadiusZones: ['Pickerington', 'Carroll', 'Lancaster', 'Columbus', 'New Albany', 'Reynoldsburg', 'Westerville', 'Granville', 'Dublin', 'Hilliard', '43112', '43147'],
  },
  theme: {
    googleFonts: ['Saira:wght@600;700', 'Open+Sans:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Saira', weight: 700, case: 'uppercase', tracking: '0', color: '#FFFFFF' },
    heading: { font: 'Saira', weight: 700, color: '#0061AE' },
    body: { font: '"Open Sans"' },
    label: { font: '"Open Sans"', weight: 600, case: 'uppercase', tracking: '0.05em', color: '#273890' },
    radius: 5,
    colors: {
      page: '#F2F4F9',
      surface: '#FFFFFF',
      surfaceAlt: '#DCE1EC',
      text: '#212529',
      muted: '#5B6070',
      border: '#D3D9E6',
      brand: '#0061AE',
      brandFg: '#FFFFFF',
      accent: '#3248B8',
    },
    button: { bg: '#0061AE', fg: '#FFFFFF', radius: 5, case: 'uppercase', weight: 600, font: '"Open Sans"' },
    hero: {
      topBar: { bg: '#FFFFFF', fg: '#273890', items: ['15% discount for first responders & military', '614-795-5515'], uppercase: true },
      nav: {
        bg: '#0061AE',
        fg: '#FFFFFF',
        logoPlate: '#FFFFFF',
        action: { label: 'Request a free quote', href: '#booking', style: 'outline' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)), linear-gradient(180deg, #6fa6dc 0%, #a9cbeb 40%, #8b8f86 62%, #4f6b3a 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Quality cleaning at an impeccable price!',
      sub: 'Contact Ohio Pro Power Wash today — or skip the phone tag and request your wash below.',
      box: 'rgba(39, 56, 144, 0.88)',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
