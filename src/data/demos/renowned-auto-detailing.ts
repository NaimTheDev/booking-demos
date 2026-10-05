import type { DemoEntry } from '../demo-entry'

// renownedautodetailing.com (Google Sites) — /interior, /exterior, /full-packages, /headlight-restoration,
// /undercarriage-cleaning, /maintenance-detailing. Exact Sedan / SUV / Large SUV prices for every package.
// "Book" opens a Google Form; they text/call/email back to confirm a date. FAQ: most jobs take 2–6 hours.
// Theme: black page, Bebas Neue headlines in yellow (#FFCC00), Barlow Condensed body, square white buttons,
// rubber-duck badge logo.
export default {
  client: {
    slug: 'renowned-auto-detailing',
    name: 'Renowned Auto Detailing',
    tagline: 'Bringing the best care to you',
    location: 'Strongsville, OH',
    region: 'northeast-ohio',
    address: 'Strongsville, OH',
    logo: { src: '/logos/renowned-auto-detailing.png', background: '#FFFFFF' },
    primaryColor: '#FFCC00',
    accentColor: '#000000',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'sedan', label: 'Sedan', hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV', hoursMultiplier: 1.1 },
          { id: 'large-suv', label: 'Large SUV', hoursMultiplier: 1.2 },
        ],
      },
    },
    services: [
      { id: 'ra-int-premier', name: 'Premier Interior', price: 205, priceBySize: { sedan: 205, suv: 215, 'large-suv': 220 }, durationHours: 2, description: 'Full vacuum, interior windows, hard surfaces scrubbed, seat cleaning, light crevice cleaning, crevices blown out.' },
      { id: 'ra-int-platinum', name: 'Platinum Interior', price: 230, priceBySize: { sedan: 230, suv: 240, 'large-suv': 245 }, durationHours: 2.5, description: 'Adds medium crevice cleaning, light carpet/upholstery shampoo, steam cleaning and door jamb wipe-down.' },
      { id: 'ra-int-renowned', name: 'Renowned Interior', price: 255, priceBySize: { sedan: 255, suv: 265, 'large-suv': 270 }, durationHours: 3, description: 'Heavy crevice cleaning, heavy shampoo, steam cleaning, stain extraction, deep clean of console and glove box.' },
      { id: 'ra-ext-premier', name: 'Premier Exterior', price: 105, priceBySize: { sedan: 105, suv: 120, 'large-suv': 140 }, durationHours: 1.5, description: 'Pre-wash, snow foam wash, wheels and tires with tire shine, bug removal, door jambs, exterior glass.' },
      { id: 'ra-ext-platinum', name: 'Platinum Exterior', price: 155, priceBySize: { sedan: 155, suv: 180, 'large-suv': 200 }, durationHours: 2.5, description: 'Adds bug and tar removal, wheel wells, full clay bar and a 3–6 month ceramic sealant.' },
      { id: 'ra-ext-renowned', name: 'Renowned Exterior', price: 215, priceBySize: { sedan: 215, suv: 225, 'large-suv': 235 }, durationHours: 3, description: 'Ceramic tire coating, deep door jambs and wheel wells, iron removal and a full wax.' },
      { id: 'ra-combo-premier', name: 'Premier Full Package', price: 330, priceBySize: { sedan: 330, suv: 340, 'large-suv': 360 }, durationHours: 3.5, description: 'Premier interior and exterior together.' },
      { id: 'ra-combo-platinum', name: 'Platinum Full Package', price: 400, priceBySize: { sedan: 400, suv: 410, 'large-suv': 430 }, durationHours: 5, description: 'Platinum interior and exterior, including the 3–6 month ceramic sealant.', popular: true },
      { id: 'ra-combo-renowned', name: 'Renowned Full Package', price: 450, priceBySize: { sedan: 450, suv: 460, 'large-suv': 475 }, durationHours: 6, description: 'The top package inside and out — deep jambs, exhaust tips, console and glove box.' },
      { id: 'ra-maint', name: 'Monthly Maintenance Package', price: 180, durationHours: 2, description: 'Monthly interior + exterior upkeep after your first detail (interior only $120, exterior only $110).' },
    ],
    addons: [
      { id: 'ra-headlights', name: 'Headlight Restoration', price: 125, addedHours: 1 },
      { id: 'ra-undercarriage', name: 'Undercarriage Cleaning', price: 50, addedHours: 0.5 },
    ],
    freeRadiusZones: ['Strongsville', 'North Royalton', 'Brunswick', 'Middleburg Heights', 'Berea', 'Olmsted Falls', 'Columbia Station', 'Broadview Heights', 'Parma'],
  },
  theme: {
    googleFonts: ['Bebas+Neue', 'Barlow+Condensed:wght@400;500;600;700'],
    mode: 'dark',
    display: { font: '"Bebas Neue"', weight: 400, case: 'uppercase', tracking: '0.01em', color: '#FFCC00' },
    heading: { font: '"Bebas Neue"', weight: 400, case: 'uppercase', tracking: '0.02em', color: '#FFCC00' },
    body: { font: '"Barlow Condensed"' },
    label: { font: '"Barlow Condensed"', weight: 600, case: 'uppercase', tracking: '0.08em', color: '#BDBDBD' },
    radius: 0,
    colors: {
      page: '#000000',
      surface: '#1C1C1C',
      surfaceAlt: '#262626',
      text: '#F9F9F9',
      muted: '#A8A8A8',
      border: '#3A3A3A',
      brand: '#FFCC00',
      brandFg: '#000000',
      accent: '#FFCC00',
    },
    button: { bg: '#F9F9F9', fg: '#1C1C1C', radius: 0, weight: 600, font: '"Barlow Condensed"' },
    hero: {
      nav: {
        bg: 'rgba(0, 0, 0, 0.85)',
        fg: '#F9F9F9',
        wordmark: 'Renowned Auto Detailing',
        action: { label: 'Call/Text 216-316-0439', href: 'tel:2163160439', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), radial-gradient(ellipse at 40% 30%, #6b6b6b 0%, #2a2a2a 50%, #0a0a0a 100%)',
      fg: '#F9F9F9',
      align: 'center',
      headline: 'Bringing the best care to you',
      headlineColor: '#FFCC00',
      sub: 'Mobile detailing out of Strongsville. Pick your package and size, choose a time, and skip the booking form and call-back.',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
