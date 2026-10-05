import { Phone } from 'lucide-react'
import type { ClientConfig } from '../data/clients'
import type { ClientTheme, HeroConfig } from '../data/themes'
import { cn } from '../lib/cn'

interface BrandHeroProps {
  client: ClientConfig
  theme: ClientTheme
}

/** The client's own header chrome — utility bar, logo header and hero — rebuilt from their site. */
export function BrandHero({ client, theme }: BrandHeroProps) {
  const { hero } = theme
  // Transparent / translucent headers sit on top of the hero, like the sites' photo headers.
  const overHero = hero.nav.bg === 'transparent' || hero.nav.bg.startsWith('rgba')
  return (
    <>
      {hero.topBar && <TopBar topBar={hero.topBar} />}
      {hero.layout === 'panel' ? (
        <PanelHero client={client} hero={hero} />
      ) : (
        <>
          {!overHero && <NavBar client={client} theme={theme} overHero={false} />}
          <div style={{ background: hero.background, color: hero.fg }}>
            {overHero && <NavBar client={client} theme={theme} overHero />}
            <BannerHero hero={hero} />
          </div>
        </>
      )}
    </>
  )
}

function TopBar({ topBar }: { topBar: NonNullable<HeroConfig['topBar']> }) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-x-6 gap-y-1 px-4 py-2 text-[13px] sm:px-6',
        topBar.align === 'center' && 'justify-center text-center',
        topBar.align === 'start' && 'justify-start',
        (topBar.align ?? 'between') === 'between' && 'justify-between',
        topBar.uppercase && 'font-bold uppercase tracking-wide',
      )}
      style={{ background: topBar.bg, color: topBar.fg }}
    >
      {topBar.items.map((item, i) => (
        <span key={item} className={cn(i > 0 && topBar.align !== 'center' && 'hidden sm:inline')}>
          {item}
        </span>
      ))}
    </div>
  )
}

function LogoMark({ client, theme, className }: { client: ClientConfig; theme: ClientTheme; className?: string }) {
  const { nav } = theme.hero
  if (nav.wordmark && client.logo) {
    // Small badge logo beside a text wordmark.
    return (
      <span className="flex items-center gap-2.5">
        <img
          src={`${import.meta.env.BASE_URL}${client.logo.src.replace(/^\//, '')}`}
          alt=""
          className="size-10 object-contain"
        />
        <span className="brand-heading text-lg" style={{ color: nav.fg }}>{nav.wordmark}</span>
      </span>
    )
  }
  if (nav.wordmark || !client.logo) {
    return (
      <span className="brand-label text-xs sm:text-[13px]" style={{ color: nav.fg, letterSpacing: '0.3em' }}>
        {nav.wordmark ?? client.name}
      </span>
    )
  }
  const img = (
    <img
      src={`${import.meta.env.BASE_URL}${client.logo.src.replace(/^\//, '')}`}
      alt={`${client.name} logo`}
      className={cn('w-auto object-contain', className)}
      style={{ filter: nav.logoFilter }}
    />
  )
  if (!nav.logoPlate) return img
  return (
    <span className="-my-3 flex self-stretch items-center px-3 py-3 sm:px-5" style={{ background: nav.logoPlate }}>
      {img}
    </span>
  )
}

function NavBar({ client, theme, overHero }: { client: ClientConfig; theme: ClientTheme; overHero: boolean }) {
  const { nav } = theme.hero
  return (
    <header
      className={cn(overHero && 'mx-auto max-w-6xl sm:px-4 sm:pt-4')}
      style={{
        color: nav.fg,
        background: overHero ? undefined : nav.bg,
        borderBottom: nav.borderColor ? `1px solid ${nav.borderColor}` : undefined,
      }}
    >
      <div
        className={cn('flex items-center justify-between gap-4 px-4 py-3 sm:px-6', !overHero && 'mx-auto max-w-6xl')}
        style={{ background: overHero ? nav.bg : undefined }}
      >
        <LogoMark
          client={client}
          theme={theme}
          className={nav.logoSize === 'lg' ? 'h-14 max-w-48 sm:h-24 sm:max-w-72' : 'h-10 max-w-44 sm:h-14 sm:max-w-60'}
        />
        {nav.action && <NavAction action={nav.action} fg={nav.fg} />}
      </div>
    </header>
  )
}

function NavAction({ action, fg }: { action: NonNullable<HeroConfig['nav']['action']>; fg: string }) {
  const isPhone = action.href.startsWith('tel:')
  if (action.style === 'text') {
    return (
      <a href={action.href} className="flex items-center gap-2 text-sm font-bold sm:text-base" style={{ color: fg }}>
        {isPhone && <Phone className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />}
        {action.label}
      </a>
    )
  }
  return (
    <a
      href={action.href}
      className="shrink-0 px-3 py-2 text-[11px] sm:px-5 sm:py-2.5 sm:text-sm"
      style={{
        fontFamily: 'var(--btn-font)',
        fontWeight: 'var(--btn-weight)',
        textTransform: 'var(--btn-case)' as React.CSSProperties['textTransform'],
        letterSpacing: 'var(--btn-tracking)',
        borderRadius: 'var(--btn-radius)',
        ...(action.style === 'button'
          ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)' }
          : { border: `1px solid ${action.color ?? 'var(--brand-border)'}`, color: action.color ?? 'var(--brand-primary)' }),
      }}
    >
      {action.label}
    </a>
  )
}

