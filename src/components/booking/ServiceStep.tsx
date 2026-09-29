import { Card, Checkbox, Chip, Label, ListBox, Select } from '@heroui/react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Sparkles, Wrench } from 'lucide-react'
import type { Addon, ClientConfig, Service, ServiceCategory, SizeTier } from '../../data/clients'
import {
  CATEGORY_LABELS,
  addonsForCategory,
  formatCurrency,
  formatHours,
  getCategories,
  getSizeGroup,
  serviceHours,
  servicePrice,
} from '../../lib/booking'
import { cn } from '../../lib/cn'
import { VerticalIcon } from '../VerticalIcon'

interface ServiceStepProps {
  client: ClientConfig
  category: ServiceCategory
  onCategoryChange: (category: ServiceCategory) => void
  tier: SizeTier
  onTierChange: (tierId: string) => void
  services: Service[]
  selectedServiceId: string | null
  onSelectService: (id: string) => void
  selectedAddonIds: Set<string>
  onToggleAddon: (id: string, selected: boolean) => void
}

export function ServiceStep({
  client,
  category,
  onCategoryChange,
  tier,
  onTierChange,
  services,
  selectedServiceId,
  onSelectService,
  selectedAddonIds,
  onToggleAddon,
}: ServiceStepProps) {
  const categories = getCategories(client)
  const sizeConfig = getSizeGroup(client, category)
  const addons = addonsForCategory(client, category)

  return (
    <div className="flex flex-col gap-6">
      <div className={cn('grid gap-3', categories.length > 1 && 'sm:grid-cols-2')}>
        {categories.length > 1 && (
          <Select
            className="w-full"
            value={category}
            onChange={(key) => key && onCategoryChange(key as ServiceCategory)}
          >
            <Label>What are we polishing?</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {categories.map((c) => (
                  <ListBox.Item key={c} id={c} textValue={CATEGORY_LABELS[c]}>
                    <span className="flex items-center gap-2">
                      <VerticalIcon vertical={c} className="size-4" />
                      {CATEGORY_LABELS[c]}
                    </span>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        )}

        <Select
          className="w-full"
          value={tier.id}
          onChange={(key) => key && onTierChange(String(key))}
        >
          <Label>{sizeConfig.label}</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {sizeConfig.tiers.map((t) => (
                <ListBox.Item key={t.id} id={t.id} textValue={t.label}>
                  {t.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <section className="flex flex-col gap-3">
        <SectionHeading icon={<VerticalIcon vertical={category} className="size-4" />}>
          Choose your service
        </SectionHeading>
        <div role="radiogroup" aria-label="Services" className="grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              tier={tier}
              isSelected={service.id === selectedServiceId}
              onSelect={() => onSelectService(service.id)}
            />
          ))}
        </div>
      </section>

      {addons.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeading icon={<Wrench className="size-4" aria-hidden="true" />}>
            Popular add-ons
          </SectionHeading>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon) => (
              <AddonRow
                key={addon.id}
                addon={addon}
                isSelected={selectedAddonIds.has(addon.id)}
                onChange={(selected) => onToggleAddon(addon.id, selected)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="brand-label flex items-center gap-2 text-xs sm:text-[13px]">
      <span className="text-[var(--brand-accent)]">{icon}</span>
      {children}
    </h3>
  )
}

interface ServiceCardProps {
  service: Service
  tier: SizeTier
  isSelected: boolean
  onSelect: () => void
}

function ServiceCard({ service, tier, isSelected, onSelect }: ServiceCardProps) {
  const price = servicePrice(service, tier)
  const hours = serviceHours(service, tier)
  const isPerFoot =
    service.priceUnit === 'per-foot' && service.price !== null && tier.referenceFeet !== undefined

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className="h-full rounded-3xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
    >
      <Card
        className={cn(
          'h-full border transition-colors',
          isSelected
            ? 'border-[var(--brand-primary)] bg-accent-soft shadow-[inset_0_0_0_1px_var(--brand-primary)]'
            : 'border-border hover:border-[color-mix(in_oklab,var(--brand-border)_60%,var(--brand-text))]',
        )}
      >
        <Card.Header className="flex-row items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <Card.Title className="flex items-center gap-2">
              {service.name}
            </Card.Title>
            {service.popular && (
              <span className="flex w-fit items-center gap-1 text-xs font-semibold text-foreground">
                <Sparkles className="size-3 text-[var(--brand-accent)]" aria-hidden="true" /> Most booked
              </span>
            )}
          </div>
          <CheckCircle
            aria-hidden="true"
            className={cn(
              'size-6 shrink-0 transition-all',
              isSelected ? 'scale-100 text-[var(--brand-primary)]' : 'scale-75 text-border',
            )}
          />
        </Card.Header>
        <Card.Content>
          <Card.Description>{service.description}</Card.Description>
        </Card.Content>
        <Card.Footer className="flex items-center justify-between gap-2">
          <span className="flex flex-col">
            {price === null ? (
              <span className="brand-heading text-lg">Custom quote</span>
            ) : (
              <span className="flex items-baseline gap-1">
                {service.startingAt && <span className="text-xs font-medium text-muted">from</span>}
                <span className="brand-heading text-2xl">{formatCurrency(price)}</span>
              </span>
            )}
            {isPerFoot && (
              <span className="text-xs text-muted">
                {formatCurrency(service.price ?? 0)}/ft × {tier.referenceFeet} ft
              </span>
            )}
          </span>
          <Chip size="sm" variant="soft" color="accent">
            <Clock className="size-3" aria-hidden="true" />
            {formatHours(hours)}
          </Chip>
        </Card.Footer>
      </Card>
    </motion.button>
  )
}

interface AddonRowProps {
  addon: Addon
  isSelected: boolean
  onChange: (selected: boolean) => void
}

function AddonRow({ addon, isSelected, onChange }: AddonRowProps) {
  return (
    <Checkbox
      isSelected={isSelected}
      onChange={onChange}
      className={cn(
        'w-full rounded-2xl border p-3 transition-colors',
        isSelected ? 'border-[var(--brand-primary)] bg-accent-soft' : 'border-border bg-surface-secondary',
      )}
    >
      <Checkbox.Content className="w-full">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <span className="flex flex-1 flex-col">
          <span className="text-sm font-medium">{addon.name}</span>
          <span className="text-xs text-muted">
            {addon.price === null
              ? 'Priced by quote'
              : `${addon.startingAt ? 'from ' : ''}+${formatCurrency(addon.price)}`}
            {addon.addedHours > 0 && ` · +${formatHours(addon.addedHours)}`}
          </span>
        </span>
      </Checkbox.Content>
    </Checkbox>
  )
}
