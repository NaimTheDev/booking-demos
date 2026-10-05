import type { DemoEntry } from '../demo-entry'

// solarsolutionstint.com — Duda site: lime-green address bar, white header with the sun logo, photo hero with a
// brush-script headline ("The Family-Owned Solar Protection Experts") in white, lime and orange, lime Rubik buttons.
// No prices are published (auto, marine, residential, commercial and security film are all quoted), so every
// service is a custom quote. "SCHEDULE SERVICE!" is just a tel: link today.
export default {
  client: {
    slug: 'solar-solutions',
    name: 'Solar Solutions Window Tinting',
    tagline: 'The family-owned Solar Protection Experts — proudly serving NE Ohio since 1999.',
    location: 'Mentor, OH',
    region: 'northeast-ohio',
    address: '7898 Tyler Blvd, Mentor, OH 44060',
    logo: { src: '/logos/solar-solutions.gif', background: '#FFFFFF' },
    primaryColor: '#BED63D',
    accentColor: '#F7A21B',
    vertical: 'tint',
    services: [
      {
        id: 'ss-auto',
        name: 'Automotive Window Tint',
        price: null,
        durationHours: 3,
        description: 'Ceramic and carbon films for cars, trucks and EVs — heat, glare and UV rejection.',
        popular: true,
      },
      { id: 'ss-marine', name: 'Marine Window Tint', price: null, durationHours: 4, description: 'Ceramic and carbon film for boat windows and enclosures.' },
      { id: 'ss-res', name: 'Residential Window Film', price: null, durationHours: 4, description: 'Lower utility bills, cut glare and add privacy at home.' },
      { id: 'ss-com', name: 'Commercial Window Film', price: null, durationHours: 6, description: 'Energy-saving and decorative film for offices and storefronts.' },
      { id: 'ss-security', name: 'Security / Safety Film', price: null, durationHours: 4, description: 'Holds shattered glass in place — clear, opaque and reflective options.' },
    ],
    addons: [],
    freeRadiusZones: ['Mentor', 'Mentor-on-the-Lake', 'Painesville', 'Willoughby', 'Kirtland', 'Concord', 'Eastlake', 'Willowick', 'Wickliffe', 'Chardon', 'Madison', 'Perry'],
  },
  theme: {
    googleFonts: ['Kaushan+Script', 'Rubik:wght@400;500;700', 'Source+Sans+3:wght@400;600'],
    mode: 'light',
    display: { font: '"Kaushan Script"', weight: 400, color: '#FFFFFF' },
    heading: { font: 'Rubik', weight: 500, color: '#222222' },
    body: { font: '"Source Sans 3"' },
    label: { font: 'Rubik', weight: 500, case: 'uppercase', tracking: '0.06em', color: '#6F8A12' },
    radius: 6,
    colors: {
      page: '#F5F5F5',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F8E2',
      text: '#1E1E1E',
      muted: '#5F5F5F',
      border: '#E1E5CF',
      brand: '#9DB52A',
      brandFg: '#FFFFFF',
      accent: '#F7A21B',
    },
    button: { bg: '#BED63D', fg: '#464439', radius: 5, case: 'uppercase', weight: 500, font: 'Rubik' },
    hero: {
      topBar: { bg: '#BED63D', fg: '#FFFFFF', items: ['Address: 7898 Tyler Boulevard, Mentor, OH 44060', '(440) 954-8468'] },
      nav: {
        bg: '#FFFFFF',
        fg: '#222222',
        logoSize: 'lg',
        action: { label: '(440) 954-8468', href: 'tel:4409548468', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.5)), linear-gradient(160deg, #8fa3b0 0%, #6b6f62 45%, #3d3a35 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'The Family-Owned',
      highlight: 'Solar Protection Experts',
      highlightColor: '#BED63D',
      subline: 'Proudly Serving NE Ohio Since 1999',
      sub: 'Auto, marine, home and business window film. Choose what you’re tinting and request a time — we’ll confirm the film and quote.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
