import { Car, Caravan, Droplets, Gem, KeyRound, Layers, PawPrint, Ship, SunDim, Wrench, type LucideProps } from 'lucide-react'
import type { Vertical } from '../data/clients'

const ICONS = {
  auto: Car,
  marine: Ship,
  stone: Gem,
  rv: Caravan,
  mechanic: Wrench,
  pet: PawPrint,
  tint: SunDim,
  exterior: Droplets,
  locksmith: KeyRound,
  multi: Layers,
} satisfies Record<Vertical, React.ComponentType<LucideProps>>

interface VerticalIconProps extends LucideProps {
  vertical: Vertical
}

export function VerticalIcon({ vertical, ...props }: VerticalIconProps) {
  const Icon = ICONS[vertical]
  return <Icon aria-hidden="true" {...props} />
}
