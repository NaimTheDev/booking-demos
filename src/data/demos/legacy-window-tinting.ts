import type { DemoEntry } from '../demo-entry'

// facebook.com/legacywindowtinting — no website. Intro: "Professional window tinting & detailing. We only use and
// install the best products for your vehicle." Shop at 41785 N Ridge Rd, Elyria. No services list or prices are
// published, so everything is a custom quote and the menu sticks to the two things they say they do.
// No usable logo (the profile picture is a storefront photo) — text wordmark instead. Theme follows the
// storefront sign: red and navy lettering on white, dark showroom backdrop.
export default {
  client: {
    slug: 'legacy-window-tinting',
    name: 'Legacy Window Tinting & More',
    tagline: 'Professional window tinting & detailing.',
    location: 'Elyria, OH',
    region: 'northeast-ohio',
    address: '41785 N Ridge Rd, Elyria, OH 44035',
    primaryColor: '#C8102E',
    accentColor: '#1B2A57',
    vertical: 'multi',
    services: [
      { id: 'lw-tint', name: 'Automotive Window Tinting', price: null, durationHours: 3, description: 'Professional tint for cars, trucks and SUVs — full vehicle or select windows. Quote by vehicle and film.', category: 'tint', popular: true },
      { id: 'lw-detail', name: 'Vehicle Detailing', price: null, durationHours: 4, description: 'Interior and exterior detailing at the Elyria shop.', category: 'auto' },
    ],
    addons: [],
    freeRadiusZones: ['Elyria', '44035'],
  },
  theme: {
    googleFonts: ['Oswald:wght@500;600;700', 'Roboto:wght@400;500;700'],
    mode: 'dark',
    display: { font: 'Oswald', weight: 700, case: 'uppercase', tracking: '0.02em', color: '#FFFFFF' },
    heading: { font: 'Oswald', weight: 600, case: 'uppercase', tracking: '0.03em', color: '#F2F2F2' },
    body: { font: 'Roboto' },
    label: { font: 'Roboto', weight: 500, case: 'uppercase', tracking: '0.12em', color: '#9FA6B8' },
    radius: 6,
    colors: {
      page: '#0F1424',
      surface: '#171E33',
      surfaceAlt: '#1F2740',
      text: '#F2F4F8',
      muted: '#9FA6B8',
      border: '#2C3550',
      brand: '#D7263D',
      brandFg: '#FFFFFF',
      accent: '#E84A5F',
    },
    button: { bg: '#C8102E', fg: '#FFFFFF', radius: 6, case: 'uppercase', tracking: '0.08em', weight: 600, font: 'Oswald' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#1B2A57',
        wordmark: 'Legacy Window Tinting & More',
        action: { label: '(440) 654-6227', href: 'tel:4406546227', style: 'button' },
      },
      layout: 'banner',
      background: 'radial-gradient(ellipse at 50% 0%, #2a3a6e 0%, #141b30 55%, #0a0e1a 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Elyria · North Ridge Rd', style: 'caps', color: '#E84A5F' },
      headline: 'Window Tinting',
      highlight: '& Detailing',
      highlightColor: '#E84A5F',
      highlightOnNewLine: true,
      sub: 'We only use and install the best products for your vehicle. Pick a service and request your install date — no Messenger back-and-forth.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
