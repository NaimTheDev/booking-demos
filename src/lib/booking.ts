import type {
  Addon,
  ClientConfig,
  Region,
  Service,
  ServiceCategory,
  SizeGroup,
  SizeTier,
} from '../data/clients'

export const DEPOSIT_AMOUNT = 50

/** Default fee for addresses outside a client's free service radius. */
export const TRAVEL_FEE = 25

/** Business hours used to decide whether a slot can fit the allocated block. */
const OPEN_HOUR = 8
const CLOSE_HOUR = 18

/** Start times offered each day, in fractional hours (13.5 = 1:30 PM). */
const SLOT_STARTS = [8, 10.5, 13.5, 15]

/** ZIP prefixes treated as "generic local" for a region when a client's zone list doesn't match. */
const LOCAL_ZIP_PREFIXES: Record<Region, string[]> = {
  'northeast-ohio': ['440', '441', '442', '443', '444', '445', '446', '447', '448', '449'],
  'northwest-ohio': ['434', '435', '436', '458'],
  'central-ohio': ['430', '431', '432', '433'],
  'southwest-ohio': ['450', '451', '452', '453', '454', '455'],
  'southeast-ohio': ['437', '438', '439', '456', '457'],
}

export const REGION_LABELS: Record<Region, string> = {
  'northeast-ohio': 'Northeast Ohio',
  'northwest-ohio': 'Toledo / Northwest Ohio',
  'central-ohio': 'Columbus / Central Ohio',
  'southwest-ohio': 'Cincinnati, Dayton / Southwest Ohio',
  'southeast-ohio': 'Southeast Ohio',
}

/** Shared size options, used when a client doesn't define its own in `sizeTiers`. */
export const SIZE_TIERS: Record<ServiceCategory, SizeGroup> = {
  auto: {
    label: 'Vehicle size',
    tiers: [
      { id: 'sedan', label: 'Sedan / Coupe', priceMultiplier: 1, hoursMultiplier: 1 },
      { id: 'suv', label: 'SUV / Crossover', priceMultiplier: 1.15, hoursMultiplier: 1.1 },
      { id: 'truck', label: 'Truck / 3-Row SUV', priceMultiplier: 1.3, hoursMultiplier: 1.2 },
    ],
  },
  marine: {
    label: 'Vessel length',
    tiers: [
      { id: 'under-20', label: 'Under 20 ft', priceMultiplier: 1, hoursMultiplier: 1, referenceFeet: 18 },
      { id: '20-26', label: '20 – 26 ft', priceMultiplier: 1.25, hoursMultiplier: 1.2, referenceFeet: 24 },
      { id: '27-35', label: '27 – 35 ft', priceMultiplier: 1.6, hoursMultiplier: 1.4, referenceFeet: 32 },
    ],
  },
  stone: {
    label: 'Project size',
    tiers: [
      { id: 'small', label: 'Small (single surface)', priceMultiplier: 1, hoursMultiplier: 1 },
      { id: 'medium', label: 'Medium (kitchen / bath)', priceMultiplier: 1.3, hoursMultiplier: 1.15 },
      { id: 'large', label: 'Large (multi-room)', priceMultiplier: 1.7, hoursMultiplier: 1.25 },
    ],
  },
  rv: {
    label: 'RV / camper length',
    tiers: [
      { id: 'under-25', label: 'Under 25 ft (camper / Class B)', priceMultiplier: 1, hoursMultiplier: 1, referenceFeet: 22 },
      { id: '25-32', label: '25 – 32 ft (Class C / travel trailer)', priceMultiplier: 1.3, hoursMultiplier: 1.25, referenceFeet: 29 },
      { id: '33-plus', label: '33 ft+ (Class A / fifth wheel)', priceMultiplier: 1.65, hoursMultiplier: 1.5, referenceFeet: 36 },
    ],
  },
  // Flat-priced trades: one tier, so the size picker is hidden.
  mechanic: { label: 'Vehicle', tiers: [{ id: 'any', label: 'Any vehicle', hoursMultiplier: 1 }] },
  pet: { label: 'Pet', tiers: [{ id: 'any', label: 'Any size', hoursMultiplier: 1 }] },
  tint: { label: 'Vehicle', tiers: [{ id: 'any', label: 'Any vehicle', hoursMultiplier: 1 }] },
  exterior: { label: 'Property', tiers: [{ id: 'any', label: 'Standard home', hoursMultiplier: 1 }] },
  locksmith: { label: 'Job', tiers: [{ id: 'any', label: 'Standard', hoursMultiplier: 1 }] },
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  auto: 'Auto',
  marine: 'Marine',
  stone: 'Stone & Marble',
  rv: 'RV & Camper',
  mechanic: 'Mobile Mechanic',
  pet: 'Pet Grooming',
  tint: 'Window Tint & Film',
  exterior: 'Pressure Washing',
  locksmith: 'Locksmith',
}

