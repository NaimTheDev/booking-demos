import type { DemoEntry } from '../demo-entry'

// jjsmarinecare.com — one-page site: ceramic coating, buff & wax (compound polishing), wet sanding, washes and a
// maintenance program; Facebook adds "full service, electronics". No prices — every section ends in
// "Get In Touch" (a contact form) or "MSG or call for a FREE quote". Durations are estimates.
// Theme: white nav in a squared tech display face, navy (#011648) 10px buttons, Gill Sans-style body, hero photo
// fading into a deep blue gradient, shield logo with cyan "JJ's".
export default {
  client: {
    slug: 'jjs-marine-care',
    name: "JJ's Marine Care",
    tagline: 'Custom boat detailing — we can protect everything on your investment.',
    location: 'Lorain, OH',
    region: 'northeast-ohio',
    address: 'Lorain, OH',
    logo: { src: '/logos/jjs-marine-care.png', background: '#FFFFFF' },
    primaryColor: '#011648',
    accentColor: '#1FB5EC',
    vertical: 'marine',
    services: [
      { id: 'jj-ceramic', name: 'Marine Ceramic Coating', price: null, durationHours: 10, description: 'Thick ceramic layer that protects gel coat from fading, fills pores and makes clean-up almost effortless.', popular: true },
      { id: 'jj-buffwax', name: 'Compound, Buff & Wax', price: null, durationHours: 6, description: 'High-speed compound and polish to remove light scratches and oxidation, finished with wax.' },
      { id: 'jj-wetsand', name: 'Wet Sanding & Gel Coat Restoration', price: null, durationHours: 10, description: 'Smooths rough or uneven surfaces before polishing.' },
      { id: 'jj-wash', name: 'Boat Wash & Detail', price: null, durationHours: 3, description: 'Customizable wash and interior/exterior detailing.' },
      { id: 'jj-maint', name: 'Maintenance Program', price: null, durationHours: 2, description: 'Regular washdowns and detailing to keep your boat ready for the water all season.' },
      { id: 'jj-service', name: 'Marine Service & Electronics', price: null, durationHours: 3, description: 'Full-service mechanical work and electronics installs.' },
    ],
    addons: [],
    freeRadiusZones: ['Lorain', 'Vermilion', '44052', '44053', '44055'],
  },
  theme: {
    googleFonts: ['Audiowide', 'Cabin:wght@400;500;600;700'],
    mode: 'light',
    display: { font: 'Cabin', weight: 500, color: '#FFFFFF' },
    heading: { font: 'Cabin', weight: 600, color: '#011648' },
    body: { font: '"Gill Sans", "Gill Sans MT", Cabin, Calibri, sans-serif' },
    label: { font: 'Audiowide', weight: 400, case: 'uppercase', tracking: '0.06em', color: '#011648' },
    radius: 10,
    colors: {
      page: '#EEF3F9',
      surface: '#FFFFFF',
      surfaceAlt: '#F2F6FB',
      text: '#0B1530',
      muted: '#5A6478',
      border: '#D3DCE8',
      brand: '#011648',
      brandFg: '#FFFFFF',
      accent: '#1FB5EC',
    },
    button: { bg: '#011648', fg: '#FFFFFF', radius: 10, weight: 500, font: 'Cabin' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#011648',
        logoSize: 'lg',
        action: { label: '(216) 577-8484', href: 'tel:2165778484', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(180deg, rgba(160,175,190,0.55) 0%, rgba(40,90,170,0.75) 65%, #011648 100%), #7d8a99',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'No job is too big!',
      sub: 'Ceramic coating, compound wax polishing, wet sanding & much more for boats of all sizes. Pick a service and your boat’s length, then request a date — no more waiting on DMs.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
