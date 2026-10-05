import type { DemoEntry } from '../demo-entry'

// elitetouchmobiledetailing.com — Elementor "Detail Scale" site: cyan utility bar ("100% licensed & insured |
// 24/7 online scheduling"), black page, round cyan badge logo, Bai Jamjuree bold uppercase headline in white and
// cyan, Jura body, square cyan buttons. Despite the "24/7 online scheduling" banner, every CTA is a quote form.
// No prices are published, so every service is a custom quote.
export default {
  client: {
    slug: 'elite-touch',
    name: 'Elite Touch Mobile Detailing',
    tagline: 'Mobile or in-shop detailing, paint correction and ceramic coating in Mentor.',
    location: 'Mentor, OH',
    region: 'northeast-ohio',
    address: '7591 Tyler Blvd Unit 3, Mentor, OH 44060',
    logo: { src: '/logos/elite-touch.png', background: '#FFFFFF' },
    primaryColor: '#4EC8D7',
    accentColor: '#000000',
    vertical: 'auto',
    services: [
      { id: 'et-full', name: 'Full Detail', price: null, durationHours: 4, description: 'Hand wash, clay bar, polish and protection outside; vacuum, steam and shampoo inside.', popular: true },
      { id: 'et-interior', name: 'Interior Detailing', price: null, durationHours: 3, description: 'Vacuum, steam cleaning, upholstery shampoo and conditioned leather and trim.' },
      { id: 'et-exterior', name: 'Exterior Detailing', price: null, durationHours: 2.5, description: 'Gentle hand wash, clay bar decontamination, polish and wax or sealant.' },
      { id: 'et-correction', name: 'Paint Correction / Polishing', price: null, durationHours: 6, description: 'Remove swirls and scratches — up to Level 3 advanced correction.' },
      { id: 'et-ceramic', name: 'Ceramic Coating', price: null, durationHours: 8, description: 'Undrdog Pro coatings over a washed, decontaminated and corrected finish.' },
    ],
    addons: [],
    freeRadiusZones: ['Mentor', 'Willoughby', 'Painesville', 'Kirtland', 'Madison', 'Geneva', 'Chardon', 'Concord', 'Eastlake', 'Mentor-on-the-Lake'],
  },
  theme: {
    googleFonts: ['Bai+Jamjuree:wght@500;600;700', 'Jura:wght@400;500;600'],
    mode: 'dark',
    display: { font: '"Bai Jamjuree"', weight: 700, case: 'uppercase', tracking: '0.01em', color: '#FFFFFF' },
    heading: { font: '"Bai Jamjuree"', weight: 700, case: 'uppercase', color: '#4EC8D7' },
    body: { font: 'Jura' },
    label: { font: '"Bai Jamjuree"', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#4EC8D7' },
    radius: 0,
    colors: {
      page: '#000000',
      surface: '#0E1213',
      surfaceAlt: '#162024',
      text: '#FFFFFF',
      muted: '#A3B3B6',
      border: '#23343A',
      brand: '#4EC8D7',
      brandFg: '#000000',
      accent: '#2CB2C3',
    },
    button: { bg: '#4EC8D7', fg: '#FFFFFF', radius: 0, case: 'uppercase', weight: 600, font: '"Bai Jamjuree"' },
    hero: {
      topBar: { bg: '#4EC8D7', fg: '#FFFFFF', items: ['100% Licensed & Insured', '440 339-2346'], uppercase: true },
      nav: {
        bg: '#000000',
        fg: '#FFFFFF',
        logoSize: 'lg',
        action: { label: 'Get a Free Quote', href: 'tel:4403392346', style: 'button' },
      },
      layout: 'banner',
      background: '#000000',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Professional Auto',
      highlight: 'Detailing & Ceramic Coating in Mentor, Ohio',
      highlightColor: '#4EC8D7',
      highlightOnNewLine: true,
      sub: 'Experience the new-car feel again — at your driveway or our Mentor shop. Pick a service and request your time.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
