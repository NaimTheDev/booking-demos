import { Card } from '@heroui/react'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookingDemo } from '../components/BookingDemo'
import { getClientBySlug } from '../data/clients'
import { themes } from '../data/themes'

export function DemoPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const client = getClientBySlug(clientSlug)
  const theme = client ? themes[client.slug] : undefined

  useEffect(() => {
    document.title = client ? `Book with ${client.name}` : 'Demo not found'
  }, [client])

  if (!client || !theme) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md items-center px-4">
        <Card className="w-full items-center p-8 text-center">
          <ShieldAlert className="mb-2 size-10 text-warning" aria-hidden="true" />
          <Card.Title>No demo for “{clientSlug}”</Card.Title>
          <Card.Description>Check the slug or head back to the client list.</Card.Description>
          <Link to="/" className="mt-4 text-sm font-semibold text-accent underline-offset-4 hover:underline">
            ← All client demos
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-dvh">
      {/* Demo chrome stays outside the client's branding so their header reads untouched. */}
      <div className="flex items-center justify-between gap-3 bg-neutral-950 px-3 py-1.5 text-[11px] text-neutral-400">
        <Link to="/" className="flex items-center gap-1.5 font-medium text-neutral-200 hover:text-white">
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All demos
        </Link>
        <span className="flex min-w-0 items-center gap-3">
          <span className="truncate">Booking demo preview · {client.name}</span>
          <Link
            to={`/demo/${client.slug}/owner`}
            className="shrink-0 font-medium text-neutral-200 hover:text-white"
          >
            Owner view →
          </Link>
        </span>
      </div>
      {/* key resets widget state when navigating between clients. */}
      <BookingDemo key={client.slug} client={client} theme={theme} />
    </div>
  )
}
