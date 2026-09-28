import type { ClientConfig } from '../data/clients'
import { cn } from '../lib/cn'
import { VerticalIcon } from './VerticalIcon'

interface ClientLogoProps {
  client: ClientConfig
  size?: 'sm' | 'lg'
  className?: string
}

/** The client's logo on its plate, or a vertical icon badge when there's no logo. */
export function ClientLogo({ client, size = 'lg', className }: ClientLogoProps) {
  if (!client.logo) {
    return (
      <span
        className={cn(
          'flex items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur',
          size === 'lg' ? 'size-14' : 'size-11',
          className,
        )}
      >
        <VerticalIcon vertical={client.vertical} className={size === 'lg' ? 'size-7' : 'size-5'} />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-2xl shadow-lg ring-1 ring-black/5',
        size === 'lg' ? 'px-4 py-3' : 'px-3 py-2',
        className,
      )}
      style={{ background: client.logo.background }}
    >
      <img
        src={`${import.meta.env.BASE_URL}${client.logo.src.replace(/^\//, '')}`}
        alt={`${client.name} logo`}
        className={cn('w-auto object-contain', size === 'lg' ? 'h-10 max-w-56 sm:h-12' : 'h-9 max-w-48')}
      />
    </span>
  )
}
