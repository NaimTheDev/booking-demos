import { Button, Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarCheck, CalendarOff, Clock, CreditCard, DollarSign, MapPin, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ClientLogo } from '../components/ClientLogo'
import { getClientBySlug, type ClientConfig } from '../data/clients'
import { themes, type ClientTheme } from '../data/themes'
import { brandStyle, useThemeFonts } from '../lib/brand'
import {
  DEPOSIT_AMOUNT,
  formatClock,
  formatCurrency,
  formatHours,
  getSampleBookings,
  getScheduleDays,
  type BookingDay,
  type OwnerBooking,
} from '../lib/booking'
import { cn } from '../lib/cn'

const DASHBOARD_DAYS = 6

export function OwnerPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const client = getClientBySlug(clientSlug)
  const theme = client ? themes[client.slug] : undefined
  const newBooking = (useLocation().state as { newBooking?: OwnerBooking } | null)?.newBooking

  useEffect(() => {
    document.title = client ? `${client.name} · Owner dashboard` : 'Demo not found'
  }, [client])

  if (!client || !theme) return <Navigate to="/" replace />
  return <Dashboard key={client.slug} client={client} theme={theme} newBooking={newBooking} />
}

interface DashboardProps {
  client: ClientConfig
  theme: ClientTheme
  /** Passed in router state from the customer demo's confirmation modal. */
  newBooking?: OwnerBooking
}

