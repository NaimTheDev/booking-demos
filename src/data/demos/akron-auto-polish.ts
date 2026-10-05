import type { DemoEntry } from '../demo-entry'

// akronautopolish.com — WordPress/Divi, dark: navy/black glass header, neon-green (#00F239) nav links and phone
// button, wide geometric "regulator-nova" display face (Michroma stands in), Open Sans body, Bai Jamjuree uppercase
// buttons. The green-glow griffin crest is the hero. Exotic/luxury focus: SunTek PPF (Ultra, Reaction, Ultra Matte),
// SunTek window tint, Opti-Coat Pro / Pro+ ceramic, paint correction, color-change vinyl, luxury detailing.
// "By appointment only" — every CTA is "Call Now!" or a contact form. No prices published.
export default {
  client: {
    slug: 'akron-auto-polish',
    name: 'Akron Auto Polish',
    tagline: 'Preservation without compromise — PPF, tint, ceramic & luxury detailing since 2008.',
    location: 'Akron, OH',
    region: 'northeast-ohio',
    address: 'Akron, OH',
    logo: { src: '/logos/akron-auto-polish.png', background: '#F2F2F2' },
    primaryColor: '#00D132',
    accentColor: '#0A0D1F',
    vertical: 'tint',
    services: [
      { id: 'aap-ppf', name: 'Paint Protection Film (SunTek)', price: null, durationHours: 16, description: 'SunTek Ultra, Ultra Defense, Reaction and Ultra Matte PPF — self-healing, TruCut patterns.', popular: true },
      { id: 'aap-tint', name: 'Window Tint (SunTek)', price: null, durationHours: 3, description: 'CIR ceramic, Evolve IR and CXP carbon films. 99% UV rejection, lifetime warranty.' },
      { id: 'aap-ceramic', name: 'Opti-Coat Pro / Pro+ Ceramic Coating', price: null, durationHours: 8, description: 'Permanent 9H ceramic clear coat — certified Opti-Coat installer.' },
      { id: 'aap-correction', name: 'Paint Correction', price: null, durationHours: 10, description: 'Single to multi-step concours-level correction of swirls and imperfections.' },
      { id: 'aap-vinyl', name: 'Color Change Vinyl Wrap', price: null, durationHours: 24, description: 'High-end color-change and clear wraps.' },
      { id: 'aap-detail', name: 'Luxury Detailing', price: null, durationHours: 6, description: 'High-end interior & exterior detailing for exotic and luxury vehicles.' },
      { id: 'aap-interior', name: 'Opti-Guard Leather & Fabric Protection', price: null, durationHours: 2, description: 'Interior treatments that protect leather and fabric.' },
    ],
    addons: [],
    freeRadiusZones: ['Akron', 'Fairlawn', 'Bath', 'Hudson', 'Cuyahoga Falls', 'Stow', 'Copley', 'Green', 'Tallmadge', 'Medina', 'Canton'],
  },
  theme: {
    googleFonts: ['Michroma', 'Bai+Jamjuree:wght@500;700', 'Open+Sans:wght@400;600'],
    mode: 'dark',
    display: { font: 'Michroma', weight: 400, tracking: '0.01em', color: '#00F239' },
    heading: { font: 'Michroma', weight: 400, color: '#F2F2F2' },
    body: { font: '"Open Sans"' },
    label: { font: '"Bai Jamjuree"', weight: 700, case: 'uppercase', tracking: '0.14em', color: '#00F239' },
    radius: 6,
    colors: {
      page: '#07080F',
      surface: '#12141F',
      surfaceAlt: '#1B1E2C',
      text: '#F2F2F2',
      muted: '#9CA0AE',
      border: '#2A2E40',
      brand: '#00D132',
      brandFg: '#05060A',
      accent: '#00F239',
    },
    button: { bg: '#00D132', fg: '#05060A', radius: 0, case: 'uppercase', tracking: '0.12em', weight: 700, font: '"Bai Jamjuree"' },
    hero: {
      topBar: { bg: '#05060A', fg: '#FFFFFF', items: ['(330) 535-4129', 'info@AkronAutoPolish.com', 'By appointment only'], align: 'start' },
      nav: {
        bg: 'rgba(0, 0, 0, 0.74)',
        fg: '#00F239',
        wordmark: 'Akron Auto Polish',
        action: { label: 'Call Now!', href: 'tel:3305354129', style: 'outline', color: '#00F239' },
      },
      layout: 'banner',
      background: 'radial-gradient(ellipse at 50% 30%, #2b3150 0%, #141729 45%, #07080F 100%)',
      fg: '#F7F7F7',
      align: 'center',
      kicker: 'Protecting exceptional automobiles since 2009',
      headline: 'Preservation Without Compromise.',
      sub: 'PPF, tint, Opti-Coat and concours-level correction. Choose your service and request your appointment below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
