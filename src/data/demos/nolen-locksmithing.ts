import type { DemoEntry } from '../demo-entry'

// nolenlocksmithing.com — Legend Web Works site: full-bleed photo of the wrapped Nolen van, "SECURITY YOU CAN
// TRUST" in yellow Alfa Slab One, chain divider, navy square button, silver condensed wordmark logo.
// Owner-operator James Nolen (Dayton; Facebook lists Spring Valley). Free estimates by phone; no prices published.
export default {
  client: {
    slug: 'nolen-locksmithing',
    name: 'Nolen Locksmithing',
    tagline: 'Security you can trust.',
    location: 'Dayton, OH',
    region: 'southwest-ohio',
    address: 'Dayton, OH',
    logo: { src: '/logos/nolen-locksmithing.png', background: '#1E1E1E' },
    primaryColor: '#123960',
    accentColor: '#F3C405',
    vertical: 'locksmith',
    services: [
      { id: 'nl-house-lockout', name: 'House Lockout', price: null, durationHours: 1, description: 'Locked out of your house? We come to you.', popular: true },
      { id: 'nl-auto-lockout', name: 'Vehicle Lockout (Auto, Truck, Semi)', price: null, durationHours: 1, description: 'Fast response from a locksmith with eighteen years of experience on all kinds of vehicles.' },
      { id: 'nl-rekey', name: 'Re-key Locks', price: null, durationHours: 1.5, description: 'Bought a new home? Have your locks re-keyed or changed.' },
      { id: 'nl-install', name: 'New Lock Installation', price: null, durationHours: 1.5, description: 'Install new or additional locks — all products under warranty.' },
      { id: 'nl-repair', name: 'Lock Repair', price: null, durationHours: 1, description: 'Repair and service for residential and commercial locks.' },
      { id: 'nl-keyless', name: 'Keyless Entry / Digital Locks', price: null, durationHours: 1.5, description: 'Keyless and digital lock installation.' },
      { id: 'nl-commercial', name: 'Commercial Locksmith', price: null, durationHours: 2, description: 'Store front locks, panic devices, closers, repair and replacement.' },
    ],
    addons: [],
    freeRadiusZones: ['Dayton', 'Spring Valley'],
  },
  theme: {
    googleFonts: ['Alfa+Slab+One', 'Source+Sans+3:wght@400;600;700', 'Roboto:wght@400;500'],
    mode: 'light',
    display: { font: '"Alfa Slab One"', weight: 400, case: 'uppercase', color: '#F3C405' },
    heading: { font: '"Alfa Slab One"', weight: 400, color: '#333333' },
    body: { font: '"Source Sans 3", "Source Sans Pro"' },
    label: { font: 'Roboto', weight: 500, case: 'uppercase', tracking: '0.08em', color: '#555555' },
    radius: 4,
    colors: {
      page: '#EFEFEF',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',
      text: '#212529',
      muted: '#666666',
      border: '#DDDDDD',
      brand: '#123960',
      brandFg: '#FFFFFF',
      accent: '#F3C405',
    },
    button: { bg: '#123960', fg: '#FFFFFF', radius: 0, weight: 500, font: 'Roboto' },
    hero: {
      nav: {
        bg: '#111111',
        fg: '#F3C405',
        action: { label: 'Call 937.673.9859', href: 'tel:9376739859', style: 'button', color: '#F3C405' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.59), rgba(0,0,0,0.59)), linear-gradient(160deg, #5b6066 0%, #2c3035 55%, #121417 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Security You Can Trust',
      ornament: 'rule',
      ornamentColor: '#FFFFFF',
      sub: 'Trusted residential, commercial and automotive lock-out service for Dayton and surrounding counties. Request your visit below.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