function Dashboard({ client, theme, newBooking }: DashboardProps) {
  useThemeFonts(theme)

  const { days, todayKey } = useMemo(() => getScheduleDays(DASHBOARD_DAYS), [])
  const bookings = useMemo(() => {
    const sample = getSampleBookings(client, days)
    if (!newBooking) return sample
    // The customer demo's slots are simulated separately, so clear any sample job in the new one's spot.
    const clash = (b: OwnerBooking) => b.dayKey === newBooking.dayKey && b.start === newBooking.start
    return [newBooking, ...sample.filter((b) => !clash(b))]
  }, [client, days, newBooking])
  const newBookingDay = newBooking && days.find((d) => d.key === newBooking.dayKey)
  const [blocked, setBlocked] = useState<Set<string>>(new Set())

  const revenue = bookings.reduce((sum, b) => sum + (b.price ?? 0), 0)
  const quoteCount = bookings.filter((b) => b.price === null).length
  const stats = [
    { label: 'Bookings this week', value: String(bookings.length), icon: CalendarCheck },
    { label: 'Deposits collected', value: formatCurrency(bookings.length * DEPOSIT_AMOUNT), icon: CreditCard },
    // Quote-only businesses (e.g. stone restoration) have no booked revenue to show yet.
    revenue > 0
      ? { label: 'Revenue booked', value: formatCurrency(revenue), icon: DollarSign, note: quoteCount ? `+ ${quoteCount} to quote` : undefined }
      : { label: 'Jobs to quote', value: String(quoteCount), icon: DollarSign, note: 'Awaiting your quote' },
    { label: 'No-shows this month', value: '0', icon: ShieldCheck, note: 'Deposits on' },
  ]

  function toggleBlocked(dayKey: string) {
    setBlocked((prev) => {
      const next = new Set(prev)
      if (next.has(dayKey)) next.delete(dayKey)
      else next.add(dayKey)
      return next
    })
  }

  return (
    <div className="min-h-dvh">
      <div className="flex items-center justify-between gap-3 bg-neutral-950 px-3 py-1.5 text-[11px] text-neutral-400">
        <Link
          to={`/demo/${client.slug}`}
          className="flex items-center gap-1.5 font-medium text-neutral-200 hover:text-white"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Customer view
        </Link>
        <span className="truncate">Owner dashboard preview · {client.name}</span>
      </div>

      <div className="brand-scope min-h-dvh" style={{ ...brandStyle(theme), background: theme.colors.page }}>
        <header
          className="px-4 py-6 sm:px-6"
          style={{
            background: `linear-gradient(135deg, ${client.primaryColor}, color-mix(in oklab, ${client.primaryColor} 60%, ${client.accentColor}))`,
          }}
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
            <ClientLogo client={client} size="sm" />
            <div className="text-right text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">Owner dashboard</p>
              <p className="text-lg font-bold">This week</p>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
          {newBooking && (
            <motion.section
              aria-label="Just booked"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="brand-panel flex flex-col gap-1 border-[var(--brand-primary)] p-4"
            >
              <span className="brand-label text-[11px]">Just booked online</span>
              <p className="font-semibold">
                {newBooking.customer} · {newBooking.serviceName}
              </p>
              <p className="text-sm text-muted">
                {newBookingDay ? `${newBookingDay.weekday}, ${newBookingDay.label}` : ''} at{' '}
                {formatClock(newBooking.start)} · {formatCurrency(DEPOSIT_AMOUNT)} deposit collected,
                customer texted
              </p>
            </motion.section>
          )}

          <section aria-label="Stats" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, note }) => (
              <div key={label} className="brand-panel flex flex-col gap-1 p-4">
                <span className="brand-label flex items-center gap-1.5 text-[11px]">
                  <Icon className="size-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
                  {label}
                </span>
                <span className="brand-heading text-2xl">{value}</span>
                {note && <span className="text-xs text-muted">{note}</span>}
              </div>
            ))}
          </section>

          {days.map((day) => (
            <DaySection
              key={day.key}
              day={day}
              isToday={day.key === todayKey}
              bookings={bookings.filter((b) => b.dayKey === day.key).sort((a, b) => a.start - b.start)}
              isBlocked={blocked.has(day.key)}
              onToggleBlocked={() => toggleBlocked(day.key)}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

interface DaySectionProps {
  day: BookingDay
  isToday: boolean
  bookings: OwnerBooking[]
  isBlocked: boolean
  onToggleBlocked: () => void
}

function DaySection({ day, isToday, bookings, isBlocked, onToggleBlocked }: DaySectionProps) {
  return (
    <section aria-labelledby={`day-${day.key}`} className="brand-panel p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id={`day-${day.key}`} className="brand-heading flex items-center gap-2 text-lg">
          {isToday ? "Today's schedule" : `${day.weekday}, ${day.label}`}
          {isToday && <span className="text-sm font-normal text-muted">{day.weekday}, {day.label}</span>}
        </h2>
        <div className="flex items-center gap-2">
          {isBlocked && (
            <Chip size="sm" color="warning" variant="soft">
              Closed to new bookings
            </Chip>
          )}
          <Button size="sm" variant="secondary" onPress={onToggleBlocked}>
            <CalendarOff className="size-3.5" aria-hidden="true" />
            {isBlocked ? 'Reopen day' : 'Block off'}
          </Button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-sm text-muted">No jobs booked.</p>
      ) : (
        <ul className={cn('flex flex-col gap-2', isBlocked && 'opacity-70')}>
          {bookings.map((b) => (
            <motion.li
              key={b.id}
              initial={b.isNew ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex flex-col gap-2 rounded-2xl border p-3 sm:flex-row sm:items-center sm:justify-between',
                b.isNew
                  ? 'border-[var(--brand-primary)] bg-accent-soft shadow-[inset_0_0_0_1px_var(--brand-primary)]'
                  : 'border-border bg-surface-secondary',
              )}
            >
              <div className="flex min-w-0 gap-3">
                <span className="w-16 shrink-0 text-sm font-semibold">{formatClock(b.start)}</span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold">
                    {b.customer}
                    {b.isNew && (
                      <Chip size="sm" color="accent">
                        New
                      </Chip>
                    )}
                  </p>
                  <p className="text-sm">{b.serviceName}</p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <MapPin className="size-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{b.address}</span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2 pl-19 sm:pl-0">
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="size-3" aria-hidden="true" />
                  {formatHours(b.hours)}
                </span>
                <span className="text-sm font-semibold">
                  {b.price === null ? 'Quote' : formatCurrency(b.price)}
                </span>
                <Chip size="sm" color="success" variant="soft">
                  {formatCurrency(DEPOSIT_AMOUNT)} deposit paid
                </Chip>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  )
}
