import type { DemoEntry } from '../demo-entry'

// albrightsecuritycenter.com — /residential-security-solutions, /commercial-security-solutions,
// /automotive-and-motorcycle-keys, /lock-repair-and-installation, /faqs. No prices published except the
// "no-cost, no-obligation security assessment". "Request a Service" opens a quote form ("someone from our team
// will be with you shortly"). Durations are estimates.
// Theme: Duda site — blue utility bar (#2A79AC), white header with the hand-drawn Albright logo, Inter headings,
// Source Sans body, deep teal-blue (#0E4E6C) 8px buttons over a darkened storefront photo.
export default {
  client: {
    slug: 'albright-security',
    name: 'Albright Security Center',
    tagline: 'Securing your world since 1963.',
    location: 'Medina, OH',
    region: 'northeast-ohio',
    address: '324 W Liberty St, Medina, OH 44256',
    logo: { src: '/logos/albright-security.png', background: '#FFFFFF' },
    primaryColor: '#0E4E6C',
    accentColor: '#2A79AC',
    vertical: 'locksmith',
    services: [
      { id: 'as-lockout', name: 'Emergency Lockout (Home, Business or Car)', price: null, durationHours: 1, description: '24-hour emergency service to get you back in fast.', popular: true },
      { id: 'as-locks', name: 'Lock Installation & Repair', price: null, durationHours: 1.5, description: 'Deadbolts, door knobs, padlocks and high-security locks installed or repaired.' },
      { id: 'as-keys', name: 'Key Duplication & Lost Key Replacement', price: null, durationHours: 0.5, description: 'House, automotive, motorcycle and camper/RV keys copied or replaced.' },
      { id: 'as-auto', name: 'Automotive & Motorcycle Keys', price: null, durationHours: 1, description: 'Car openings, key duplication and lost-key replacement for most makes.' },
      { id: 'as-master', name: 'Master Key System', price: null, durationHours: 3, description: 'One key for multiple locks — designed for homes and businesses.' },
      { id: 'as-safe', name: 'Safe Installation & Repair', price: null, durationHours: 2, description: 'High-security safes installed, opened and repaired.' },
      { id: 'as-access', name: 'Access Control & CCTV', price: null, durationHours: 4, description: 'Commercial access control systems and CCTV cameras with remote viewing.' },
      { id: 'as-assessment', name: 'Security Assessment & Consultation', price: 0, durationHours: 1, description: 'No-cost, no-obligation walk-through of your home or business security.' },
    ],
    addons: [
      { id: 'as-closers', name: 'Door Closers / File Cabinet Locks', price: null, addedHours: 0.5 },
    ],
    freeRadiusZones: ['Medina', '44256'],
  },
  theme: {
    googleFonts: ['Inter:wght@400;600;700', 'Source+Sans+3:wght@400;600'],
    mode: 'light',
    display: { font: 'Inter', weight: 700, tracking: '-0.01em', color: '#FFFFFF' },
    heading: { font: 'Inter', weight: 700, color: '#000000' },
    body: { font: '"Source Sans 3", "Source Sans Pro"' },
    label: { font: 'Inter', weight: 600, case: 'uppercase', tracking: '0.06em', color: '#2A79AC' },
    radius: 8,
    colors: {
      page: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',
      text: '#1A1A1A',
      muted: '#5E5E5E',
      border: '#D9DEE2',
      brand: '#0E4E6C',
      brandFg: '#FFFFFF',
      accent: '#2A79AC',
    },
    button: { bg: '#0E4E6C', fg: '#FFFFFF', radius: 8, weight: 600, font: 'Inter' },
    hero: {
      topBar: { bg: '#2A79AC', fg: '#FFFFFF', items: ['24 Hour Emergency Service Available', '(330) 722-7884'], align: 'between' },
      nav: {
        bg: '#FFFFFF',
        fg: '#000000',
        logoSize: 'lg',
        action: { label: 'Request a Service', href: '#booking', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(10,20,30,0.62), rgba(10,20,30,0.62)), linear-gradient(135deg, #5d6b55 0%, #3f4a52 50%, #2b2f33 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Securing Your World Since 1963',
      sub: 'Locally owned in Medina for over 50 years. Pick the job, choose a time, and we’ll confirm — no waiting on a call-back.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
