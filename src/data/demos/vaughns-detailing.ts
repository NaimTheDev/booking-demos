import type { DemoEntry } from '../demo-entry'

// vaughnsdetailing.com — WordPress (Salient): white header with the yellow-orange VAUGHN'S logo, dark photo hero
// with a huge light-grey geometric uppercase headline and Libre Baskerville italic subline, orange square
// uppercase buttons with wide tracking, orange banner strip. No prices published — every job is quoted.
export default {
  client: {
    slug: 'vaughns-detailing',
    name: "Vaughn's Marine & RV Detailing",
    tagline: 'Marine | Auto | RV | Motorcycle',
    location: 'Lebanon, OH',
    region: 'southwest-ohio',
    address: 'Lebanon, OH',
    logo: { src: '/logos/vaughns-detailing.png', background: '#FFFFFF' },
    primaryColor: '#F7941E',
    accentColor: '#252525',
    vertical: 'multi',
    services: [
      { id: 'vd-boat-wash', name: 'Boat Wash & Wax / Sealer', price: null, durationHours: 4, description: 'Hand wash plus wax or sealer for the hull and topsides.', category: 'marine', popular: true },
      { id: 'vd-boat-oxidation', name: 'Oxidation Removal & Gelcoat Correction', price: null, durationHours: 8, description: 'Acid wash, compounding and polishing to bring faded gelcoat back.', category: 'marine' },
      { id: 'vd-boat-coating', name: 'Marine Coating Package', price: null, durationHours: 8, description: 'Ceramic coating packages for boats.', category: 'marine' },
      { id: 'vd-boat-interior', name: 'Upholstery & EVA Flooring', price: null, durationHours: 4, description: 'Upholstery cleaning and EVA foam (SeaDek, Gatorstep) or carpet flooring.', category: 'marine' },
      { id: 'vd-boat-ppf', name: 'Marine Paint Protection Film', price: null, durationHours: 8, description: 'Clear protection film for high-wear areas.', category: 'marine' },
      { id: 'vd-rv-wash', name: 'RV Wash & Wax', price: null, durationHours: 5, description: 'Full exterior wash and wax for motorhomes, campers and trailers.', category: 'rv' },
      { id: 'vd-rv-oxidation', name: 'RV Oxidation Removal & Coating', price: null, durationHours: 8, description: 'Oxidation removal with optional coating package.', category: 'rv' },
      { id: 'vd-auto-detail', name: 'Auto Wash & Interior Detail', price: null, durationHours: 4, description: 'Wash, interior detail and carpet extraction for cars, trucks and motorcycles.', category: 'auto' },
      { id: 'vd-auto-correction', name: 'Paint Correction & Coating', price: null, durationHours: 8, description: 'Paint correction with coating packages.', category: 'auto' },
    ],
    addons: [
      { id: 'vd-restoration', name: 'Restoration / Custom Upholstery Consult', price: null, addedHours: 1 },
    ],
    freeRadiusZones: ['Lebanon', 'Mason', 'South Lebanon', 'Morrow', 'Maineville', 'Springboro', 'Waynesville', 'Cincinnati', 'Dayton'],
  },
  theme: {
    googleFonts: ['Josefin+Sans:wght@300;600;700', 'Montserrat:wght@400;700', 'Libre+Baskerville:ital@1'],
    mode: 'light',
    display: { font: '"Josefin Sans"', weight: 700, case: 'uppercase', tracking: '0.02em', color: '#D4D4D4' },
    heading: { font: '"Josefin Sans"', weight: 700, case: 'uppercase', tracking: '0.03em', color: '#252525' },
    body: { font: 'Montserrat' },
    label: { font: 'Montserrat', weight: 700, case: 'uppercase', tracking: '0.14em', color: '#C26F0A' },
    radius: 0,
    colors: {
      page: '#F6F6F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F2F2F2',
      text: '#333333',
      muted: '#676767',
      border: '#DDDDDD',
      brand: '#F7941E',
      brandFg: '#FFFFFF',
      accent: '#F7941E',
    },
    button: { bg: '#F7941E', fg: '#FFFFFF', radius: 0, case: 'uppercase', tracking: '0.12em', weight: 700, font: 'Montserrat' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#676767',
        action: { label: '937-481-1032', href: 'tel:9374811032', style: 'text', color: '#F7941E' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(20,20,20,0.72), rgba(20,20,20,0.72)), #4A4A4A',
      fg: '#FFFFFF',
      align: 'center',
      headline: "Vaughn's Detailing",
      subline: 'Marine Detailing & Auto Detailing Service | Warren County Ohio',
      sub: 'Boats, RVs, cars and motorcycles brought back to showroom shine. Pick your service and request a date.',
      size: 'xl',
      overlap: false,
    },
  },
} satisfies DemoEntry
