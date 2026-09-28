export type Vertical = 'auto' | 'marine' | 'stone' | 'rv' | 'multi'

export type Region = 'northeast-ohio' | 'central-ohio'

/** A concrete service category. Multi-vertical clients tag each service with one. */
export type ServiceCategory = Exclude<Vertical, 'multi'>

export interface SizeTier {
  id: string
  label: string
  /** Scales flat prices for this size. Defaults to 1 (use `priceBySize` for exact prices). */
  priceMultiplier?: number
  hoursMultiplier: number
  /** Length used to price per-foot services. */
  referenceFeet?: number
}

export interface SizeGroup {
  label: string
  tiers: SizeTier[]
}

export interface Service {
  id: string
  name: string
  /** Base price (smallest size for size-priced services). `null` = custom quote. */
  price: number | null
  /** Exact published price per size tier id; a `null` entry is a quote for that size. */
  priceBySize?: Record<string, number | null>
  /** 'per-foot' prices are multiplied by the selected tier's reference length. Defaults to flat. */
  priceUnit?: 'flat' | 'per-foot'
  /** The business lists this price as "starting at". */
  startingAt?: boolean
  durationHours: number
  description: string
  /** Required for multi-vertical clients so the widget can filter by category. */
  category?: ServiceCategory
  popular?: boolean
}

export interface Addon {
  id: string
  name: string
  /** `null` = priced by quote. */
  price: number | null
  startingAt?: boolean
  addedHours: number
  /** Only offered when this category is selected. Omit for add-ons that apply to every category. */
  category?: ServiceCategory
}

export interface ClientLogo {
  /** Path under /public. */
  src: string
  /** Plate color behind the logo; some logos only read on light or dark backgrounds. */
  background: string
}

export interface ClientConfig {
  slug: string
  name: string
  tagline: string
  location: string
  /** Drives the fallback "local ZIP" check and grouping on the admin index. */
  region: Region
  /** Business address (or city when none is published); used as the address input placeholder. */
  address: string
  /** Omitted for clients without a logo image; the widget falls back to a vertical icon. */
  logo?: ClientLogo
  primaryColor: string
  accentColor: string
  vertical: Vertical
  /** Client-specific size options, overriding the shared defaults for that category. */
  sizeTiers?: Partial<Record<ServiceCategory, SizeGroup>>
  services: Service[]
  addons: Addon[]
  freeRadiusZones: string[]
}

/*
 * Services, prices and add-ons below are taken from each business's own website
 * (sitemap service pages). `price: null` means the site doesn't publish a price.
 * Durations are only published by a few sites; the rest are estimates.
 */
