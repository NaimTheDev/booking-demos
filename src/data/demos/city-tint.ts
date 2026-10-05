import type { DemoEntry } from '../demo-entry'

// citytintllc.com — Wix site: pale-aqua hero wave with the slanted navy CITY TINT wordmark, navy Gilroy-style
// headings, Montserrat body, cyan accents. Ceramic-only automotive tint plus architectural film and security
// film (mobile). No prices published ("give us a call today to get pricing"), so every service is a quote.
export default {
  client: {
    slug: 'city-tint',
    name: 'City Tint',
    tagline: 'Precision, performance, and protection.',
    location: 'New Carlisle, OH',
    region: 'southwest-ohio',
    address: '8011 S Dayton Lakeview Rd, New Carlisle, OH 45344',
    logo: { src: '/logos/city-tint.png', background: '#FFFFFF' },
    primaryColor: '#1F4386',
    accentColor: '#4FC6E0',
    vertical: 'tint',
    services: [
      { id: 'ct-full', name: 'Automotive Ceramic Tint — Full Car', price: null, durationHours: 3, description: 'Ceramic film only, 5% to 70%. Blocks UV and IR heat and protects your interior.', popular: true },
      { id: 'ct-front', name: 'Driver / Passenger Windows', price: null, durationHours: 1, description: 'Match your factory rear tint on the front doors.' },
      { id: 'ct-custom', name: 'Custom Automotive Tint', price: null, durationHours: 2, description: 'Windshield strips and custom combinations — we make sure your safety systems still work.' },
      { id: 'ct-arch', name: 'Architectural Tint (Home or Business)', price: null, durationHours: 4, description: 'Reduces heat and glare and improves energy efficiency while keeping natural light. On-site quote.' },
      { id: 'ct-security', name: 'Security Film', price: null, durationHours: 4, description: 'Holds shattered glass in place to delay forced entry and reduce injury.' },
    ],
    addons: [{ id: 'ct-mobile', name: 'Mobile Service (we come to you)', price: null, addedHours: 0.5 }],
    freeRadiusZones: ['New Carlisle', 'Springfield', 'Dayton', 'Huber Heights', 'Fairborn', 'Riverside', 'Tipp City', 'Troy'],
  },
  theme: {
    googleFonts: ['Montserrat:wght@400;500;600;700;800'],
    mode: 'light',
    display: { font: 'Montserrat', weight: 800, tracking: '-0.01em', color: '#1F4386' },
    heading: { font: 'Montserrat', weight: 600, color: '#1F4386' },
    body: { font: 'Montserrat' },
    label: { font: 'Montserrat', weight: 600, case: 'uppercase', tracking: '0.1em', color: '#3D5F9C' },
    radius: 6,
    colors: {
      page: '#F2FAFC',
      surface: '#FFFFFF',
      surfaceAlt: '#DFF2F7',
      text: '#1B2B48',
      muted: '#5A6B86',
      border: '#C9E3EC',
      brand: '#1F4386',
      brandFg: '#FFFFFF',
      accent: '#4FC6E0',
    },
    button: { bg: '#1F4386', fg: '#FFFFFF', radius: 6, weight: 600, font: 'Montserrat' },
    hero: {
      nav: {
        bg: '#DFF2F7',
        fg: '#1F4386',
        action: { label: 'Call 937-910-8442', href: 'tel:9379108442', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(176deg, #DFF2F7 0%, #DFF2F7 82%, #4FC6E0 82.4%, #1F4386 100%)',
      fg: '#1F4386',
      align: 'left',
      headline: "Dayton's choice for professional window tint",
      highlight: 'and security film.',
      highlightColor: '#3D8FB5',
      sub: 'Precision, Performance, and Protection! Appointments, walk-ins or mobile service — request yours below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
