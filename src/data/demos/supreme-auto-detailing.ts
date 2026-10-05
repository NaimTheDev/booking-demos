import type { DemoEntry } from '../demo-entry'

// supremeautodetailingohio.com — /interior-auto-detailing/, /exterior-auto-detailing-services/, /ceramic-coating/,
// /rv-detailing-medina-oh/, /detail-maintenance-packages/, /ozone-odor-elimination/. Prices are published as
// "starting at" (ceramic as ranges), so every size tier keeps the starting price; durations come from the site
// where listed. Every "Book Now" goes to the contact page (email + "Call to Schedule").
// Theme: white WordPress site, pale grey-blue header, black pill "Book Now", red (#DA0000) buttons, Hubot Sans body.
const SAME_PRICE = 1
export default {
  client: {
    slug: 'supreme-auto-detailing',
    name: 'Supreme Auto Detailing',
    tagline: 'Veteran-owned mobile detailing — we come to you.',
    location: 'Medina, OH',
    region: 'northeast-ohio',
    address: 'Medina, OH',
    logo: { src: '/logos/supreme-auto-detailing.png', background: '#FFFFFF' },
    primaryColor: '#DA0000',
    accentColor: '#000000',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'car', label: 'Car', priceMultiplier: SAME_PRICE, hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV / Truck', priceMultiplier: SAME_PRICE, hoursMultiplier: 1.15 },
          { id: 'xl', label: 'Minivan / 3-Row', priceMultiplier: SAME_PRICE, hoursMultiplier: 1.25 },
        ],
      },
    },
    services: [
      { id: 'sad-int-deep', name: 'Deep Interior Detail', price: 169.99, startingAt: true, durationHours: 2.5, description: 'Heavy-duty vacuum, carpet and cloth seat shampoo & extraction, steam-cleaned hard surfaces, glass, odor-bacteria removal, Operation Blackout finish.', popular: true },
      { id: 'sad-int-premium', name: 'Premium Interior Restoration', price: 249.99, startingAt: true, durationHours: 4.5, description: 'Everything in the Deep Interior plus enzyme stain & odor treatment, pet hair removal and steam sanitation.' },
      { id: 'sad-ext-standard', name: 'Standard Exterior Detail', price: 149.99, startingAt: true, durationHours: 2.5, description: 'Hand wash, clay bar, wheels and tires cleaned and dressed, exterior glass, paint-enhancement sealant.' },
      { id: 'sad-ext-premium', name: 'Premium Exterior Detail', price: 259.99, startingAt: true, durationHours: 4, description: 'Adds undercarriage wash, one-step paint correction, 5-month wax and trim restoration.' },
      { id: 'sad-ceramic-1', name: '1-Stage Correction + 1-Year Ceramic', price: 500, startingAt: true, durationHours: 6, description: 'Entry-level coating for daily drivers ($500–$900+ depending on vehicle and paint).' },
      { id: 'sad-ceramic-3', name: '2-Stage Correction + 3-Year Ceramic', price: 800, startingAt: true, durationHours: 9, description: 'Deeper correction and longer protection ($800–$1,400+).' },
      { id: 'sad-ceramic-5', name: 'Multi-Stage Correction + 5-Year Ceramic', price: 1200, startingAt: true, durationHours: 12, description: 'Maximum gloss and durability for long-term ownership ($1,200–$1,800).' },
      { id: 'sad-rv', name: 'RV & Camper Detail', price: null, durationHours: 5, description: 'Interior and exterior detailing for campers and Class A, B and C RVs — custom quote.' },
      { id: 'sad-membership', name: 'Maintenance Membership', price: null, durationHours: 1.5, description: 'Essential, Premium or Supreme plans — monthly or bi-weekly upkeep with priority booking.' },
    ],
    addons: [{ id: 'sad-ozone', name: 'Ozone Odor Elimination', price: null, addedHours: 1 }],
    freeRadiusZones: ['Medina', 'Akron', 'Hudson'],
  },
  theme: {
    googleFonts: ['Hubot+Sans:wght@400;600;700;800', 'Baloo+Chettan+2:wght@400;500;600'],
    mode: 'light',
    display: { font: '"Hubot Sans", "Helvetica Neue", Arial, sans-serif', weight: 800, tracking: '-0.01em', color: '#FFFFFF' },
    heading: { font: '"Hubot Sans", "Helvetica Neue", Arial, sans-serif', weight: 700, color: '#111111' },
    body: { font: '"Hubot Sans", "Helvetica Neue", Arial, sans-serif' },
    label: { font: '"Baloo Chettan 2"', weight: 600, case: 'uppercase', tracking: '0.06em', color: '#6B6B6B' },
    radius: 7,
    colors: {
      page: '#F4F6F8',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF1F4',
      text: '#111111',
      muted: '#666666',
      border: '#DADFE4',
      brand: '#DA0000',
      brandFg: '#FFFFFF',
      accent: '#DA0000',
    },
    button: { bg: '#DA0000', fg: '#FFFFFF', radius: 7, weight: 600, font: '"Baloo Chettan 2"' },
    hero: {
      nav: {
        bg: 'linear-gradient(90deg, #F2F4F6 0%, #C9D3DC 100%)',
        fg: '#111111',
        action: { label: 'Book Now', href: '#booking', style: 'button', color: '#000000' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(ellipse at 70% 40%, #5b4a3c 0%, #262626 55%, #0d0d0d 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Mobile Car Detailing in Medina, Ohio', style: 'italic' },
      headline: 'Get Your Vehicle Looking',
      highlight: 'SUPREME',
      highlightColor: '#FF2A1A',
      sub: 'Veteran owned & operated. Interior, exterior and ceramic coating at your driveway — no drop-offs, no waiting, and now no phone tag to get on the schedule.',
      ornament: 'rule',
      ornamentColor: '#FFFFFF',
      size: 'lg',
      overlap: false,
    },
  },
} satisfies DemoEntry
