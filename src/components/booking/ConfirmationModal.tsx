import { Button, Modal } from '@heroui/react'
import { motion } from 'framer-motion'
import { CheckCircle, MessageSquareText } from 'lucide-react'
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
  brandStyle,
}: ConfirmationModalProps) {
  const firstName = customerName.trim().split(/\s+/)[0]

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
                      {formatCurrency(DEPOSIT_AMOUNT)} deposit received ·{' '}
                      {summary.hasQuotedItems
                        ? 'remaining balance quoted before service'
                        : `${formatCurrency(Math.max(summary.totalPrice - DEPOSIT_AMOUNT, 0))} due at service`}
                    </p>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-border p-4 text-sm">
                    <MessageSquareText className="size-5 shrink-0 text-[var(--brand-accent)]" aria-hidden="true" />
                    <p>
                      <span className="block text-xs text-muted">SMS to {customerPhone}</span>
                      Hi {firstName}! Your {businessName} appointment is locked in for {summary.when}. Reply C to confirm or R to reschedule.
                    </p>
                  </div>
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
