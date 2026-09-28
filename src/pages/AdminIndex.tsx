import { Card, Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, MapPin, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ClientLogo } from '../components/ClientLogo'
import { clients, type ClientConfig, type Region } from '../data/clients'
import { CATEGORY_LABELS, REGION_LABELS, formatCurrency, getCategories, startingPrice } from '../lib/booking'

const REGION_ORDER: Region[] = ['northeast-ohio', 'central-ohio']

export function AdminIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <Wrench className="size-4" aria-hidden="true" /> Agency Admin
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Client Booking Demos</h1>
        <p className="max-w-2xl text-muted">
          Interactive booking widgets for {clients.length} local service clients. Each demo runs on
          its own route with the client's brand colors, services and service area.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {REGION_ORDER.map((region) => {
          const regionClients = clients.filter((c) => c.region === region)
          if (regionClients.length === 0) return null
          return (
            <section key={region} aria-labelledby={`region-${region}`} className="flex flex-col gap-5">
              <h2
                id={`region-${region}`}
                className="flex items-center gap-2 text-lg font-bold tracking-tight"
              >
                <MapPin className="size-4 text-muted" aria-hidden="true" />
                {REGION_LABELS[region]}
                <span className="text-sm font-medium text-muted">· {regionClients.length}</span>
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regionClients.map((client, i) => (
                  <motion.div
                    key={client.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ClientCard client={client} />
                  </motion.div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function ClientCard({ client }: { client: ClientConfig }) {
  const fromPrice = startingPrice(client)
  const href = `/demo/${client.slug}`

  return (
    <Card className="group h-full overflow-hidden p-0 transition-shadow hover:shadow-xl">
      <div
        className="relative h-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${client.primaryColor}, color-mix(in oklab, ${client.primaryColor} 60%, ${client.accentColor}))`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 size-32 rounded-full opacity-50 blur-2xl transition-transform duration-500 group-hover:scale-125"
          style={{ background: client.accentColor }}
        />
        <ClientLogo client={client} size="sm" className="absolute bottom-3 left-4" />
        <div className="absolute right-3 top-3 flex gap-1.5">
          {[client.primaryColor, client.accentColor].map((color) => (
            <span
              key={color}
              title={color}
              className="size-4 rounded-full border-2 border-white/70"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>

      <Card.Header className="px-5 pt-4">
        <Card.Title className="text-lg">{client.name}</Card.Title>
        <Card.Description className="line-clamp-2">{client.tagline}</Card.Description>
      </Card.Header>

      <Card.Content className="flex flex-wrap gap-2 px-5">
        <Chip size="sm" variant="secondary">
          {getCategories(client).map((c) => CATEGORY_LABELS[c]).join(' · ')}
        </Chip>
        <Chip size="sm" variant="secondary">
          <MapPin className="size-3" aria-hidden="true" />
          {client.location}
        </Chip>
        <Chip size="sm" variant="secondary">
          {client.services.length} services ·{' '}
          {fromPrice === null ? 'custom quotes' : `from ${formatCurrency(fromPrice)}`}
        </Chip>
      </Card.Content>

      <Card.Footer className="mt-auto flex items-center justify-between gap-2 px-5 pb-5">
        <code className="min-w-0 truncate text-xs text-muted">{href}</code>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            to={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${client.name} demo in a new tab`}
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to={href}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: client.primaryColor }}
          >
            Launch demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )
}
