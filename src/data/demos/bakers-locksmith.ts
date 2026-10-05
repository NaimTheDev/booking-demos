import type { DemoEntry } from '../demo-entry'

// bakerslocksmith.com — WordPress site: green wave frame over a photo of the van fleet, translucent dark-green
// text box ("We replace auto fobs for less!"), Gill Sans Nova light headings, green pill buttons.
// Family-owned since 1990, mobile locksmiths from Springfield and Troy shops. No prices published
// ("up to 50% less than dealerships"), so every service is a quote.
const GILL = '"Gill Sans Nova", "Gill Sans", "Gill Sans MT", Cabin'

export default {
  client: {
    slug: 'bakers-locksmith',
    name: 'Bakers Locksmith',
    tagline: "Miami Valley's premier locksmiths — family owned since 1990.",
    location: 'Springfield, OH',
    region: 'southwest-ohio',
    address: '1500 Upper Valley Pike, Springfield, OH 45504',
    logo: { src: '/logos/bakers-locksmith.png', background: '#FFFFFF' },
    primaryColor: '#149033',
    accentColor: '#083B17',
    vertical: 'locksmith',
    services: [
      { id: 'bk-fob', name: 'Car Key Fob / Remote Replacement', price: null, durationHours: 1, description: 'Most spare keys and fobs up to 50% less than dealer prices.', popular: true },
      { id: 'bk-lost-key', name: 'Lost Car Key (Key Generation)', price: null, durationHours: 1.5, description: 'New keys cut and programmed when all keys are lost.' },
      { id: 'bk-spare-key', name: 'Spare Car Key', price: null, durationHours: 0.5, description: 'Duplicate automotive keys.' },
      { id: 'bk-lockout', name: 'Home, Business or Car Lockout', price: null, durationHours: 1, description: 'Mobile locksmiths come to you.' },
      { id: 'bk-rekey', name: 'Rekey Locks', price: null, durationHours: 1.5, description: 'Rekey your home or business locks; Marks USA hardware with a limited lifetime warranty.' },
      { id: 'bk-master', name: 'Master Key System', price: null, durationHours: 4, description: 'Best IC to Schlage cylinders — master key systems for any business.' },
      { id: 'bk-access', name: 'Access Control', price: null, durationHours: 4, description: 'Access control installation for commercial and industrial buildings.' },
      { id: 'bk-safe', name: 'Safe Service & Liberty Safes', price: null, durationHours: 2, description: 'Authorized Liberty Safe dealer — delivery, install, moves, repairs and lost combinations.' },
    ],
    addons: [{ id: 'bk-dnd', name: 'Do-Not-Duplicate / Restricted Keys', price: null, addedHours: 0.25 }],
    freeRadiusZones: ['Springfield', 'Troy', 'Fairborn', 'Beavercreek', 'Sidney', 'Tipp City', 'Bellefontaine', 'Lima', 'Findlay'],
  },
  theme: {
    googleFonts: ['Cabin:wght@400;500;600'],
    mode: 'light',
    display: { font: GILL, weight: 300, color: '#FFFFFF' },
    heading: { font: GILL, weight: 600, color: '#083B17' },
    body: { font: GILL },
    label: { font: GILL, weight: 600, case: 'uppercase', tracking: '0.08em', color: '#149033' },
    radius: 6,
    colors: {
      page: '#F6FBF3',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF7EA',
      text: '#1A1A1A',
      muted: '#5B6B5F',
      border: '#D6E8D0',
      brand: '#149033',
      brandFg: '#FFFFFF',
      accent: '#149033',
    },
    button: { bg: '#149033', fg: '#FFFFFF', radius: 999, case: 'uppercase', tracking: '0.04em', weight: 600 },
    hero: {
      nav: {
        bg: '#149033',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Call (937) 328-5625', href: 'tel:9373285625', style: 'outline', color: '#FFFFFF' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(20,144,51,0.18), rgba(8,59,23,0.25)), linear-gradient(160deg, #a9b8a4 0%, #6f7f72 55%, #3e4a41 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'We replace auto fobs for less!',
      sub: 'Most spare keys are priced up to 50% less than the dealership. Tell us what you need and request a time below.',
      box: 'rgba(8, 59, 23, 0.72)',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