export const clients: ClientConfig[] = [
  {
    // gkspolishing.com: /detailing/automotive/, /ceramic-coatings/automotive/, /detailing/boats/, /hardsurface/
    slug: 'gks',
    name: "GK's Custom Polishing",
    tagline: 'Mirror finishes for cars, boats & stone — one call does it all.',
    location: 'Avon, OH',
    region: 'northeast-ohio',
    address: '1215 Lear Industrial Pkwy, Avon, OH 44011',
    logo: { src: '/logos/gks.png', background: '#FFFFFF' },
    primaryColor: '#C92A2A',
    accentColor: '#111111',
    vertical: 'multi',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: '2-door', label: '2-Door', hoursMultiplier: 1 },
          { id: '4-door', label: '4-Door / Small Truck', hoursMultiplier: 1 },
          { id: 'full-size', label: 'Full-Size Car / Regular SUV / Mid-Size Truck', hoursMultiplier: 1.1 },
          { id: 'mid-suv', label: 'Mid-Size SUV / Full-Size Truck', hoursMultiplier: 1.15 },
          { id: 'minivan', label: 'Minivan / XL Truck', hoursMultiplier: 1.2 },
          { id: 'full-suv', label: 'Full-Size SUV / Van', hoursMultiplier: 1.25 },
        ],
      },
      marine: {
        label: 'Boat length',
        tiers: [
          { id: '20-25', label: '20 – 25 ft', hoursMultiplier: 1, referenceFeet: 23 },
          { id: '26-30', label: '26 – 30 ft', hoursMultiplier: 1.1, referenceFeet: 28 },
          { id: '31-35', label: '31 – 35 ft', hoursMultiplier: 1.25, referenceFeet: 33 },
          { id: '36-40', label: '36 – 40 ft', hoursMultiplier: 1.4, referenceFeet: 38 },
          { id: '41-45', label: '41 – 45 ft', hoursMultiplier: 1.55, referenceFeet: 43 },
          { id: '46-50', label: '46 – 50 ft', hoursMultiplier: 1.7, referenceFeet: 48 },
          { id: '51-55', label: '51 – 55 ft', hoursMultiplier: 1.85, referenceFeet: 53 },
        ],
      },
    },
    services: [
      {
        id: 'gks-full-detail',
        name: 'Full Detail (Interior & Exterior)',
        price: 395,
        priceBySize: { '2-door': 395, '4-door': 405, 'full-size': 415, 'mid-suv': 425, minivan: 450, 'full-suv': 470 },
        durationHours: 6,
        description: 'Hand wash, clay bar, machine polish, carnauba wax and steam-extracted carpets. Free loaner and pick-up.',
        category: 'auto',
        popular: true,
      },
      {
        id: 'gks-int-or-ext',
        name: 'Interior or Exterior Detail',
        price: 250,
        priceBySize: { '2-door': 250, '4-door': 265, 'full-size': 280, 'mid-suv': 290, minivan: 295, 'full-suv': 300 },
        durationHours: 3.5,
        description: 'Choose either the full interior or the full exterior half of our detail.',
        category: 'auto',
      },
      {
        id: 'gks-opticoat-pro',
        name: 'Opti-Coat Pro Ceramic Coating',
        price: 999,
        priceBySize: { '2-door': 999, '4-door': 1099, 'full-size': 1299, 'mid-suv': 1399, minivan: null, 'full-suv': null },
        durationHours: 9,
        description: 'Professional ceramic coating with 1 stage of paint correction. 5-year warranty.',
        category: 'auto',
      },
      {
        id: 'gks-opticoat-pro-plus',
        name: 'Opti-Coat Pro Plus Ceramic Coating',
        price: 1399,
        priceBySize: { '2-door': 1399, '4-door': 1499, 'full-size': 1699, 'mid-suv': 1799, minivan: null, 'full-suv': null },
        durationHours: 9,
        description: 'Upgraded Opti-Coat with 1 stage of paint correction. 7-year warranty.',
        category: 'auto',
      },
      {
        id: 'gks-topside-silver',
        name: 'Topside Detail — Silver',
        price: 35,
        priceUnit: 'per-foot',
        durationHours: 5,
        description: 'Topside wash, compound and wax priced per linear foot.',
        category: 'marine',
        popular: true,
      },
      {
        id: 'gks-topside-gold',
        name: 'Topside Detail — Gold',
        price: 38.5,
        priceUnit: 'per-foot',
        durationHours: 6,
        description: 'Our premium topside package, priced per linear foot.',
        category: 'marine',
      },
      {
        id: 'gks-hull-gelcoat',
        name: 'All-Gelcoat Hull Detail',
        price: 29,
        priceUnit: 'per-foot',
        durationHours: 4,
        description: 'Hull cleaning and polish for all-gelcoat hulls, priced per linear foot.',
        category: 'marine',
      },
      {
        id: 'gks-cabin',
        name: 'Boat Interior (Cabin) Cleaning',
        price: 315,
        priceBySize: { '20-25': 315, '26-30': 340, '31-35': 390, '36-40': 445, '41-45': 485, '46-50': 515, '51-55': 585 },
        durationHours: 3,
        description: 'Full cabin interior cleaning, priced by boat length.',
        category: 'marine',
      },
      {
        id: 'gks-jet-ski',
        name: 'Jet Ski Detail',
        price: 395,
        durationHours: 3,
        description: 'Complete personal watercraft detail.',
        category: 'marine',
      },
      {
        id: 'gks-stone',
        name: 'Natural Stone Polish & Restoration',
        price: null,
        durationHours: 5,
        description: 'Cleaning, polishing, sealing and restoration for marble, granite, travertine, limestone and more.',
        category: 'stone',
        popular: true,
      },
      {
        id: 'gks-grout',
        name: 'Tile & Grout Clean + Color Seal',
        price: null,
        durationHours: 4,
        description: 'Deep-clean tile and grout, then color seal in one of 48 colors.',
        category: 'stone',
      },
      {
        id: 'gks-concrete',
        name: 'Concrete Polishing & Coatings',
        price: null,
        durationHours: 8,
        description: 'Polished concrete, acid stain, epoxy flake and metallic epoxy floors.',
        category: 'stone',
      },
      {
        id: 'gks-honed',
        name: 'Honed & Leathered Stone Finish',
        price: null,
        durationHours: 6,
        description: 'Convert polished stone to a honed or leathered finish.',
        category: 'stone',
      },
    ],
    addons: [
      { id: 'gks-leather', name: 'Leather Cleaning & Conditioning', price: 49.95, addedHours: 0.5, category: 'auto' },
      { id: 'gks-engine', name: 'Engine Degreasing & Dressing', price: 49.95, addedHours: 0.5, category: 'auto' },
      { id: 'gks-pet', name: 'Pet Hair Removal', price: 60, addedHours: 0.5, category: 'auto' },
      { id: 'gks-headlights', name: 'Headlight Restoration (pair)', price: 120, addedHours: 1, category: 'auto' },
      { id: 'gks-teflon', name: 'Teflon Paint Sealant', price: 80, addedHours: 0.5, category: 'auto' },
      { id: 'gks-rainx', name: 'Rain-X on Windows', price: 67.5, addedHours: 0.5, category: 'auto' },
      { id: 'gks-ozone', name: 'Ozone Treatment', price: 110, addedHours: 1 },
    ],
    freeRadiusZones: ['Avon', 'Avon Lake', 'Sheffield', 'North Ridgeville', '44011', '44012', '44039'],
  },
  {
    // dynamiccardetail.com: /auto-detailing/ (price cards), /exterior-paint-enhancement/, /ceramic-coatings/, /rv-s/, /headlight-restore/
    slug: 'dynamic-detail',
    name: 'Dynamic Detail',
    tagline: 'Showroom-level detailing for Cleveland drivers.',
    location: 'Cleveland, OH',
    region: 'northeast-ohio',
    address: '14206 Carrydale Ave, Cleveland, OH 44111',
    logo: { src: '/logos/dynamic-detail.png', background: '#FFFFFF' },
    primaryColor: '#E02020',
    accentColor: '#1F1F1F',
    vertical: 'multi',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'sedan', label: 'Sedan', hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV', hoursMultiplier: 1.1 },
          { id: 'xl-suv', label: 'XL SUV', hoursMultiplier: 1.25 },
          { id: 'pickup', label: 'Pickup', hoursMultiplier: 1.1 },
          { id: 'xl-pickup', label: 'XL Pickup', hoursMultiplier: 1.2 },
        ],
      },
    },
    services: [
      {
        id: 'dd-level-1',
        name: 'Level 1 Full Detail',
        price: 150,
        priceBySize: { sedan: 150, suv: 180, 'xl-suv': 220, pickup: 180, 'xl-pickup': 200 },
        durationHours: 2.5,
        description: 'Hand wash, wheels, door jambs, tire shine, ceramic spray, vacuum and interior wipe-down.',
        category: 'auto',
      },
      {
        id: 'dd-level-2',
        name: 'Level 2 Full Detail',
        price: 220,
        priceBySize: { sedan: 220, suv: 280, 'xl-suv': 320, pickup: 240, 'xl-pickup': 300 },
        durationHours: 4,
        description: 'Everything in Level 1 plus carpets and seats shampooed.',
        category: 'auto',
        popular: true,
      },
      {
        id: 'dd-level-3',
        name: 'Level 3 Full Detail',
        price: 320,
        priceBySize: { sedan: 320, suv: 380, 'xl-suv': 420, pickup: 340, 'xl-pickup': 400 },
        durationHours: 6,
        description: 'Level 2 plus a clay wash and machine polish of the paint.',
        category: 'auto',
      },
      {
        id: 'dd-interior-2',
        name: 'Interior 2',
        price: 200,
        priceBySize: { sedan: 200, suv: 240, 'xl-suv': 280, pickup: 220, 'xl-pickup': 260 },
        durationHours: 3,
        description: 'Interior only: carpets shampooed, seats cleaned and protected.',
        category: 'auto',
      },
      {
        id: 'dd-one-step',
        name: 'One Step Exterior Polish',
        price: 140,
        priceBySize: { sedan: 140, suv: 160, 'xl-suv': 180, pickup: 160, 'xl-pickup': 180 },
        durationHours: 4,
        description: 'Paint clayed and machine polished to remove light swirls, finished with ceramic spray.',
        category: 'auto',
      },
      {
        id: 'dd-ceramic',
        name: 'Ceramic Coating Install',
        price: 350,
        priceBySize: { sedan: 350, suv: 360, 'xl-suv': 380, pickup: 360, 'xl-pickup': 380 },
        durationHours: 5,
        description: 'CQuartz advanced ceramic coating. A paint enhancement beforehand is recommended.',
        category: 'auto',
      },
      {
        id: 'dd-rv-wash',
        name: 'RV Wash',
        price: 6,
        priceUnit: 'per-foot',
        durationHours: 3,
        description: 'Full exterior hand wash, priced per linear foot.',
        category: 'rv',
      },
      {
        id: 'dd-rv-seal',
        name: 'RV Wash + Ceramic Spray Seal',
        price: 9,
        priceUnit: 'per-foot',
        durationHours: 4,
        description: 'Wash plus a sealant / ceramic spray on the paint.',
        category: 'rv',
        popular: true,
      },
      {
        id: 'dd-rv-enhance',
        name: 'RV Wash + One-Step Paint Enhancement',
        price: 16,
        priceUnit: 'per-foot',
        durationHours: 8,
        description: 'Wash plus a one-step machine polish to restore gloss.',
        category: 'rv',
      },
    ],
    addons: [
      { id: 'dd-headlights', name: 'Headlight Restore (pair)', price: 80, startingAt: true, addedHours: 1, category: 'auto' },
      { id: 'dd-roof', name: 'RV Roof Wash', price: 100, startingAt: true, addedHours: 1, category: 'rv' },
    ],
    freeRadiusZones: [
      'Cleveland', 'Lakewood', 'Rocky River', 'Bay Village', 'Westlake', 'Avon', 'Avon Lake', 'Parma',
      'Brunswick', 'Brook Park', 'North Olmsted', 'Olmsted Falls', 'Berea', 'Strongsville', 'Middleburg Heights',
    ],
  },
  {
    // sureshinemarinedetailing.com: /services (no prices published)
    slug: 'sure-shine',
    name: 'Sure Shine Marine Detailing',
    tagline: 'Keeping Lake Erie hulls glossy from launch to haul-out.',
    location: 'Catawba to Mentor, OH',
    region: 'northeast-ohio',
    address: '2185 S Emerald Shores Dr, Lakeside Marblehead, OH 43440',
    primaryColor: '#0A0E11',
    accentColor: '#35E0C9',
    vertical: 'multi',
    services: [
      {
        id: 'ss-ceramic',
        name: 'Marine Ceramic Coating',
        price: null,
        durationHours: 8,
        description: 'Starke-certified ceramic that forms a hard, semi-permanent barrier. Applied in our warehouse.',
        category: 'marine',
        popular: true,
      },
      {
        id: 'ss-wash',
        name: 'Wash Package (Weekly / Bi-Weekly)',
        price: null,
        durationHours: 2,
        description: 'Recurring wash plans. Regular weekly clients save 5%.',
        category: 'marine',
      },
      {
        id: 'ss-compound',
        name: 'Compounding & Wax',
        price: null,
        durationHours: 6,
        description: 'Cut oxidation and restore gloss, then protect with wax.',
        category: 'marine',
      },
      {
        id: 'ss-wet-sand',
        name: 'Wet Sanding',
        price: null,
        durationHours: 8,
        description: 'Wet sand heavily oxidized or damaged gelcoat before polishing.',
        category: 'marine',
      },
      {
        id: 'ss-bottom',
        name: 'Bottom Painting',
        price: null,
        durationHours: 6,
        description: 'Prep and bottom paint to protect the hull below the waterline.',
        category: 'marine',
      },
      {
        id: 'ss-teak',
        name: 'Teak Finishing & Restoration',
        price: null,
        durationHours: 4,
        description: 'Clean, brighten and refinish teak decks and trim.',
        category: 'marine',
      },
      {
        id: 'ss-rv-auto',
        name: 'RV & Auto Detailing',
        price: null,
        durationHours: 4,
        description: 'RVs, cars and trucks — the same detail-oriented attention, on land.',
        category: 'auto',
      },
    ],
    addons: [],
    freeRadiusZones: [
      'Catawba Island', 'Marblehead', 'Vermilion', 'Avon Lake', 'Bay Village', 'Westlake', 'Rocky River',
      'Roaming Shores', '43440',
    ],
  },
  {
    // ohiostonerestoration.com: /ohio-stone-restoration.php, /antietch.php (no prices published)
    slug: 'ohio-stone',
    name: 'Ohio Stone Restoration',
    tagline: 'Bringing marble, granite and travertine back to life.',
    location: 'Northeast OH',
    region: 'northeast-ohio',
    address: '4911 W Streetsboro Rd, Richfield, OH 44286',
    logo: { src: '/logos/ohio-stone.webp', background: '#FFFFFF' },
    primaryColor: '#875422',
    accentColor: '#232324',
    vertical: 'stone',
    services: [
      {
        id: 'osr-antietch',
        name: 'MORE AntiEtch Countertop Coating',
        price: null,
        durationHours: 4,
        description: 'Protects marble, limestone, onyx and travertine counters from etching and staining. 10-year expected wear.',
        popular: true,
      },
      {
        id: 'osr-crack',
        name: 'Crack & Chip Repair',
        price: null,
        durationHours: 3,
        description: 'Repair cracks, chips, seams and uneven surfaces in natural and engineered stone.',
      },
      {
        id: 'osr-etch',
        name: 'Etch Repair',
        price: null,
        durationHours: 3,
        description: 'Hone and re-polish etched stone back to a factory finish.',
      },
      {
        id: 'osr-floor',
        name: 'Stone & Tile Floor Restoration',
        price: null,
        durationHours: 8,
        description: 'Restore dull stone and tile floors, countertops, shower walls and fireplaces.',
      },
      {
        id: 'osr-stain',
        name: 'Stain Removal',
        price: null,
        durationHours: 3,
        description: 'Remove most stains from natural stone surfaces.',
      },
      {
        id: 'osr-grout',
        name: 'Grout & Caulk Restoration',
        price: null,
        durationHours: 4,
        description: 'Remove grout stains, stain or paint grout, replace damaged caulk and seal.',
      },
    ],
    addons: [],
    freeRadiusZones: ['Cleveland', 'Akron', 'Beachwood', 'Solon', 'Hudson', 'Strongsville', 'Medina', 'Chagrin Falls', 'Richfield'],
  },
  {
    // smsautodetailing.com: /car-detailing-prices/, /faq/ (durations)
    slug: 'sms-mobile',
    name: 'SMS Mobile Detailing',
    tagline: 'We come to you — driveway detailing across the West Shore.',
    location: 'North Ridgeville / Lorain County, OH',
    region: 'northeast-ohio',
    address: 'North Ridgeville, OH',
    logo: { src: '/logos/sms-mobile.png', background: '#0D0D0D' },
    primaryColor: '#1058F8',
    accentColor: '#0D0D0D',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'car', label: 'Car / Sedan', hoursMultiplier: 1 },
          { id: 'midsize', label: 'Midsize Truck / SUV', hoursMultiplier: 1.1 },
          { id: 'fullsize', label: 'Full-Size Truck / Large SUV', hoursMultiplier: 1.2 },
          { id: 'xl', label: 'XL SUV / Minivan', hoursMultiplier: 1.25 },
        ],
      },
    },
    services: [
      {
        id: 'sms-refresh-full',
        name: 'Refresh Full Detail',
        price: 199,
        priceBySize: { car: 199, midsize: 249, fullsize: 289, xl: 319 },
        startingAt: true,
        durationHours: 1.5,
        description: 'Best for regular maintenance on a well-kept vehicle.',
      },
      {
        id: 'sms-restore-full',
        name: 'Restore Full Detail',
        price: 389,
        priceBySize: { car: 389, midsize: 469, fullsize: 489, xl: 589 },
        startingAt: true,
        durationHours: 3,
        description: 'Best for vehicles that need a real transformation inside and out.',
        popular: true,
      },
      {
        id: 'sms-protect-full',
        name: 'Protect Full Detail',
        price: 499,
        priceBySize: { car: 499, midsize: 599, fullsize: 699, xl: 799 },
        startingAt: true,
        durationHours: 4,
        description: 'Restore Full plus ceramic spray, engine bay, headlights and trim. Great for pre-sale prep.',
      },
      {
        id: 'sms-restore-interior',
        name: 'Restore Interior',
        price: 349,
        priceBySize: { car: 349, midsize: 419, fullsize: 479, xl: 549 },
        startingAt: true,
        durationHours: 3,
        description: "Deep cleans what vacuuming can't reach: steam, shampoo, extraction and leather care.",
      },
      {
        id: 'sms-ceramic-premium',
        name: 'Ceramic Coating — Premium Coat',
        price: 900,
        priceBySize: { car: 900, midsize: 1100, fullsize: 1200, xl: 1200 },
        startingAt: true,
        durationHours: 8,
        description: '3–5 year ceramic protection.',
      },
      {
        id: 'sms-correction-dual',
        name: 'Paint Correction — Dual Stage',
        price: 600,
        priceBySize: { car: 600, midsize: 1100, fullsize: 1500, xl: 1500 },
        startingAt: true,
        durationHours: 8,
        description: 'Our most popular correction, for moderately neglected paint.',
      },
    ],
    addons: [
      { id: 'sms-pet', name: 'Pet Hair Removal', price: 99, addedHours: 0.5 },
      { id: 'sms-stain', name: 'Stain Removal', price: 120, addedHours: 1 },
      { id: 'sms-odor', name: 'Odor Removal', price: 99, addedHours: 0.5 },
      { id: 'sms-headlights', name: 'Headlight Restoration', price: 99, addedHours: 1 },
      { id: 'sms-engine', name: 'Engine Bay Detail', price: 75, addedHours: 0.5 },
      { id: 'sms-ceramic-spray', name: 'Ceramic Spray Upgrade', price: 99, addedHours: 0.5 },
    ],
    freeRadiusZones: [
      'North Ridgeville', 'Avon', 'Avon Lake', 'Elyria', 'Amherst', 'Westlake', 'North Olmsted', 'Berea', 'Parma',
      'Ashland', '44039',
    ],
  },
  {
    // quietstormdetailing.com (archived): /detailing-services/, /coating-services/, /window-tint/, homepage add-ons
    slug: 'quiet-storm',
    name: 'Quiet Storm Auto Detailing',
    tagline: 'Calm, meticulous detailing that makes your car roar.',
    location: 'Cleveland, OH',
    region: 'northeast-ohio',
    address: '2419 St Clair Ave NE, Cleveland, OH 44114',
    logo: { src: '/logos/quiet-storm.svg', background: '#FFFFFF' },
    primaryColor: '#D31313',
    accentColor: '#003C9B',
    vertical: 'auto',
    services: [
      {
        id: 'qs-rain',
        name: 'Rain Package',
        price: null,
        durationHours: 2,
        description: 'Recommended monthly: hand wash, rims, tires, windows, jambs, vacuum, dash and wax.',
      },
      {
        id: 'qs-thunder',
        name: 'Thunder Package',
        price: null,
        durationHours: 4,
        description: 'Adds a clay bar and 1-step polish with sealant — 2–4 months of protection.',
        popular: true,
      },
      {
        id: 'qs-lightning',
        name: 'Lightning Package',
        price: null,
        durationHours: 8,
        description: 'Two stages of paint correction — average results around 90–95% correction.',
      },
      {
        id: 'qs-blizzard',
        name: 'Blizzard Package',
        price: null,
        durationHours: 5,
        description: 'Clay bar, sealed rims, steam-cleaned engine bay — 6–12 months of protection.',
      },
      {
        id: 'qs-tornado',
        name: 'Tornado Interior Package',
        price: null,
        durationHours: 4,
        description: 'Shampoo, steam, pressure-washed mats, deodorize and leather treatment.',
      },
      {
        id: 'qs-ceramic',
        name: 'Ceramic Coating (Bronze / Silver / Gold)',
        price: null,
        durationHours: 8,
        description: 'Nano ceramic coatings from 1 year (Bronze) up to 10 years (Gold). Matte Pro available.',
      },
      {
        id: 'qs-tint',
        name: 'Window Tint',
        price: null,
        durationHours: 3,
        description: 'XR Plus, XR, HP and CR films with a lifetime transferable warranty.',
      },
    ],
    addons: [
      { id: 'qs-headlights', name: 'Headlight Restoration', price: 100, startingAt: true, addedHours: 1 },
      { id: 'qs-vinyl', name: 'Vinyl Restoration', price: 100, startingAt: true, addedHours: 1 },
      { id: 'qs-engine', name: 'Engine Detail', price: 100, startingAt: true, addedHours: 1 },
      { id: 'qs-ozone', name: 'Ozone Treatment', price: 100, startingAt: true, addedHours: 1 },
      { id: 'qs-sticker', name: 'Sticker Removal', price: 80, startingAt: true, addedHours: 0.5 },
      { id: 'qs-wet-sand', name: 'Wet Sanding', price: 500, startingAt: true, addedHours: 3 },
    ],
    freeRadiusZones: ['Cleveland', 'Parma', 'Brooklyn', 'Garfield Heights', 'Independence', '44109', '44129', '44134'],
  },
  {
    // lionheartdetailing.com: /interior-detailing/, /mobile-detailing/, /ceramic-coating/, /ppf-paint-protection-film-columbus-ohio/, /boat-detailing/
    slug: 'lionheart',
    name: 'Lionheart Detailing',
    tagline: 'PPF, Ceramic Coating & Detailing',
    location: 'Hilliard / Columbus, OH',
    region: 'central-ohio',
    address: '4402 Weaver Ct N, Suite 204, Hilliard, OH 43026',
    logo: { src: '/logos/lionheart.png', background: '#FFFFFF' },
    primaryColor: '#1E3A8A',
    accentColor: '#EAB308',
    vertical: 'multi',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'car', label: 'Car / Small SUV', hoursMultiplier: 1 },
          { id: 'truck', label: 'Truck / Mid-Size or Larger SUV', hoursMultiplier: 1.15 },
        ],
      },
    },
    services: [
      {
        id: 'lh-interior',
        name: 'Lionheart Interior',
        price: 200,
        durationHours: 2,
        description: 'Vacuum and blow-out, steam-cleaned interior surfaces, dressing and glass.',
        category: 'auto',
      },
      {
        id: 'lh-interior-shampoo',
        name: 'Lionheart Interior Shampoo',
        price: 320,
        startingAt: true,
        durationHours: 3,
        description: 'Adds shampoo and heated extraction of carpets and upholstery.',
        category: 'auto',
      },
      {
        id: 'lh-shampoo-plus',
        name: 'Lionheart Package Shampoo+',
        price: 400,
        durationHours: 4.5,
        description: 'Interior shampoo plus foam-cannon hand wash, clay bar and 6–12 month sealant.',
        category: 'auto',
        popular: true,
      },
      {
        id: 'lh-elite',
        name: 'Lionheart Package Elite',
        price: 800,
        durationHours: 7,
        description: 'Everything in Shampoo+ plus one-step paint correction and a 6-month ceramic sealant.',
        category: 'auto',
      },
      {
        id: 'lh-ceramic-1',
        name: 'Ceramic Coating Level 1',
        price: 899,
        startingAt: true,
        durationHours: 8,
        description: 'Enhancement polish and 3-year coating on paint and trim. 24-hour turnaround.',
        category: 'auto',
      },
      {
        id: 'lh-ppf-front',
        name: 'PPF Full Front',
        price: 2200,
        priceBySize: { car: 2200, truck: 2400 },
        startingAt: true,
        durationHours: 8,
        description: 'Paint protection film on hood, fenders, front bumper, mirror caps and headlights.',
        category: 'auto',
      },
      {
        id: 'lh-boat',
        name: 'Boat & PWC Detailing',
        price: null,
        durationHours: 5,
        description: 'Gelcoat restoration, oxidation removal, upholstery and marine wax. Jet skis and Sea-Doos too.',
        category: 'marine',
      },
    ],
    addons: [
      { id: 'lh-leather', name: 'Leather Coating', price: null, addedHours: 1, category: 'auto' },
      { id: 'lh-glass', name: 'Glass Coating', price: null, addedHours: 0.5, category: 'auto' },
      { id: 'lh-wheels', name: 'Wheel Coating', price: null, addedHours: 1, category: 'auto' },
    ],
    freeRadiusZones: [
      '43026', 'Hilliard', 'Columbus', 'Dublin', 'Grove City', 'New Albany', 'Powell', 'Upper Arlington',
      'Westerville', 'Worthington',
    ],
  },
  {
    // speedyks.com: /mobile-auto-detailing-packages/, /boat-detailing-packages/, /boat-gel-coat-restoration/, /rv-coach-5th-wheel-travel-trailer-detailing-packages/
    slug: 'speedy-ks',
    name: "Speedy K's On-Site Detailing",
    tagline: 'Certified Mobile Detailing & Gel Coat Specialists',
    location: 'Columbus, OH (We Come To You)',
    region: 'central-ohio',
    address: '597 High St, Worthington, OH 43085',
    logo: { src: '/logos/speedy-ks.png', background: '#FFFFFF' },
    primaryColor: '#EF4444',
    accentColor: '#18181B',
    vertical: 'multi',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'small', label: 'Small (Mini Sedan / Small 2-Door Pickup)', hoursMultiplier: 1 },
          { id: 'medium', label: 'Medium (Large Sedan / Mid SUV / Minivan)', hoursMultiplier: 1.15 },
          { id: 'large', label: 'Large (Large SUV / Van / Truck)', hoursMultiplier: 1.3 },
        ],
      },
    },
    services: [
      {
        id: 'sk-exterior',
        name: 'Complete Exterior Polymer Sealant Finish',
        price: 199.95,
        priceBySize: { small: 199.95, medium: 299.95, large: 399.99 },
        startingAt: true,
        durationHours: 2.5,
        description: 'Pressure wash including the underside, Teflon polymer sealant, tires, trim and jambs.',
        category: 'auto',
      },
      {
        id: 'sk-restoration',
        name: 'Complete Restoration Package (Full Detail)',
        price: 359.95,
        priceBySize: { small: 359.95, medium: 495.99, large: 599.99 },
        startingAt: true,
        durationHours: 5,
        description: 'Full interior and exterior: shampoo, headliner, engine bay and leather treatment.',
        category: 'auto',
        popular: true,
      },
      {
        id: 'sk-car-care',
        name: 'Vehicle Car Care Package',
        price: 279.95,
        priceBySize: { small: 279.95, medium: 399.95, large: 599.99 },
        startingAt: true,
        durationHours: 3.5,
        description: 'Wash, sealant, vacuum, spot-shampoo touch-up and wipe-down.',
        category: 'auto',
      },
      {
        id: 'sk-boat',
        name: 'Boat & Watercraft Detailing',
        price: 9,
        priceUnit: 'per-foot',
        startingAt: true,
        durationHours: 5,
        description: 'Small boats up to 155-foot yachts and jet skis. Priced per foot.',
        category: 'marine',
        popular: true,
      },
      {
        id: 'sk-gel-coat',
        name: 'Boat Gel Coat Restoration',
        price: null,
        durationHours: 16,
        description: 'Assess, wet sand, compound and polish, then ceramic seal. Takes 2–5 days; lasts 3–5 years.',
        category: 'marine',
      },
      {
        id: 'sk-rv',
        name: 'RV / Coach / 5th Wheel / Travel Trailer Detailing',
        price: 12,
        priceUnit: 'per-foot',
        startingAt: true,
        durationHours: 5,
        description: 'Roof, awning and slide-outs, gel coat restore, oxidation buffing, mold and moss removal.',
        category: 'rv',
        popular: true,
      },
    ],
    addons: [
      { id: 'sk-headlights', name: 'Headlight Repair', price: 129.95, startingAt: true, addedHours: 1, category: 'auto' },
      { id: 'sk-graphics', name: 'Pinstriping & Graphics', price: 199.99, startingAt: true, addedHours: 2 },
    ],
    freeRadiusZones: ['43085', 'Worthington', 'Columbus', 'Gahanna', 'Reynoldsburg', 'Westerville'],
  },
  {
    // kcautodetailing.com: /interiordetail, /wash-and-wax, /paintcorrection, /ceramiccoatinginfo, /headlight, /enginecleaning, /about-3
    slug: 'kc-auto',
    name: 'KC Auto Detailing',
    tagline: 'Precision Auto Care & Paint Enhancement',
    location: 'Columbus, OH',
    region: 'central-ohio',
    address: '2239 Banwick Rd, Columbus, OH 43232',
    logo: { src: '/logos/kc-auto.png', background: '#FFFFFF' },
    primaryColor: '#475569',
    accentColor: '#3B82F6',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'small', label: 'Small (Miata / GTI)', hoursMultiplier: 1 },
          { id: 'medium', label: 'Medium (Camry / Range Rover)', hoursMultiplier: 1.1 },
          { id: 'large', label: 'Large (Large SUV / Truck)', hoursMultiplier: 1.2 },
        ],
      },
    },
    services: [
      {
        id: 'kc-deep-interior',
        name: 'Deep Interior Detail',
        price: 200,
        priceBySize: { small: 200, medium: 260, large: 300 },
        startingAt: true,
        durationHours: 3,
        description: 'Vacuum, clean and protect plastics and leather, shampoo and extraction, glass and jambs.',
        popular: true,
      },
      {
        id: 'kc-wash-wax',
        name: 'Wash and Wax',
        price: 180,
        durationHours: 2,
        description: 'Hand wash, wheels, hand-applied wax/sealant and tire dressing.',
      },
      {
        id: 'kc-all-in-one',
        name: 'All-in-One Paint Enhancement',
        price: 350,
        startingAt: true,
        durationHours: 5,
        description: 'One-step polish with a 6–12 month sealant.',
      },
      {
        id: 'kc-one-step',
        name: 'One-Step Paint Correction',
        price: 550,
        priceBySize: { small: 550, medium: 650, large: 750 },
        startingAt: true,
        durationHours: 7.5,
        description: 'Removes 60–80% of imperfections. Requires your garage or a drop-off.',
      },
      {
        id: 'kc-enhance-ceramic',
        name: 'Paint Enhancement + Ceramic Coating',
        price: 700,
        startingAt: true,
        durationHours: 8,
        description: 'Paint enhancement polish followed by a 5–7 year ceramic coating.',
      },
      {
        id: 'kc-correction-ceramic',
        name: 'One-Step Correction + Ceramic Coating',
        price: 999,
        startingAt: true,
        durationHours: 12,
        description: '~70% scratch removal plus 5–7 year ceramic on paint, wheel faces, glass and plastics.',
      },
    ],
    addons: [
      { id: 'kc-headlights', name: 'Headlight Restoration', price: 50, addedHours: 1 },
      { id: 'kc-engine', name: 'Engine Cleaning', price: 50, addedHours: 0.5 },
      { id: 'kc-ozone', name: 'Ozone Odor Removal', price: 150, addedHours: 1.5 },
    ],
    freeRadiusZones: [
      '43232', 'Columbus', 'Dublin', 'Grove City', 'Westerville', 'Bexley', 'Hilliard', 'New Albany',
      'Upper Arlington', 'Lewis Center',
    ],
  },
]

export function getClientBySlug(slug: string | undefined): ClientConfig | undefined {
  return clients.find((client) => client.slug === slug)
}
