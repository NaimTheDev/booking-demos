import { Button, Card, FieldError, Input, Label, Separator, TextField } from '@heroui/react'
import { Calendar, Clock, CreditCard, Lock, Mail, MapPin, Phone, User } from 'lucide-react'
import { DEPOSIT_AMOUNT, formatCurrency, formatHours, formatQuoteTotal } from '../../lib/booking'
import { PhotoUpload } from './PhotoUpload'

export interface ContactInfo {
  name: string
  phone: string
  email: string
}

export interface BookingSummary {
  serviceName: string
  addonNames: string[]
  address: string
  when: string
  /** Includes the travel fee. */
  totalPrice: number
  travelFee: number
  /** Some of the booking is priced by quote. */
  hasQuotedItems: boolean
  totalHours: number
}

interface ConfirmStepProps {
  contact: ContactInfo
  onContactChange: (contact: ContactInfo) => void
  summary: BookingSummary
  photos: File[]
  onPhotosChange: (photos: File[]) => void
  isSubmitting: boolean
  onSubmit: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateContact(contact: ContactInfo) {
  return {
    name: contact.name.trim().length >= 2 ? null : 'Please enter your name.',
    phone: contact.phone.replace(/\D/g, '').length === 10 ? null : 'Enter a 10-digit phone number.',
    email: EMAIL_RE.test(contact.email.trim()) ? null : 'Enter a valid email address.',
  }
}

/** Formats digits as (440) 555-0123 while typing. */
function formatPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function ConfirmStep({
  contact,
  onContactChange,
  summary,
  photos,
  onPhotosChange,
  isSubmitting,
  onSubmit,
}: ConfirmStepProps) {
  const errors = validateContact(contact)
  const isValid = !errors.name && !errors.phone && !errors.email

  return (
    <form
      className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"
      onSubmit={(e) => {
        e.preventDefault()
        if (isValid) onSubmit()
      }}
    >
      <div className="flex flex-col gap-4">
        <ContactField
          label="Full name"
          icon={<User className="size-4" aria-hidden="true" />}
          value={contact.name}
          onChange={(name) => onContactChange({ ...contact, name })}
          error={errors.name}
          autoComplete="name"
          placeholder="Jordan Smith"
        />
        <ContactField
          label="Mobile phone"
          icon={<Phone className="size-4" aria-hidden="true" />}
          value={contact.phone}
          onChange={(phone) => onContactChange({ ...contact, phone: formatPhone(phone) })}
          error={errors.phone}
          type="tel"
          autoComplete="tel"
          placeholder="(440) 555-0123"
        />
        <ContactField
          label="Email"
          icon={<Mail className="size-4" aria-hidden="true" />}
          value={contact.email}
          onChange={(email) => onContactChange({ ...contact, email })}
          error={errors.email}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <PhotoUpload photos={photos} onChange={onPhotosChange} />
        <DepositCard />
      </div>

      <Card className="h-fit">
        <Card.Header>
          <Card.Title>Booking summary</Card.Title>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3 text-sm">
          <div>
            <p className="font-semibold">{summary.serviceName}</p>
            {summary.addonNames.length > 0 && (
              <p className="text-muted">+ {summary.addonNames.join(', ')}</p>
            )}
          </div>
          <SummaryLine icon={<Calendar className="size-4" />}>{summary.when}</SummaryLine>
          <SummaryLine icon={<Clock className="size-4" />}>
            {formatHours(summary.totalHours)} allocated
          </SummaryLine>
          <SummaryLine icon={<MapPin className="size-4" />}>{summary.address}</SummaryLine>
          <Separator />
          {summary.travelFee > 0 && (
            <div className="flex justify-between">
              <span className="text-muted">Travel fee</span>
              <span>{formatCurrency(summary.travelFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted">Estimated total</span>
            <span className="font-semibold">{formatQuoteTotal(summary)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Due today</span>
            <span className="font-semibold">{formatCurrency(DEPOSIT_AMOUNT)}</span>
          </div>
        </Card.Content>
        <Card.Footer className="flex-col gap-2">
          <Button
            type="submit"
            size="lg"
            fullWidth
            isDisabled={!isValid}
            isPending={isSubmitting}
            className="h-auto min-h-12 whitespace-normal py-3 text-center"
          >
            <Lock className="size-4" aria-hidden="true" />
            Lock Appointment with {formatCurrency(DEPOSIT_AMOUNT)} Deposit
          </Button>
          <p className="text-center text-xs text-muted">
            Fully refundable up to 24 hours before your appointment.
          </p>
        </Card.Footer>
      </Card>
    </form>
  )
}

interface ContactFieldProps {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (value: string) => void
  error: string | null
  type?: string
  autoComplete?: string
  placeholder?: string
}

function ContactField({ label, icon, value, onChange, error, type, autoComplete, placeholder }: ContactFieldProps) {
  // Only surface errors once the user has typed something, not on a pristine field.
  const showError = value.length > 0 && error !== null

  return (
    <TextField fullWidth isRequired value={value} onChange={onChange} isInvalid={showError} type={type}>
      <Label className="flex items-center gap-1.5">
        <span className="text-[var(--brand-accent)]">{icon}</span>
        {label}
      </Label>
      <Input autoComplete={autoComplete} placeholder={placeholder} />
      <FieldError>{error}</FieldError>
    </TextField>
  )
}

/** Stripe-style card fields, pre-filled with Stripe's test card. Nothing is charged in the demo. */
function DepositCard() {
  return (
    <fieldset className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-secondary p-4">
      <legend className="sr-only">Deposit payment</legend>
      <p className="flex items-center justify-between gap-2 text-sm font-medium">
        <span className="flex items-center gap-1.5">
          <CreditCard className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />
          {formatCurrency(DEPOSIT_AMOUNT)} deposit
        </span>
        <span className="flex items-center gap-1 text-xs font-normal text-muted">
          <Lock className="size-3" aria-hidden="true" /> Secured by Stripe
        </span>
      </p>
      <TextField fullWidth defaultValue="4242 4242 4242 4242">
        <Label>Card number</Label>
        <Input inputMode="numeric" autoComplete="off" />
      </TextField>
      <div className="grid grid-cols-2 gap-3">
        <TextField defaultValue="12 / 29">
          <Label>Expiry</Label>
          <Input inputMode="numeric" autoComplete="off" />
        </TextField>
        <TextField defaultValue="123">
          <Label>CVC</Label>
          <Input inputMode="numeric" autoComplete="off" />
        </TextField>
      </div>
      <p className="text-xs text-muted">Demo mode: no card is charged.</p>
    </fieldset>
  )
}

function SummaryLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-muted">
      <span className="mt-0.5 shrink-0 text-[var(--brand-accent)]" aria-hidden="true">{icon}</span>
      <span className="text-foreground">{children}</span>
    </p>
  )
}
