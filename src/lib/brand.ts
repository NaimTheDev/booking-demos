import type { CSSProperties } from 'react'
import type { ClientConfig } from '../data/clients'

/** Inline CSS variables consumed by the `.brand-scope` class in index.css. */
export function brandStyle(client: Pick<ClientConfig, 'primaryColor' | 'accentColor'>): CSSProperties {
  return {
    '--brand-primary': client.primaryColor,
    '--brand-accent': client.accentColor,
  } as CSSProperties
}
