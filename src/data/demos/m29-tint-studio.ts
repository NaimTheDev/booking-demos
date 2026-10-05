import type { DemoEntry } from '../demo-entry'

// m29tintstudio.com — GoDaddy Websites + Marketing: translucent black header with the teal/pink glitch "M29"
// logo, uppercase Lato headline over a darkened squeegee video, hairline rule, hot-magenta (#F520F5) square
// buttons, black sections with Cabin uppercase headings. Prices below are copied from the site's service list;
// "Starting at" where the site says so. All appointments are by call/text/email only.
export default {
  client: {
    slug: 'm29-tint-studio',
    name: 'M29 Tint Studio',
    tagline: 'A small, specialized window tinting studio in Reynoldsburg, Ohio. Lifetime warranty on every install.',
    location: 'Reynoldsburg, OH',
    region: 'central-ohio',
    address: 'Reynoldsburg, OH 43068',
    logo: { src: '/logos/m29-tint-studio.png', background: '#161616' },
    primaryColor: '#E01CE0',
    accentColor: '#4FD1E0',
    vertical: 'tint',
    services: [
      { id: 'm29-carbon', name: 'Nano Carbon Film — Full Vehicle', price: 290, startingAt: true, durationHours: 2.5, description: 'Budget-friendly heat rejection and privacy. 5%, 15%, 20%, 35% or 50%. Excludes windshield.', popular: true },
      { id: 'm29-ceramic', name: 'Nano Ceramic Film — Full Vehicle', price: 425, startingAt: true, durationHours: 2.5, description: 'Top-performing heat rejection. 5%, 20%, 35% or 50%. Excludes windshield.' },
      { id: 'm29-two', name: '2 Windows Only', price: 95, durationHours: 1, description: 'Match your front two windows to the factory rear tint.' },
      { id: 'm29-ws-carbon', name: 'Windshield — Carbon', price: 175, durationHours: 1, description: 'Carbon film for the windshield (Ohio allows 70% VLT).' },
      { id: 'm29-ws-ceramic', name: 'Windshield — Ceramic', price: 275, durationHours: 1, description: 'Ceramic film for the windshield (Ohio allows 70% VLT).' },
      { id: 'm29-strip', name: 'Sun Strip', price: 125, durationHours: 0.5, description: '5-inch sun strip across the top of the windshield.' },
    ],
    addons: [
      { id: 'm29-removal', name: 'Old Film Removal (per window)', price: 25, addedHours: 0.5 },
      { id: 'm29-removal-rear', name: 'Old Film Removal — Rear Glass', price: 75, addedHours: 0.5 },
    ],
    freeRadiusZones: ['Reynoldsburg', 'Columbus', 'Pickerington', 'Gahanna', 'Whitehall', 'Blacklick', 'Etna', 'Pataskala', '43068', '43232'],
  },
  theme: {
    googleFonts: ['Lato:wght@400;700', 'Cabin:wght@600;700'],
    mode: 'dark',
    display: { font: 'Lato', weight: 400, case: 'uppercase', color: '#FFFFFF' },
    heading: { font: 'Cabin', weight: 700, case: 'uppercase', tracking: '0.04em', color: '#E2E2E2' },
    body: { font: 'Lato' },
    label: { font: 'Cabin', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#B5B5B5' },
    radius: 0,
    colors: {
      page: '#000000',
      surface: '#161616',
      surfaceAlt: '#222222',
      text: '#FFFFFF',
      muted: '#B5B5B5',
      border: '#333333',
      brand: '#E01CE0',
      brandFg: '#FFFFFF',
      accent: '#4FD1E0',
    },
    button: { bg: '#F520F5', fg: '#FFFFFF', radius: 0, tracking: '0.06em', weight: 700, font: 'Lato' },
    hero: {
      nav: {
        bg: 'rgba(22, 22, 22, 0.92)',
        fg: '#FFFFFF',
        action: { label: 'Call or text 614-987-8171', href: 'tel:6149878171', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), linear-gradient(135deg, #4a4a4f 0%, #2b2b30 45%, #0f3a1c 70%, #1c1c1c 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'The ultimate window solution for privacy, UV protection and heat rejection',
      sub: 'Experience a cooler, more comfortable drive. Pick your film and grab an appointment below.',
      ornament: 'rule',
      ornamentColor: '#BFBFBF',
      size: 'md',
      overlap: false,
    },
  },
} satisfies DemoEntry
