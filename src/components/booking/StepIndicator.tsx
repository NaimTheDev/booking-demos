import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

interface StepIndicatorProps {
  steps: string[]
  current: number
  /** Highest step index the user may jump back to. */
  maxReached: number
  onStepClick: (index: number) => void
}

export function StepIndicator({ steps, current, maxReached, onStepClick }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Booking progress">
      {steps.map((label, i) => {
        const isDone = i < current
        const isActive = i === current
        const isReachable = i <= maxReached && !isActive
        return (
          <li
            key={label}
            className={cn('flex items-center gap-1 sm:gap-2', i < steps.length - 1 && 'flex-1')}
          >
            <button
              type="button"
              disabled={!isReachable}
              onClick={() => onStepClick(i)}
              aria-current={isActive ? 'step' : undefined}
              className="flex min-w-0 items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] enabled:cursor-pointer"
            >
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  isActive && 'bg-[var(--brand-primary)] text-white',
                  isDone && 'bg-[var(--brand-accent)] text-white',
                  !isActive && !isDone && 'bg-surface-secondary text-muted',
                )}
              >
                {isDone ? <Check className="size-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden truncate text-sm font-medium md:inline',
                  isActive ? 'text-foreground' : 'text-muted',
                )}
              >
                {label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'h-0.5 flex-1 rounded-full transition-colors',
                  isDone ? 'bg-[var(--brand-accent)]' : 'bg-border',
                )}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
