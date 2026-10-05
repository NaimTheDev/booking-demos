import type { DemoEntry } from '../demo-entry'

// avalondetailing.com — Webflow: white header with the triangle "A" badge, video hero with Manrope 700 title,
// sky-blue pill buttons. "Book Detail" opens a contact form. Prices from the pricing page (three size tabs);
// add-ons list the sedan price as "starting at" since they scale by size too.
export default {
  client: {
    slug: 'avalon-detailing',
    name: 'Avalon Mobile Detailing',
    tagline: 'Local experienced mobile detailing',
    location: 'Maineville, OH',
    region: 'southwest-ohio',
    address: 'Maineville, OH',
    logo: { src: '/logos/avalon-detailing.jpg', background: '#FFFFFF' },
    primaryColor: '#4BA4E0',
    accentColor: '#0C0C0C',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'sedan', label: 'Sedan / Coupe', hoursMultiplier: 1 },
          { id: 'suv', label: 'Small / Midsized SUV', hoursMultiplier: 1.15 },
          { id: 'truck', label: 'Full Size SUV / Truck / Van', hoursMultiplier: 1.3 },
        ],
      },
    },
    services: [
      { id: 'av-full', name: 'Interior & Exterior', price: 165, priceBySize: { sedan: 165, suv: 210, truck: 295 }, durationHours: 4, description: 'Full interior detail plus full exterior detail.', popular: true },
      { id: 'av-interior', name: 'Interior Detail', price: 110, priceBySize: { sedan: 110, suv: 165, truck: 205 }, durationHours: 2.5, description: 'Full vacuum, wipe-down of all surfaces, leather cleaning, spot stain removal, interior windows.' },
      { id: 'av-exterior', name: 'Exterior Detail', price: 80, priceBySize: { sedan: 80, suv: 90, truck: 120 }, durationHours: 1.5, description: 'Full body wash, synthetic spray sealant (up to 1 month), wheels, tire shine, windows.' },
    ],
    addons: [
      { id: 'av-ceramic-wax', name: "Meguiar's Ceramic Wax (incl. clay bar)", price: 150, startingAt: true, addedHours: 2 },
      { id: 'av-extraction', name: 'Full Upholstery Extraction', price: 150, startingAt: true, addedHours: 1.5 },
      { id: 'av-spot', name: 'Spot Interior Extraction', price: 50, startingAt: true, addedHours: 0.5 },
      { id: 'av-clay', name: 'Clay Bar Treatment', price: 40, startingAt: true, addedHours: 0.5 },
      { id: 'av-leather', name: 'Leather Protection', price: 20, startingAt: true, addedHours: 0.5 },
      { id: 'av-excess', name: 'Excessive Trash / Pet Hair (per hour)', price: 40, addedHours: 1 },
    ],
    freeRadiusZones: ['Maineville', 'Loveland', 'Mason', 'Lebanon', 'West Chester', 'Montgomery', 'Blue Ash', 'Symmes Township', 'Deerfield Township', 'Kings Mills', 'Morrow', 'South Lebanon', 'Liberty Township', 'Fairfield', 'Sharonville', 'Landen', 'Madeira', 'Indian Hill', 'Kenwood', 'Milford'],
  },
  theme: {
    googleFonts: ['Manrope:wght@400;500;700'],
    mode: 'light',
    display: { font: 'Manrope', weight: 700, tracking: '-0.01em', color: '#FFFFFF' },
    heading: { font: 'Manrope', weight: 700, color: '#0C0C0C' },
    body: { font: 'Manrope' },
    label: { font: 'Manrope', weight: 700, case: 'uppercase', tracking: '0.08em', color: '#3C769E' },
    radius: 14,
    colors: {
      page: '#F5F5F5',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF5FB',
      text: '#1A1A1A',
      muted: '#808080',
      border: '#E1E1E1',
      brand: '#4BA4E0',
      brandFg: '#FFFFFF',
      accent: '#3C769E',
    },
    button: { bg: '#4BA4E0', fg: '#0C0C0C', radius: 50, weight: 700, font: 'Manrope' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#0C0C0C',
        logoSize: 'lg',
        action: { label: '(513) 549-7676', href: 'tel:5135497676', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(180deg, rgba(12,12,12,0.25) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #5F6B78 0%, #2C3540 60%, #0C0C0C 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Avalon Mobile Detailing',
      sub: 'Serving Northern Cincinnati with professional interior and exterior detailing. Best part — we come to you. Pick your package and vehicle size to book.',
      size: 'xl',
      overlap: false,
    },
  },
} satisfies DemoEntry