/** Categories a client offers, in the order they first appear in its service list. */
export function getCategories(client: ClientConfig): ServiceCategory[] {
  if (client.vertical !== 'multi') return [client.vertical]
  return [...new Set(client.services.map((s) => serviceCategory(client, s)))]
}

export function serviceCategory(client: ClientConfig, service: Service): ServiceCategory {
  return service.category ?? (client.vertical === 'multi' ? 'auto' : client.vertical)
}

export function getSizeGroup(client: ClientConfig, category: ServiceCategory): SizeGroup {
  return client.sizeTiers?.[category] ?? SIZE_TIERS[category]
}

export function getTier(client: ClientConfig, category: ServiceCategory, tierId: string): SizeTier {
  const { tiers } = getSizeGroup(client, category)
  return tiers.find((t) => t.id === tierId) ?? tiers[0]
}

/** Round to the nearest half hour so blocks read cleanly ("3.5 hours"). */
function roundToHalf(hours: number): number {
  return Math.round(hours * 2) / 2
}

/** Price for a service at a given size, or `null` when it's priced by quote. */
export function servicePrice(service: Service, tier: SizeTier): number | null {
  if (service.priceBySize && tier.id in service.priceBySize) return service.priceBySize[tier.id]
  if (service.price === null) return null
  if (service.priceUnit === 'per-foot' && tier.referenceFeet) {
    return roundToCents(service.price * tier.referenceFeet)
  }
  return roundToCents(service.price * (tier.priceMultiplier ?? 1))
}

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100
}

export function serviceHours(service: Service, tier: SizeTier): number {
  return roundToHalf(service.durationHours * tier.hoursMultiplier)
}

/** Lowest published price a client advertises, or `null` when everything is quoted. */
export function startingPrice(client: ClientConfig): number | null {
  const prices = client.services
    .map((s) => servicePrice(s, getSizeGroup(client, serviceCategory(client, s)).tiers[0]))
    .filter((p) => p !== null)
  return prices.length > 0 ? Math.min(...prices) : null
}

/** Add-ons offered for a category: unscoped ones plus those scoped to it. */
export function addonsForCategory(client: ClientConfig, category: ServiceCategory): Addon[] {
  return client.addons.filter((a) => a.category === undefined || a.category === category)
}

export interface Quote {
  /** Sum of the priced items; quoted items contribute nothing. */
  totalPrice: number
  totalHours: number
  /** True when the service or any add-on is priced by quote. */
  hasQuotedItems: boolean
}

export function calculateQuote(
  service: Service | undefined,
  tier: SizeTier,
  addons: Addon[],
): Quote {
  if (!service) return { totalPrice: 0, totalHours: 0, hasQuotedItems: false }
  const prices = [servicePrice(service, tier), ...addons.map((a) => a.price)]
  return {
    totalPrice: roundToCents(prices.reduce<number>((sum, p) => sum + (p ?? 0), 0)),
    hasQuotedItems: prices.some((p) => p === null),
    totalHours: roundToHalf(
      service.durationHours * tier.hoursMultiplier + addons.reduce((sum, a) => sum + a.addedHours, 0),
    ),
  }
}

export type AddressStatus = 'idle' | 'verified' | 'outside'

export function validateAddress(input: string, client: Pick<ClientConfig, 'freeRadiusZones' | 'region'>): AddressStatus {
  const normalized = input.trim().toLowerCase()
  if (normalized.length < 3) return 'idle'

  const inZone = client.freeRadiusZones.some((zone) => {
    const z = zone.toLowerCase()
    // Match ZIPs as whole tokens so "1440 Main St" doesn't match 44011-style prefixes.
    return /^\d+$/.test(z) ? new RegExp(`\\b${z}\\b`).test(normalized) : normalized.includes(z)
  })
  if (inZone) return 'verified'

  const zip = normalized.match(/\b(\d{5})(?:-\d{4})?\b/)?.[1]
  if (zip && LOCAL_ZIP_PREFIXES[client.region].some((p) => zip.startsWith(p))) return 'verified'

  // Only call it "outside" once the user has typed something that looks complete.
  return zip || normalized.length >= 8 ? 'outside' : 'idle'
}

export function travelFeeFor(client: Pick<ClientConfig, 'travelFee'>, status: AddressStatus): number {
  return status === 'outside' ? (client.travelFee ?? TRAVEL_FEE) : 0
}

/** "$395", or "$49.95" when the amount has cents. */
export function formatCurrency(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount)
}

/** Label for a quote total: "Custom quote", "$120 + quote" or "$120". */
export function formatQuoteTotal(quote: Pick<Quote, 'totalPrice' | 'hasQuotedItems'>): string {
  if (!quote.hasQuotedItems) return formatCurrency(quote.totalPrice)
  return quote.totalPrice > 0 ? `${formatCurrency(quote.totalPrice)} + quote` : 'Custom quote'
}

function formatHourNumber(hours: number): string {
  return hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1)
}

export function formatHours(hours: number): string {
  return `${formatHourNumber(hours)} hr${hours === 1 ? '' : 's'}`
}

