import { useEffect, type CSSProperties } from 'react'
import type { ClientTheme, TypeStyle } from '../data/themes'

function typeVars(prefix: string, t: TypeStyle, fallbackColor: string): Record<string, string> {
  return {
    [`--${prefix}-font`]: t.font,
    [`--${prefix}-weight`]: String(t.weight),
    [`--${prefix}-case`]: t.case ?? 'none',
    [`--${prefix}-tracking`]: t.tracking ?? 'normal',
    [`--${prefix}-color`]: t.color ?? fallbackColor,
  }
}

/** Inline CSS variables consumed by the `.brand-scope` class in index.css. */
export function brandStyle(theme: ClientTheme): CSSProperties {
  const { colors: c, button: b } = theme
  return {
    colorScheme: theme.mode,
    '--brand-primary': c.brand,
    '--brand-fg': c.brandFg,
    '--brand-accent': c.accent,
    '--brand-page': c.page,
    '--brand-surface': c.surface,
    '--brand-surface-alt': c.surfaceAlt,
    '--brand-text': c.text,
    '--brand-muted': c.muted,
    '--brand-border': c.border,
    '--brand-radius': `${theme.radius}px`,
    '--body-font': theme.body.font,
    ...typeVars('display', theme.display, c.text),
    ...typeVars('heading', theme.heading, c.text),
    ...typeVars('label', theme.label, c.muted),
    '--btn-bg': b.bg,
    '--btn-fg': b.fg,
    '--btn-radius': `${b.radius}px`,
    '--btn-case': b.case ?? 'none',
    '--btn-tracking': b.tracking ?? 'normal',
    '--btn-weight': String(b.weight),
    '--btn-font': b.font ?? theme.body.font,
  } as CSSProperties
}

/** Loads the theme's Google Fonts once per family set. */
export function useThemeFonts(theme: ClientTheme) {
  const families = theme.googleFonts.join('&family=')
  useEffect(() => {
    if (!families) return
    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [families])
}