const SIZES: Record<HeroConfig['size'], string> = {
  md: 'text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]',
  lg: 'text-4xl sm:text-5xl lg:text-6xl leading-[1.05]',
  xl: 'text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.92]',
}

function Eyebrow({ eyebrow }: { eyebrow: NonNullable<HeroConfig['eyebrow']> }) {
  if (eyebrow.style === 'pill') {
    return (
      <span className="rounded-full px-4 py-1.5 text-sm font-semibold sm:text-base" style={{ background: 'var(--btn-bg)', color: 'var(--btn-fg)' }}>
        {eyebrow.text}
      </span>
    )
  }
  if (eyebrow.style === 'badge') {
    return (
      <span
        className="brand-label flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs"
        style={{ background: 'var(--brand-surface)', borderColor: 'var(--brand-border)' }}
      >
        <span className="size-1.5 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
        {eyebrow.text}
      </span>
    )
  }
  if (eyebrow.style === 'script') {
    return (
      <span className="text-5xl leading-none sm:text-7xl" style={{ fontFamily: eyebrow.font, color: eyebrow.color }}>
        {eyebrow.text}
      </span>
    )
  }
  if (eyebrow.style === 'italic') {
    return <span className="text-xl font-bold italic sm:text-2xl">{eyebrow.text}</span>
  }
  if (eyebrow.style === 'mono') {
    return <span className="brand-label text-[11px]">{eyebrow.text}</span>
  }
  return <span className="brand-label text-xs sm:text-sm" style={{ color: 'inherit', opacity: 0.8 }}>{eyebrow.text}</span>
}

function Headline({ hero }: { hero: HeroConfig }) {
  return (
    <h1
      className={cn('brand-display', SIZES[hero.size])}
      style={{
        color: hero.headlineColor,
        textShadow: hero.ornament === 'frame' ? '2px 2px 6px rgba(0,0,0,0.45)' : undefined,
      }}
    >
      {hero.headline}
      {hero.highlight && (
        <>
          {hero.highlightOnNewLine ? <br /> : ' '}
          <span style={{ color: hero.highlightColor }}>{hero.highlight}</span>
        </>
      )}
    </h1>
  )
}

function BannerHero({ hero }: { hero: HeroConfig }) {
  const centered = hero.align === 'center'
  const content = (
    <>
      {hero.eyebrow && <Eyebrow eyebrow={hero.eyebrow} />}
      {hero.kicker && <p className="text-2xl font-normal sm:text-3xl">{hero.kicker}</p>}
      {hero.ornament === 'frame' ? (
        <div className="border px-6 py-3 sm:px-10" style={{ borderColor: hero.ornamentColor }}>
          <Headline hero={hero} />
        </div>
      ) : (
        <Headline hero={hero} />
      )}
      {hero.subline && (
        <p className="brand-display text-2xl !font-light sm:text-4xl" style={{ lineHeight: 1.1 }}>
          {hero.subline}
        </p>
      )}
      {hero.ornament === 'rule' && (
        <span className="my-1 block h-0.5 w-40 sm:w-60" style={{ background: hero.ornamentColor }} aria-hidden="true" />
      )}
      {hero.sub && <p className={cn('max-w-2xl text-base opacity-85 sm:text-lg', centered && 'mx-auto')}>{hero.sub}</p>}
    </>
  )
  return (
    <section
      className={cn(
        'mx-auto flex max-w-6xl flex-col px-4 sm:px-6',
        centered ? 'items-center text-center' : 'items-start',
        hero.size === 'xl' ? 'pb-14 pt-12 sm:pb-20 sm:pt-20' : 'pb-12 pt-10 sm:pb-16 sm:pt-16',
        hero.overlap && 'pb-24 sm:pb-28',
      )}
    >
      {hero.box ? (
        <div className={cn('flex max-w-xl flex-col gap-4 rounded-[var(--brand-radius)] p-6 sm:p-10', centered ? 'items-center' : 'items-start')} style={{ background: hero.box }}>
          {content}
        </div>
      ) : (
        <div className={cn('flex flex-col gap-4', centered ? 'items-center' : 'items-start')}>{content}</div>
      )}
    </section>
  )
}

/** Dynamic Detail style: logo, phone and headline stacked in a centered translucent panel. */
function PanelHero({ client, hero }: { client: ClientConfig; hero: HeroConfig }) {
  return (
    <div className="mx-auto max-w-4xl pt-6 sm:px-6 sm:pt-10">
    <section
      className="flex flex-col items-center gap-3 px-6 pb-8 pt-10 text-center"
      style={{ background: hero.background, color: hero.fg }}
    >
      {client.logo && (
        <img
          src={`${import.meta.env.BASE_URL}${client.logo.src.replace(/^\//, '')}`}
          alt={`${client.name} logo`}
          className="h-16 w-auto max-w-[80%] object-contain sm:h-20"
        />
      )}
      {hero.kicker && <p className="mt-4 text-3xl font-bold tracking-wide sm:text-4xl">{hero.kicker}</p>}
      {hero.eyebrow && <span className="-mt-2 text-[13px] uppercase">{hero.eyebrow.text}</span>}
      <h1 className={cn('brand-display mt-3 max-w-md', SIZES[hero.size])} style={{ color: 'var(--display-color)', fontSize: 'clamp(1.25rem, 3vw, 1.4rem)' }}>
        {hero.headline}
      </h1>
    </section>
    </div>
  )
}
