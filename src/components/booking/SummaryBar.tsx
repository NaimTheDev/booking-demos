import { Badge, Button } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Receipt } from 'lucide-react'
import { formatHours, formatQuoteTotal } from '../../lib/booking'

interface SummaryBarProps {
  totalPrice: number
  hasQuotedItems: boolean
  totalHours: number
  addonCount: number
  canGoBack: boolean
  onBack: () => void
  /** Omit to hide the continue button (e.g. on the final step). */
  onContinue?: () => void
  canContinue: boolean
  continueLabel: string
}

export function SummaryBar({
  totalPrice,
  hasQuotedItems,
  totalHours,
  addonCount,
  canGoBack,
  onBack,
  onContinue,
  canContinue,
  continueLabel,
}: SummaryBarProps) {
  const totalLabel = formatQuoteTotal({ totalPrice, hasQuotedItems })

  return (
    <div className="sticky bottom-0 z-20 -mx-4 -mb-4 mt-8 rounded-b-[inherit] border-t border-border bg-surface/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:-mb-6 sm:px-6">
      <div className="flex items-center gap-3">
        <Badge.Anchor>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-[var(--brand-primary)]">
            <Receipt className="size-5" aria-hidden="true" />
          </div>
          {addonCount > 0 && (
            <Badge size="sm" color="accent" aria-label={`${addonCount} add-ons selected`}>
              +{addonCount}
            </Badge>
          )}
        </Badge.Anchor>

        <div className="flex min-w-0 flex-1 flex-col" aria-live="polite">
          <span className="whitespace-nowrap text-xs text-muted">Estimated total</span>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={totalLabel}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className="text-xl font-bold tracking-tight sm:text-2xl"
              >
                {totalLabel}
              </motion.span>
            </AnimatePresence>
            <span className="flex items-center gap-1 whitespace-nowrap text-xs text-muted sm:text-sm">
              <Clock className="size-3.5" aria-hidden="true" />
              {totalHours > 0 ? formatHours(totalHours) : '—'}
            </span>
          </div>
        </div>

        {canGoBack && (
          <Button variant="secondary" isIconOnly onPress={onBack} aria-label="Back">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
        )}
        {onContinue && (
          <Button onPress={onContinue} isDisabled={!canContinue}>
            {continueLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  )
}
