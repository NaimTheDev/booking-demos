import { Button, Modal } from '@heroui/react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, MessageSquareText } from 'lucide-react'
import type { CSSProperties } from 'react'
import { DEPOSIT_AMOUNT, formatCurrency } from '../../lib/booking'
import type { BookingSummary } from './ConfirmStep'

interface ConfirmationModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onBookAnother: () => void
  businessName: string
  customerName: string
  customerPhone: string
  summary: BookingSummary
  photoCount: number
  /** When the slot starts, e.g. "8:00 AM", for the day-of text. */
  startLabel: string
  onViewDashboard: () => void
  brandStyle: CSSProperties
}

export function ConfirmationModal({
  isOpen,
  onOpenChange,
  onBookAnother,
  businessName,
  customerName,
  customerPhone,
  summary,
  photoCount,
  startLabel,
  onViewDashboard,
  brandStyle,
}: ConfirmationModalProps) {
  const firstName = customerName.trim().split(/\s+/)[0]
  const messages = [
    {
      when: 'Now',
      text: `Hi ${firstName}! Your ${businessName} appointment is locked in for ${summary.when}.${
        photoCount > 0 ? ` We got your ${photoCount} photo${photoCount === 1 ? '' : 's'}.` : ''
      } Reply C to confirm or R to reschedule.`,
    },
    {
      when: '24 hours before',
      text: `Reminder: ${businessName} tomorrow at ${startLabel}. Need to change it? Reply R and we'll send new times.`,
    },
    {
      when: '2 hours before',
      text: `${businessName} here, see you at ${startLabel}! Reply if anything's changed.`,
    },
  ]

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container placement="center">
          {/* Portaled out of the widget, so re-apply the brand scope here. */}
          <Modal.Dialog className="brand-scope sm:max-w-md" style={brandStyle}>
            {({ close }) => (
              <>
                <Modal.Header className="items-center text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-success/15 text-success"
                  >
                    <CheckCircle className="size-9" aria-hidden="true" />
                  </motion.div>
                  <Modal.Heading className="text-2xl font-bold">Appointment Reserved!</Modal.Heading>
                  <p className="text-sm text-muted">
                    Confirmation text sent to customer.
                  </p>
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-3">
                  <div className="rounded-2xl bg-surface-secondary p-4 text-sm">
                    <p className="font-semibold">{summary.serviceName}</p>
                    <p className="text-muted">{summary.when}</p>
                    <p className="mt-2 text-muted">
                      {summary.travelFee > 0 && `Includes ${formatCurrency(summary.travelFee)} travel fee · `}
                      {formatCurrency(DEPOSIT_AMOUNT)} deposit received ·{' '}
                      {summary.hasQuotedItems
                        ? 'remaining balance quoted before service'
                        : `${formatCurrency(Math.max(summary.totalPrice - DEPOSIT_AMOUNT, 0))} due at service`}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border p-4 text-sm">
                    <p className="mb-3 flex items-center gap-2 text-xs text-muted">
                      <MessageSquareText className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />
                      Texts to {customerPhone}
                    </p>
                    <ol className="flex flex-col gap-3">
                      {messages.map((m) => (
                        <li key={m.when} className="flex flex-col gap-1">
                          <span className="brand-label text-[11px]">{m.when}</span>
                          <span className="w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-[var(--brand-primary)] px-3 py-2 text-[var(--brand-fg)]">
                            {m.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      close()
                      onViewDashboard()
                    }}
                    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] underline-offset-4 hover:underline"
                  >
                    See it in the owner dashboard
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </Modal.Body>
                <Modal.Footer className="flex-col gap-2 sm:flex-row">
                  <Button variant="secondary" fullWidth onPress={close}>
                    Close
                  </Button>
                  <Button
                    fullWidth
                    onPress={() => {
                      close()
                      onBookAnother()
                    }}
                  >
                    Book another
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
