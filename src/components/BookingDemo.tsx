import { Card } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ClientConfig, ServiceCategory } from '../data/clients'
import {
  calculateQuote,
  getCategories,
  getTier,
  getUpcomingDays,
  serviceCategory,
  addonsForCategory,
  getSizeGroup,
  validateAddress,
  type TimeSlot,
} from '../lib/booking'
import { brandStyle } from '../lib/brand'
import { AddressStep } from './booking/AddressStep'
import { ClientLogo } from './ClientLogo'
import { ConfirmationModal } from './booking/ConfirmationModal'
import { ConfirmStep, type BookingSummary, type ContactInfo } from './booking/ConfirmStep'
import { ScheduleStep } from './booking/ScheduleStep'
import { ServiceStep } from './booking/ServiceStep'
import { StepIndicator } from './booking/StepIndicator'
import { SummaryBar } from './booking/SummaryBar'
import { VerticalIcon } from './VerticalIcon'

const STEPS = [
  { label: 'Service', title: 'Build your service', subtitle: 'Pick a package and any add-ons.' },
  { label: 'Location', title: 'Where should we meet you?', subtitle: 'We bring everything — water, power, and pros.' },
  { label: 'Schedule', title: 'Choose a time', subtitle: 'Your full service block is reserved on our calendar.' },
  { label: 'Confirm', title: 'Lock it in', subtitle: 'A small deposit holds your spot.' },
] as const

const SIMULATED_PAYMENT_MS = 1200
const EMPTY_CONTACT: ContactInfo = { name: '', phone: '', email: '' }

interface BookingDemoProps {
  client: ClientConfig
}