/** e.g. "3.5 Hour Time Block Allocated" */
export function formatBlockLabel(hours: number): string {
  return `${formatHourNumber(hours)} Hour Time Block Allocated`
}

export function formatClock(fractionalHour: number): string {
  const h = Math.floor(fractionalHour)
  const m = Math.round((fractionalHour - h) * 60)
  const period = h >= 12 && h < 24 ? 'PM' : 'AM'
  const displayHour = h % 12 === 0 ? 12 : h % 12
  return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`
}

export interface BookingDay {
  key: string
  date: Date
  weekday: string
  label: string
}

/** The next `count` open days (Mon–Sat), starting tomorrow. */
export function getUpcomingDays(count: number, from = new Date()): BookingDay[] {
  const days: BookingDay[] = []
  const cursor = new Date(from)
  cursor.setHours(0, 0, 0, 0)
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    if (cursor.getDay() === 0) continue
    const date = new Date(cursor)
    days.push({
      // Local date, not toISOString(), which would shift the day in UTC-negative zones.
      key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      date,
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })
  }
  return days
}

/** The next `count` open days starting today (or the next open day), plus today's key. */
export function getScheduleDays(count: number, now = new Date()): { days: BookingDay[]; todayKey: string } {
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  return {
    days: getUpcomingDays(count, yesterday),
    todayKey: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  }
}

export interface TimeSlot {
  id: string
  start: number
  end: number
  startLabel: string
  endLabel: string
  status: 'open' | 'booked' | 'too-long'
}

/** Small deterministic hash so the same client/day always shows the same "booked" slots. */
function hash(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0
  return Math.abs(h)
}

/** Scrambles a hash so nearby inputs ("…:0", "…:1") don't give nearby outputs. */
function mix(n: number): number {
  let x = Math.imul(n ^ (n >>> 16), 0x45d9f3b)
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  return (x ^ (x >>> 16)) >>> 0
}

export function getSlotsForDay(clientSlug: string, dayKey: string, blockHours: number): TimeSlot[] {
  const seed = hash(`${clientSlug}:${dayKey}`)
  const slots = SLOT_STARTS.map((start, index): TimeSlot => {
    const end = start + blockHours
    const booked = index > 0 && (seed >> index) % 3 === 0
    return {
      id: `${dayKey}-${start}`,
      start,
      end,
      startLabel: formatClock(start),
      endLabel: formatClock(end),
      status: booked ? 'booked' : end > CLOSE_HOUR ? 'too-long' : 'open',
    }
  })
  // Long jobs that don't fit a single day still get the opening slot as a multi-day start.
  if (!slots.some((s) => s.status === 'open') && slots[0].start === OPEN_HOUR) {
    slots[0] = { ...slots[0], status: 'open' }
  }
  return slots
}

/** A job as the owner dashboard shows it. */
export interface OwnerBooking {
  id: string
  dayKey: string
  /** Fractional start hour (13.5 = 1:30 PM). */
  start: number
  customer: string
  serviceName: string
  address: string
  /** `null` when the job is priced by quote. */
  price: number | null
  hours: number
  /** The booking just made in the customer demo. */
  isNew?: boolean
}

const SAMPLE_CUSTOMERS = [
  'Alex M.', 'Brianna K.', 'Chris D.', 'Dana R.', 'Eli W.', 'Fatima S.', 'Grant H.', 'Hannah P.',
  'Isaac T.', 'Jasmine L.', 'Kevin O.', 'Lauren B.', 'Marcus J.', 'Nina G.', 'Omar F.', 'Paige C.',
]
const SAMPLE_STREETS = ['Maple Ave', 'Oak St', 'Lakeview Dr', 'Main St', 'Park Pl', 'Ridge Rd', 'Elm Ct', 'Center St']

/** Deterministic fake jobs for the owner dashboard: 2–3 per day, so a client always shows the same week. */
export function getSampleBookings(client: ClientConfig, days: BookingDay[]): OwnerBooking[] {
  const town = client.address.match(/([A-Za-z .]+), OH/)?.[1]?.trim() ?? 'Columbus'
  return days.flatMap((day) => {
    const seed = mix(hash(`${client.slug}:${day.key}:owner`))
    const count = 2 + (seed % 2)
    return SLOT_STARTS.slice(0, count).map((start, i): OwnerBooking => {
      const n = mix(hash(`${seed}:${i}`))
      const service = client.services[n % client.services.length]
      const tiers = getSizeGroup(client, serviceCategory(client, service)).tiers
      const tier = tiers[(n >>> 3) % tiers.length]
      return {
        id: `${day.key}-${i}`,
        dayKey: day.key,
        start,
        customer: SAMPLE_CUSTOMERS[n % SAMPLE_CUSTOMERS.length],
        serviceName: tiers.length > 1 ? `${service.name} · ${tier.label}` : service.name,
        address: `${100 + (n % 9800)} ${SAMPLE_STREETS[(n >>> 5) % SAMPLE_STREETS.length]}, ${town}`,
        price: servicePrice(service, tier),
        hours: serviceHours(service, tier),
      }
    })
  })
}
