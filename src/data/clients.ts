export type Vertical =
  | 'auto'
  | 'marine'
  | 'stone'
  | 'rv'
  | 'mechanic'
  | 'pet'
  | 'tint'
  | 'exterior'
  | 'locksmith'
  | 'multi'

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
          // The detail and ceramic pages group vehicles differently (e.g. a small truck is priced with
          // 4-doors for a detail but with regular SUVs for ceramic), so each tier here is one row of both.
          { id: '2-door', label: '2-Door', hoursMultiplier: 1 },
          { id: '4-door', label: '4-Door Car', hoursMultiplier: 1 },
          { id: 'small-truck', label: 'Small Truck', hoursMultiplier: 1 },
          { id: 'full-size', label: 'Full-Size Car', hoursMultiplier: 1.1 },
          { id: 'regular-suv', label: 'Regular SUV', hoursMultiplier: 1.1 },
          { id: 'mid-truck', label: 'Mid-Size Truck', hoursMultiplier: 1.1 },
          { id: 'mid-suv', label: 'Mid-Size SUV', hoursMultiplier: 1.15 },
          { id: 'full-truck', label: 'Full-Size Truck', hoursMultiplier: 1.15 },
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
        priceBySize: {
          '2-door': 395, '4-door': 405, 'small-truck': 405, 'full-size': 415, 'regular-suv': 415, 'mid-truck': 415,
          'mid-suv': 425, 'full-truck': 425, minivan: 450, 'full-suv': 470,
        },
        durationHours: 6,
        description: 'Hand wash, clay bar, machine polish, carnauba wax and steam-extracted carpets. Free loaner and pick-up.',
        category: 'auto',
        popular: true,
      },
      {
        id: 'gks-int-or-ext',
        name: 'Interior or Exterior Detail',
        price: 250,
        priceBySize: {
          '2-door': 250, '4-door': 265, 'small-truck': 265, 'full-size': 280, 'regular-suv': 280, 'mid-truck': 280,
          'mid-suv': 290, 'full-truck': 290, minivan: 295, 'full-suv': 300,
        },
        durationHours: 3.5,
        description: 'Choose either the full interior or the full exterior half of our detail.',
        category: 'auto',
      },
      {
        id: 'gks-opticoat-pro',
        name: 'Opti-Coat Pro Ceramic Coating',
        price: 999,
        priceBySize: {
          '2-door': 999, '4-door': 1099, 'small-truck': 1299, 'full-size': 1099, 'regular-suv': 1299, 'mid-truck': 1399,
          'mid-suv': 1399, 'full-truck': null, minivan: null, 'full-suv': null,
        },
        durationHours: 9,
        description: 'Professional ceramic coating with 1 stage of paint correction. 5-year warranty.',
        category: 'auto',
      },
      {
        id: 'gks-opticoat-pro-plus',
        name: 'Opti-Coat Pro Plus Ceramic Coating',
        price: 1399,
        priceBySize: {
          '2-door': 1399, '4-door': 1499, 'small-truck': 1699, 'full-size': 1499, 'regular-suv': 1699, 'mid-truck': 1799,
          'mid-suv': 1799, 'full-truck': null, minivan: null, 'full-suv': null,
        },
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
    primaryColor: '#EF3622',
    accentColor: '#020202',
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
        id: 'dd-interior-1',
        name: 'Interior 1',
        price: 100,
        priceBySize: { sedan: 100, suv: 140, 'xl-suv': 180, pickup: 120, 'xl-pickup': 160 },
        durationHours: 2,
        description: 'Entry-level interior-only detail.',
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
        id: 'dd-two-step',
        name: 'Two Step Exterior Polish',
        price: 240,
        priceBySize: { sedan: 240, suv: 260, 'xl-suv': 280, pickup: 260, 'xl-pickup': 280 },
        durationHours: 6,
        description: 'Compound and polish in two machine stages for heavier swirls and scratches.',
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
    primaryColor: '#2563EB',
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
        id: 'sms-refresh-exterior',
        name: 'Refresh Exterior',
        price: 99,
        priceBySize: { car: 99, midsize: 119, fullsize: 139, xl: 139 },
        startingAt: true,
        durationHours: 1,
        description: 'Outside only: hand wash and wet coat, wheels, wells, brake dust and tire shine.',
      },
      {
        id: 'sms-refresh-interior',
        name: 'Refresh Interior',
        price: 169,
        priceBySize: { car: 169, midsize: 189, fullsize: 209, xl: 229 },
        startingAt: true,
        durationHours: 1,
        description: 'Inside only: full vacuum, dash and surface wipe-down, glass, vents and crevices.',
      },
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
        id: 'sms-restore-exterior',
        name: 'Restore Exterior',
        price: 159,
        priceBySize: { car: 159, midsize: 189, fullsize: 209, xl: 229 },
        startingAt: true,
        durationHours: 2,
        description: 'Refresh Exterior plus clay bar decontamination, trim restore and paint sealant.',
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
        id: 'sms-ceramic-essential',
        name: 'Ceramic Coating — Essential Coat',
        price: 700,
        priceBySize: { car: 700, midsize: 900, fullsize: 1000, xl: 1000 },
        startingAt: true,
        durationHours: 6,
        description: '1–3 year ceramic protection.',
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
        id: 'sms-ceramic-elite',
        name: 'Ceramic Coating — Elite Coat',
        price: 1200,
        priceBySize: { car: 1200, midsize: 1350, fullsize: 1450, xl: 1450 },
        startingAt: true,
        durationHours: 10,
        description: '5–7 year ceramic protection with full decontamination and clay bar.',
      },
      {
        id: 'sms-correction-single',
        name: 'Paint Correction — Single Stage',
        price: 500,
        priceBySize: { car: 500, midsize: 1000, fullsize: 1300, xl: 1300 },
        startingAt: true,
        durationHours: 6,
        description: 'Entry-level correction for light swirls and minor surface scratches.',
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
      {
        id: 'sms-correction-showroom',
        name: 'Paint Correction — Showroom Finish',
        price: 700,
        priceBySize: { car: 700, midsize: 1300, fullsize: 1700, xl: 1700 },
        startingAt: true,
        durationHours: 12,
        description: 'Multi-step compounding and polishing for older or heavily neglected paint.',
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
    // quietstormdetailing.com: /detailing-services/, /coating-services/, /window-tint/, homepage add-ons
    slug: 'quiet-storm',
    name: 'Quiet Storm Auto Detailing',
    tagline: 'Calm, meticulous detailing that makes your car roar.',
    location: 'Cleveland, OH',
    region: 'northeast-ohio',
    address: '2419 St Clair Ave NE, Cleveland, OH 44114',
    logo: { src: '/logos/quiet-storm.svg', background: '#FFFFFF' },
    primaryColor: '#F72B2B',
    accentColor: '#003C9A',
    vertical: 'auto',
    services: [
      {
        id: 'qs-monthly',
        name: 'Monthly Package',
        price: 125,
        durationHours: 2,
        description: '$125 per month for 4 visits (no rollover): interior steam clean, hand wash, rims, tires, windows, jambs, vacuum and dash.',
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
        id: 'qs-blizzard',
        name: 'Blizzard Package',
        price: null,
        durationHours: 5,
        description: '1-step paint correction, clay bar, sealed rims and exhaust, steam-cleaned engine bay — 6–12 months of protection.',
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
      { id: 'qs-wheel-polish', name: 'Wheel Polishing (per wheel)', price: 100, startingAt: true, addedHours: 0.5 },
      { id: 'qs-chrome-polish', name: 'Chrome Polishing (per hour)', price: 150, startingAt: true, addedHours: 1 },
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
    primaryColor: '#0693E3',
    accentColor: '#54595F',
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
        description: 'Published at $899–$1,299. Enhancement polish and 3-year coating on paint and trim. 24-hour turnaround.',
        category: 'auto',
      },
      {
        id: 'lh-ceramic-2',
        name: 'Ceramic Coating Level 2',
        price: 1599,
        startingAt: true,
        durationHours: 10,
        description: 'Published at $1,599–$1,999. One-step correction (65–75% of swirls) and a 5-year coating on paint, trim and headlights.',
        category: 'auto',
      },
      {
        id: 'lh-ceramic-3',
        name: 'Ceramic Coating Level 3',
        price: 1999,
        startingAt: true,
        durationHours: 14,
        description: 'Published at $1,999–$2,399. Full 2-step correction (85–95% of swirls) and an 8-year coating on paint, trim and headlights.',
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
        id: 'lh-ppf-track',
        name: 'PPF Track Pack',
        price: 2500,
        priceBySize: { car: 2500, truck: 2700 },
        startingAt: true,
        durationHours: 10,
        description: 'Great for sports cars: full hood, fenders and rocker panels, front bumper, mirrors and headlights.',
        category: 'auto',
      },
      {
        id: 'lh-ppf-full',
        name: 'PPF Full Body',
        price: 5000,
        priceBySize: { car: 5000, truck: 5600 },
        startingAt: true,
        durationHours: 24,
        description: 'Every painted panel: hood, roof, trunk, fenders, quarters, doors, both bumpers, rockers, mirrors and headlights.',
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
    primaryColor: '#007BFF',
    accentColor: '#01012F',
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
    primaryColor: '#00AEEF',
    accentColor: '#2F2E2E',
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
  {
    // deluxedetailingoh.com: /full-detailing, /exterior-detailing, /interior-detailing, /ceramic-coatings, /detailplus-membership
    slug: 'deluxe-detailing',
    name: 'Deluxe Detailing of Central Ohio',
    tagline: 'Columbus Ohio’s #1 Mobile Detailing Team',
    location: 'Dublin, Powell & New Albany, OH',
    region: 'central-ohio',
    address: 'Dublin, OH 43017',
    logo: { src: '/logos/deluxe-detailing.png', background: '#831005' },
    primaryColor: '#831005',
    accentColor: '#1C1C1C',
    vertical: 'auto',
    // The site publishes one "starting at" price per service, not per-size prices.
    sizeTiers: { auto: { label: 'Vehicle', tiers: [{ id: 'any', label: 'Any vehicle', hoursMultiplier: 1 }] } },
    services: [
      { id: 'dl-express-full', name: 'Express Full Detail', price: 209, startingAt: true, durationHours: 3, description: 'Interior and exterior at our express level.' },
      { id: 'dl-signature-full', name: 'Signature Full Detail', price: 319, startingAt: true, durationHours: 4, description: 'Interior and exterior — our most popular package.', popular: true },
      { id: 'dl-platinum-full', name: 'Platinum Full Detail', price: 429, startingAt: true, durationHours: 5, description: 'Interior and exterior at our most thorough level.' },
      { id: 'dl-express-interior', name: 'Express Interior', price: 119, startingAt: true, durationHours: 1.5, description: 'Interior only, express level. Pet hair fee from $25.' },
      { id: 'dl-signature-interior', name: 'Signature Interior', price: 199, startingAt: true, durationHours: 2.5, description: 'Interior only, signature level.' },
      { id: 'dl-platinum-interior', name: 'Platinum Interior', price: 249, startingAt: true, durationHours: 3, description: 'Interior only, platinum level.' },
      { id: 'dl-express-exterior', name: 'Express Exterior', price: 109, startingAt: true, durationHours: 1.5, description: 'Exterior only, express level.' },
      { id: 'dl-signature-exterior', name: 'Signature Exterior', price: 199, startingAt: true, durationHours: 2.5, description: 'Exterior only, signature level.' },
      { id: 'dl-platinum-exterior', name: 'Platinum Exterior', price: 299, startingAt: true, durationHours: 3.5, description: 'Exterior only, platinum level.' },
      { id: 'dl-ceramic-3', name: '3-Year Signature Ceramic Coating', price: 1199, startingAt: true, durationHours: 8, description: '3-year ceramic coating. 1-day turnaround.' },
      { id: 'dl-ceramic-5', name: '5-Year Platinum Ceramic Coating', price: 1499, startingAt: true, durationHours: 12, description: '5-year ceramic coating. 1–2 day turnaround.' },
      { id: 'dl-ceramic-7', name: '7-Year Diamond Ceramic Coating', price: 2299, startingAt: true, durationHours: 14, description: '7-year ceramic coating. 1–2 day turnaround.' },
      { id: 'dl-plus-interior', name: 'DetailPlus Interior Membership', price: 95, durationHours: 1.5, description: 'Monthly membership — $95 per month.' },
      { id: 'dl-plus-exterior', name: 'DetailPlus Exterior Membership', price: 95, durationHours: 1.5, description: 'Monthly membership — $95 per month.' },
      { id: 'dl-plus-full', name: 'DetailPlus Full Membership', price: 160, durationHours: 2.5, description: 'Monthly membership — $160 per month.' },
    ],
    addons: [
      { id: 'dl-engine', name: 'Engine Bay', price: 50, startingAt: true, addedHours: 0.5 },
      { id: 'dl-headlight', name: 'Headlight Restoration (per light)', price: 50, startingAt: true, addedHours: 0.5 },
      { id: 'dl-wheel-ceramic', name: 'Wheel Ceramic Coating (all 4 wheels)', price: 399, startingAt: true, addedHours: 2 },
      { id: 'dl-pet-hair', name: 'Pet Hair Removal', price: 25, startingAt: true, addedHours: 0.5 },
    ],
    freeRadiusZones: ['43017', '43065', '43054', 'Dublin', 'Powell', 'New Albany', 'Westerville', 'Columbus'],
  },
  {
    // spashine.net (client-rendered; prices read from its app bundle): services, add-ons, maintenance plans
    slug: 'spashine',
    name: 'SpaShine Detailing',
    tagline: 'Mobile Car Detailing in Columbus, Ohio',
    location: 'Columbus, OH (We Come To You)',
    region: 'central-ohio',
    address: 'Upper Arlington, OH',
    logo: { src: '/logos/spashine.png', background: '#FFFFFF' },
    primaryColor: '#1F9EF9',
    accentColor: '#161D27',
    vertical: 'auto',
    sizeTiers: {
      auto: {
        label: 'Vehicle size',
        tiers: [
          { id: 'sedan', label: 'Sedan', hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV', hoursMultiplier: 1.1 },
          { id: 'truck', label: 'Truck', hoursMultiplier: 1.2 },
          { id: 'three-row', label: '3-Row SUV / Van', hoursMultiplier: 1.25 },
        ],
      },
    },
    services: [
      {
        id: 'ss-essential',
        name: 'Essential Clean',
        price: 225,
        priceBySize: { sedan: 225, suv: 250, truck: 275, 'three-row': 300 },
        durationHours: 2,
        description: 'Our essential interior and exterior clean — about 2 hours.',
      },
      {
        id: 'ss-full',
        name: 'Full Detail',
        price: 250,
        priceBySize: { sedan: 250, suv: 275, truck: 300, 'three-row': 325 },
        durationHours: 2.5,
        description: 'Full interior and exterior detail, carpet shampoo/extraction and steam included — about 2 to 2.5 hours.',
        popular: true,
      },
      {
        id: 'ss-maintenance',
        name: 'Maintenance Plan (monthly)',
        price: 150,
        priceBySize: { sedan: 150, suv: 200, truck: 230, 'three-row': 230 },
        durationHours: 2,
        description: 'Recurring monthly care, priced per month by vehicle size.',
      },
      {
        id: 'ss-ceramic',
        name: 'Ceramic Coating (5- or 10-year)',
        price: null,
        durationHours: 8,
        description: '5-year, 10-year, or paint correction plus ceramic. Custom quote.',
      },
    ],
    addons: [
      { id: 'ss-engine', name: 'Engine Bay', price: 49, addedHours: 0.5 },
      { id: 'ss-pet-hair', name: 'Pet Hair', price: 40, startingAt: true, addedHours: 0.5 },
      { id: 'ss-odor', name: 'Odor Removal', price: 49, addedHours: 0.5 },
      { id: 'ss-carpet', name: 'Carpet Shampoo/Extraction + Steam', price: 65, startingAt: true, addedHours: 0.5 },
      { id: 'ss-seats', name: 'Seat Shampoo / Deep Extraction', price: 120, addedHours: 1 },
      { id: 'ss-decon', name: 'Paint Decontamination', price: 49, addedHours: 0.5 },
      { id: 'ss-headlights', name: 'Headlight Restoration (pair)', price: 120, addedHours: 1 },
      { id: 'ss-transfer', name: 'Paint Transfer Removal', price: 75, startingAt: true, addedHours: 0.5 },
      { id: 'ss-enhancement', name: 'One-Step Paint Enhancement', price: 300, startingAt: true, addedHours: 3 },
      { id: 'ss-sealant', name: '6-Month Ceramic Sealant', price: 49, addedHours: 0.5 },
    ],
    freeRadiusZones: [
      'Columbus', 'Upper Arlington', 'Dublin', 'Powell', 'New Albany', 'Bexley', 'Grandview Heights', 'Worthington',
      'Westerville',
    ],
  },
  {
    // mhautodetail.com: /ceramic-coating, /paint-correction, /interior-and-exterior-detailing
    slug: 'mh-auto',
    name: 'MH Auto Detailing',
    tagline: 'Ceramic Coatings, Paint Correction, and Full Detailing Services',
    location: 'Reynoldsburg / Columbus, OH',
    region: 'central-ohio',
    address: 'Reynoldsburg, OH',
    logo: { src: '/logos/mh-auto.png', background: '#111111' },
    primaryColor: '#008000',
    accentColor: '#0404C9',
    vertical: 'auto',
    // The site publishes one "starting at" price per service, not per-size prices.
    sizeTiers: { auto: { label: 'Vehicle', tiers: [{ id: 'any', label: 'Any vehicle', hoursMultiplier: 1 }] } },
    services: [
      {
        id: 'mh-ceramic-1',
        name: 'Level 1 – Ceramic Coating',
        price: 799,
        startingAt: true,
        durationHours: 8,
        description: 'Includes single-stage paint correction, a coated windshield and a free maintenance wash. 1-day turnaround.',
        popular: true,
      },
      { id: 'mh-single-stage', name: 'Single Stage Paint Correction', price: 429, startingAt: true, durationHours: 6, description: 'One-stage machine correction. 1-day turnaround.' },
      { id: 'mh-deluxe', name: 'Deluxe Detail Package', price: 229, startingAt: true, durationHours: 3, description: 'Interior and exterior detail.' },
      { id: 'mh-gold', name: 'Gold Detail Package', price: 349, startingAt: true, durationHours: 4.5, description: 'Our top interior and exterior package.' },
      { id: 'mh-pro-exterior', name: 'Pro Exterior', price: 179, startingAt: true, durationHours: 2, description: 'Exterior only.' },
      { id: 'mh-express-interior', name: 'Express Interior', price: 129, startingAt: true, durationHours: 1.5, description: 'Interior only, express level.' },
      { id: 'mh-pro-interior', name: 'Pro Interior', price: 229, startingAt: true, durationHours: 3, description: 'Interior only, pro level.' },
    ],
    addons: [
      { id: 'mh-headlights', name: 'Headlight Restoration', price: 80, startingAt: true, addedHours: 1 },
      { id: 'mh-engine', name: 'Engine Detailing', price: 60, startingAt: true, addedHours: 0.5 },
    ],
    freeRadiusZones: [
      '43068', 'Reynoldsburg', 'Pickerington', 'Gahanna', 'New Albany', 'Pataskala', 'Blacklick', 'Westerville', 'Dublin',
      'Columbus',
    ],
  },
  {
    // columbusohmobilemechanics.com: homepage service list (no prices published)
    slug: 'columbus-mobile-mechanics',
    name: 'Columbus Mobile Mechanics Co.',
    tagline: 'Mobile Mechanics Serving Columbus, Ohio',
    location: 'Greater Columbus Metro',
    region: 'central-ohio',
    address: 'Columbus, OH',
    primaryColor: '#C2002D',
    accentColor: '#000000',
    vertical: 'mechanic',
    services: [
      { id: 'cmm-diagnostics', name: 'Vehicle Diagnostics', price: null, durationHours: 1, description: 'On-site diagnostic check at your home or work.', popular: true },
      { id: 'cmm-brakes', name: 'Brake Repair & Replacement', price: null, durationHours: 2, description: 'Pads, rotors and brake service in your driveway.' },
      { id: 'cmm-battery', name: 'Battery Replacement', price: null, durationHours: 0.5, description: 'Mobile battery testing and replacement.' },
      { id: 'cmm-alternator-starter', name: 'Alternator & Starter Replacement', price: null, durationHours: 2, description: 'Charging and starting system repair on site.' },
      { id: 'cmm-oil', name: 'Oil Change', price: null, durationHours: 0.5, description: 'Mobile oil change.' },
      { id: 'cmm-inspection', name: 'Pre-Purchase Inspection', price: null, durationHours: 1, description: 'Inspection before you buy a used vehicle.' },
    ],
    addons: [],
    freeRadiusZones: ['Columbus', 'Dublin', 'Hilliard', 'Grove City', 'Gahanna', 'Westerville', 'Worthington', 'Reynoldsburg'],
  },
  {
    // furballfitnesspetcare.com: /grooming-spa (mobile BarkBath prices; Mon–Fri, bath and nails only)
    slug: 'furball-fitness',
    name: 'Furball Fitness',
    tagline: 'Full-Service Grooming at Our Spa Plus Mobile Baths & Nail Trims',
    location: 'Reynoldsburg / Columbus, OH',
    region: 'central-ohio',
    address: '6885 Taylor Rd SW, Reynoldsburg, OH 43068',
    logo: { src: '/logos/furball-fitness.png', background: '#FFFFFF' },
    primaryColor: '#BE1724',
    accentColor: '#EFECC2',
    vertical: 'pet',
    services: [
      {
        id: 'ff-barkbath',
        name: 'Mobile Bath (BarkBath)',
        price: 45,
        startingAt: true,
        durationHours: 1,
        description: 'Bath with brushing plus a nail trim or Dremel, per pet. No haircuts. +$2/mile each way beyond 10 miles.',
        popular: true,
      },
      { id: 'ff-nail-trim', name: 'Mobile Toe Nail Trim', price: 25, durationHours: 0.5, description: 'Nail trim at your door, per pet.' },
      { id: 'ff-dremel', name: 'Mobile Dremel', price: 30, durationHours: 0.5, description: 'Nails filed smooth with a Dremel, per pet.' },
      { id: 'ff-brush-nails', name: 'Brushing & Nail Trim', price: 40, durationHours: 0.5, description: 'Brush-out plus nail trim, per pet.' },
      { id: 'ff-brush-dremel', name: 'Brushing & Dremel', price: 45, durationHours: 0.5, description: 'Brush-out plus Dremel, per pet.' },
    ],
    addons: [{ id: 'ff-butter-mask', name: 'Paw & Nose Butter Mask', price: 15, addedHours: 0 }],
    freeRadiusZones: [
      '43068', 'Reynoldsburg', 'Columbus', 'Gahanna', 'New Albany', 'Whitehall', 'Bexley', 'Pickerington', 'Westerville',
      'Pataskala', 'Clintonville', 'Upper Arlington',
    ],
  },
  {
    // columbusohiotint.com: homepage + service pages (film tiers listed; no prices published)
    slug: 'tint-works',
    name: 'Tint Works & Car Audio',
    tagline: 'Lifetime Warranty on all window film and labor',
    location: 'Powell / Columbus, OH',
    region: 'central-ohio',
    address: '420 W Olentangy St, Suite A, Powell, OH 43065',
    logo: { src: '/logos/tint-works.png', background: '#333333' },
    primaryColor: '#D2112B',
    accentColor: '#010066',
    vertical: 'tint',
    services: [
      { id: 'tw-carbon', name: 'Carbon Window Tint', price: null, durationHours: 2.5, description: '61–68% heat rejection. Lifetime warranty on film and labor.' },
      { id: 'tw-ceramic', name: 'Ceramic Window Tint', price: null, durationHours: 2.5, description: '67–79% heat rejection. Lifetime warranty on film and labor.', popular: true },
      { id: 'tw-ir-ceramic', name: 'IR Ceramic Window Tint', price: null, durationHours: 3, description: '85–90% heat rejection. Lifetime warranty on film and labor.' },
      { id: 'tw-windshield-film', name: 'Windshield Protection Film', price: null, durationHours: 2, description: 'Clear film that protects the windshield from chips and cracks.' },
      { id: 'tw-ppf', name: 'Paint Protection Film', price: null, durationHours: 8, description: 'Clear film for your paint.' },
      { id: 'tw-remote-start', name: 'Remote Starter / Security', price: null, durationHours: 3, description: 'Remote start and vehicle security installation.' },
    ],
    addons: [],
    freeRadiusZones: ['43065', 'Powell', 'Columbus', 'Dublin', 'Lewis Center'],
  },
  {
    // motintking.com: /prices (dated September 2026). Shop-installed at Trabue Rd.
    slug: 'motint',
    name: 'Mo Tint King',
    tagline: 'Tint, wraps and paint protection — installed at our Columbus shop',
    location: 'Columbus, OH (Trabue Rd)',
    region: 'central-ohio',
    address: '5220 Trabue Rd, Suite D, Columbus, OH 43228',
    logo: { src: '/logos/motint.avif', background: '#0A0B09' },
    primaryColor: '#F6CA4B',
    accentColor: '#0A0B09',
    vertical: 'tint',
    sizeTiers: {
      tint: {
        label: 'Vehicle',
        tiers: [
          { id: 'coupe', label: 'Coupe', hoursMultiplier: 1 },
          { id: 'sedan', label: 'Sedan', hoursMultiplier: 1 },
          { id: 'suv', label: 'SUV', hoursMultiplier: 1.1 },
          { id: 'truck', label: 'Truck', hoursMultiplier: 1.15 },
          { id: 'van', label: 'Van', hoursMultiplier: 1.25 },
        ],
      },
    },
    services: [
      {
        id: 'mt-ceramic-tint',
        name: 'Ceramic Window Tint (Grade A)',
        price: 299,
        startingAt: true,
        durationHours: 2.5,
        description: 'All windows except the windshield, same price at any darkness. From $299 for a regular-size vehicle.',
        popular: true,
      },
      { id: 'mt-windshield', name: 'Windshield Tint', price: null, durationHours: 1, description: 'Priced by call.' },
      {
        id: 'mt-ppf-front',
        name: 'PPF Front End (3M Series 100)',
        price: 1899,
        startingAt: true,
        durationHours: 8,
        description: 'Hood, fenders, bumper and mirrors.',
      },
      {
        id: 'mt-ppf-full',
        name: 'PPF Full Paint (3M Series 100)',
        price: 4899,
        startingAt: true,
        durationHours: 24,
        description: 'Every painted panel. From $4,899 for a sedan.',
      },
      {
        id: 'mt-wrap',
        name: 'Color-Change Wrap',
        price: 2000,
        priceBySize: { coupe: 2000, sedan: 2200, suv: 2400, truck: 2600, van: 2800 },
        startingAt: true,
        durationHours: 24,
        description: 'Published ranges: coupe $2,000–2,800, sedan $2,200–3,000, SUV $2,400–3,400, truck $2,600–3,600, van $2,800–4,000.',
      },
      { id: 'mt-calipers', name: 'Rim & Caliper Painting', price: null, durationHours: 4, description: 'Priced by call.' },
      { id: 'mt-chrome-delete', name: 'Chrome Delete', price: null, durationHours: 3, description: 'Priced by call.' },
    ],
    addons: [],
    freeRadiusZones: ['43228', 'Columbus', 'Hilliard', 'Dublin', 'Powell', 'Plain City', 'Upper Arlington', 'Worthington'],
  },
  {
    // adonispressurewash.com: homepage banner special, /services (no other prices published)
    slug: 'adonis-pressure-wash',
    name: 'Adonis Pressure Wash',
    tagline: 'Professional pressure washing in Columbus & Central Ohio — serving Central Ohio for 10 years',
    location: 'Grove City & Central OH',
    region: 'central-ohio',
    address: 'Grove City, OH 43123',
    logo: { src: '/logos/adonis-pressure-wash.png', background: '#FFFFFF' },
    primaryColor: '#BF1111',
    accentColor: '#161616',
    vertical: 'exterior',
    services: [
      {
        id: 'ad-special',
        name: 'House + Driveway — 10-Year Anniversary Special',
        price: 424,
        durationHours: 3,
        description: 'House wash plus driveway cleaning. Restrictions apply.',
        popular: true,
      },
      { id: 'ad-residential', name: 'Residential Pressure Washing', price: null, durationHours: 3, description: 'Homes, driveways, patios and more. Free quote.' },
      { id: 'ad-commercial', name: 'Commercial Pressure Washing', price: null, durationHours: 4, description: 'Storefronts, lots and buildings. Free quote.' },
      { id: 'ad-fleet', name: 'Fleet Washing', price: null, durationHours: 3, description: 'Trucks, vans and trailers. Free quote.' },
    ],
    addons: [],
    freeRadiusZones: ['43123', 'Grove City', 'Columbus', 'Gahanna', 'Hilliard', 'Galloway'],
  },
  {
    // snapandcracklocksmith.com: homepage + service pages ("up-front pricing", but no prices published)
    slug: 'snap-and-crack',
    name: 'Snap & Crack Locksmith',
    tagline: 'Your Trusted Locksmith in Columbus, Ohio — serving the metro since 2013',
    location: 'Columbus Metro Region',
    region: 'central-ohio',
    address: '738 E Lincoln Ave, Columbus, OH 43229',
    logo: { src: '/logos/snap-and-crack.webp', background: '#FFD200' },
    primaryColor: '#0A2C8A',
    accentColor: '#FFD200',
    vertical: 'locksmith',
    services: [
      { id: 'sc-lockout', name: 'Vehicle Lockout', price: null, durationHours: 0.5, description: 'Locked out of your car? We come to you, 7 days a week.', popular: true },
      { id: 'sc-car-key', name: 'Car Key Replacement', price: null, durationHours: 1, description: 'Domestic and foreign car keys cut and replaced on site.' },
      { id: 'sc-programming', name: 'Car Key & Computer Programming', price: null, durationHours: 1, description: 'Transponder and fob programming.' },
      { id: 'sc-ignition', name: 'Ignition Repair', price: null, durationHours: 1.5, description: 'Ignition cylinder repair and replacement.' },
      { id: 'sc-home-lockout', name: 'Home Lockout', price: null, durationHours: 0.5, description: 'Residential lockout service.' },
      { id: 'sc-rekey', name: 'Rekeying', price: null, durationHours: 1, description: 'Rekey your locks. Instagram special: 6th rekey free.' },
      { id: 'sc-smart-lock', name: 'Smart Lock Installation', price: null, durationHours: 1.5, description: 'Smart lock supply and install.' },
    ],
    addons: [],
    freeRadiusZones: [
      '43215', '43229', 'Columbus', 'Worthington', 'Gahanna', 'Dublin', 'Whitehall', 'Bexley', 'Clintonville',
      'Upper Arlington', 'Westerville', 'Hilliard', 'Grove City', 'Reynoldsburg',
    ],
  },
]

export function getClientBySlug(slug: string | undefined): ClientConfig | undefined {
  return clients.find((client) => client.slug === slug)
}