export function BookingDemo({ client }: BookingDemoProps) {
  const categories = getCategories(client)
  const days = useMemo(() => getUpcomingDays(3), [])

  const [step, setStep] = useState(0)
  const [maxReached, setMaxReached] = useState(0)
  const [direction, setDirection] = useState(1)

  const [category, setCategory] = useState<ServiceCategory>(categories[0])
  const [tierId, setTierId] = useState(getSizeGroup(client, categories[0]).tiers[0].id)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [addonIds, setAddonIds] = useState<Set<string>>(new Set())
  const [address, setAddress] = useState('')
  const [dayKey, setDayKey] = useState(days[0].key)
  const [slot, setSlot] = useState<TimeSlot | null>(null)
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  // Snapshot so the modal keeps its content while "Book another" resets the form behind it.
  const [confirmed, setConfirmed] = useState<{ summary: BookingSummary; contact: ContactInfo } | null>(null)

  const services = client.services.filter((s) => serviceCategory(client, s) === category)
  const selectedService = client.services.find((s) => s.id === serviceId)
  const selectedAddons = addonsForCategory(client, category).filter((a) => addonIds.has(a.id))
  const tier = getTier(client, category, tierId)
  const quote = calculateQuote(selectedService, tier, selectedAddons)
  const addressStatus = validateAddress(address, client)
  const selectedDay = days.find((d) => d.key === dayKey) ?? days[0]

  const canContinue = [
    selectedService !== undefined,
    addressStatus !== 'idle',
    slot !== null,
    false,
  ][step]

  const summary: BookingSummary = {
    serviceName: selectedService ? `${selectedService.name} · ${tier.label}` : '',
    addonNames: selectedAddons.map((a) => a.name),
    address: address.trim(),
    when: slot ? `${selectedDay.weekday}, ${selectedDay.label} at ${slot.startLabel}` : '',
    totalPrice: quote.totalPrice,
    totalHours: quote.totalHours,
    hasQuotedItems: quote.hasQuotedItems,
  }

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    setMaxReached((m) => Math.max(m, next))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCategoryChange(next: ServiceCategory) {
    setCategory(next)
    setTierId(getSizeGroup(client, next).tiers[0].id)
    // Drop add-ons that only apply to the previous category.
    const allowed = new Set(addonsForCategory(client, next).map((a) => a.id))
    setAddonIds((prev) => new Set([...prev].filter((id) => allowed.has(id))))
    setServiceId(null)
  }

  function handleToggleAddon(id: string, selected: boolean) {
    setAddonIds((prev) => {
      const next = new Set(prev)
      if (selected) next.add(id)
      else next.delete(id)
      return next
    })
  }

  // A changed duration can invalidate the chosen slot, so clear it whenever the block changes.
  const [slotBlockHours, setSlotBlockHours] = useState(quote.totalHours)
  if (slotBlockHours !== quote.totalHours) {
    setSlotBlockHours(quote.totalHours)
    setSlot(null)
  }

  function handleSubmit() {
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setConfirmed({ summary, contact })
      setIsConfirmed(true)
    }, SIMULATED_PAYMENT_MS)
  }

  function reset() {
    setStep(0)
    setMaxReached(0)
    setDirection(-1)
    setServiceId(null)
    setAddonIds(new Set())
    setAddress('')
    setSlot(null)
    setContact(EMPTY_CONTACT)
  }

  const current = STEPS[step]
  const isLastStep = step === STEPS.length - 1

  return (
    <div className="brand-scope" style={brandStyle(client)}>
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${client.primaryColor} 0%, color-mix(in oklab, ${client.primaryColor} 70%, ${client.accentColor}) 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-40 blur-3xl"
          style={{ background: client.accentColor }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col gap-3 px-4 pb-16 pt-14 text-white sm:px-6 sm:pt-12">
          <ClientLogo client={client} className="mb-2 self-start" />
          <div className="flex items-center gap-1.5 text-sm/none font-medium text-white/80">
            <VerticalIcon vertical={client.vertical} className="size-4" />
            <MapPin className="ml-1 size-3.5" aria-hidden="true" />
            {client.location}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{client.name}</h1>
          <p className="max-w-xl text-white/80">{client.tagline}</p>
        </div>
      </div>

      <div className="relative mx-auto -mt-10 max-w-4xl px-4 pb-4 sm:px-6">
        <Card className="overflow-visible rounded-3xl p-4 shadow-xl sm:p-6">
          <StepIndicator
            steps={STEPS.map((s) => s.label)}
            current={step}
            maxReached={maxReached}
            onStepClick={goTo}
          />

          <div className="mt-6 mb-5">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{current.title}</h2>
            <p className="text-sm text-muted">{current.subtitle}</p>
          </div>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {step === 0 && (
                <ServiceStep
                  client={client}
                  category={category}
                  onCategoryChange={handleCategoryChange}
                  tier={tier}
                  onTierChange={setTierId}
                  services={services}
                  selectedServiceId={serviceId}
                  onSelectService={setServiceId}
                  selectedAddonIds={addonIds}
                  onToggleAddon={handleToggleAddon}
                />
              )}
              {step === 1 && (
                <AddressStep
                  client={client}
                  address={address}
                  onAddressChange={setAddress}
                  status={addressStatus}
                />
              )}
              {step === 2 && (
                <ScheduleStep
                  clientSlug={client.slug}
                  days={days}
                  blockHours={quote.totalHours}
                  selectedDayKey={dayKey}
                  onSelectDay={(key) => {
                    setDayKey(key)
                    setSlot(null)
                  }}
                  selectedSlotId={slot?.id ?? null}
                  onSelectSlot={setSlot}
                />
              )}
              {step === 3 && (
                <ConfirmStep
                  contact={contact}
                  onContactChange={setContact}
                  summary={summary}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <SummaryBar
            totalPrice={quote.totalPrice}
            totalHours={quote.totalHours}
            hasQuotedItems={quote.hasQuotedItems}
            addonCount={selectedAddons.length}
            canGoBack={step > 0}
            onBack={() => goTo(step - 1)}
            onContinue={isLastStep ? undefined : () => goTo(step + 1)}
            canContinue={canContinue}
            continueLabel="Continue"
          />
        </Card>
      </div>

      {confirmed && (
        <ConfirmationModal
          isOpen={isConfirmed}
          onOpenChange={setIsConfirmed}
          onBookAnother={reset}
          businessName={client.name}
          customerName={confirmed.contact.name}
          customerPhone={confirmed.contact.phone}
          summary={confirmed.summary}
          brandStyle={brandStyle(client)}
        />
      )}
    </div>
  )
}
