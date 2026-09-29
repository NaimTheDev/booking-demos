import { Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { useMemo } from 'react'
import { formatBlockLabel, formatHours, getSlotsForDay, type BookingDay, type TimeSlot } from '../../lib/booking'
import { cn } from '../../lib/cn'

interface ScheduleStepProps {
  clientSlug: string
  days: BookingDay[]
  blockHours: number
  selectedDayKey: string
  onSelectDay: (key: string) => void
  selectedSlotId: string | null
  onSelectSlot: (slot: TimeSlot) => void
}

export function ScheduleStep({
  clientSlug,
  days,
  blockHours,
  selectedDayKey,
  onSelectDay,
  selectedSlotId,
  onSelectSlot,
}: ScheduleStepProps) {
  const slots = useMemo(
    () => getSlotsForDay(clientSlug, selectedDayKey, blockHours),
    [clientSlug, selectedDayKey, blockHours],
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="brand-label flex items-center gap-2 text-xs sm:text-[13px]">
          <Calendar className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />
          Pick a day
        </h3>
        <Chip size="sm" variant="soft" color="accent">
          <Clock className="size-3" aria-hidden="true" />
          {formatHours(blockHours)} block
        </Chip>
      </div>

      <div role="radiogroup" aria-label="Day" className="grid grid-cols-3 gap-2 sm:gap-3">
        {days.map((day) => {
          const isSelected = day.key === selectedDayKey
          return (
            <button
              key={day.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectDay(day.key)}
              className={cn(
                'relative flex flex-col items-center rounded-2xl border px-2 py-3 outline-none transition-colors',
                'focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]',
                isSelected
                  ? 'border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-[inset_0_0_0_1px_var(--brand-primary)]'
                  : 'border-border bg-surface-secondary hover:border-[var(--brand-primary)]',
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="day-highlight"
                  className="absolute inset-0 rounded-2xl bg-accent-soft"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="brand-label relative text-[11px]" style={{ color: 'inherit' }}>{day.weekday}</span>
              <span className="brand-heading relative text-lg" style={{ color: 'inherit' }}>{day.label}</span>
            </button>
          )
        })}
      </div>

      <div role="radiogroup" aria-label="Time slot" className="grid gap-2 sm:grid-cols-2">
        {slots.map((slot, i) => (
          <SlotButton
            key={slot.id}
            slot={slot}
            index={i}
            blockHours={blockHours}
            isSelected={slot.id === selectedSlotId}
            onSelect={() => onSelectSlot(slot)}
          />
        ))}
      </div>
    </div>
  )
}

interface SlotButtonProps {
  slot: TimeSlot
  index: number
  blockHours: number
  isSelected: boolean
  onSelect: () => void
}

function SlotButton({ slot, index, blockHours, isSelected, onSelect }: SlotButtonProps) {
  const isOpen = slot.status === 'open'
  const endsNextDay = slot.end > 18

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={!isOpen}
      onClick={onSelect}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        'flex items-center justify-between gap-3 rounded-2xl border p-4 text-left outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]',
        !isOpen && 'cursor-not-allowed opacity-50',
        isSelected
          ? 'border-[var(--brand-primary)] bg-accent-soft shadow-[inset_0_0_0_1px_var(--brand-primary)]'
          : 'border-border bg-surface-secondary enabled:hover:border-[var(--brand-primary)]',
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold">
          {slot.startLabel}
          {isOpen && !endsNextDay && (
            <span className="font-normal text-muted"> – {slot.endLabel}</span>
          )}
        </span>
        <span className="text-xs text-muted">
          {slot.status === 'booked' && 'Already booked'}
          {slot.status === 'too-long' && 'Not enough time left in the day'}
          {isOpen &&
            `${formatBlockLabel(blockHours)}${endsNextDay ? ' · continues next day' : ''}`}
        </span>
      </div>
      {isOpen && (
        <span
          className={cn(
            'size-5 shrink-0 rounded-full border-2 transition-all',
            isSelected
              ? 'border-[6px] border-[var(--brand-primary)]'
              : 'border-border',
          )}
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}
