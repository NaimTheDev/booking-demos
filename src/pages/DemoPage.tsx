import { Card } from '@heroui/react'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookingDemo } from '../components/BookingDemo'
import { getClientBySlug } from '../data/clients'

export function DemoPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const client = getClientBySlug(clientSlug)

  useEffect(() => {
    document.title = client ? `Book with ${client.name}` : 'Demo not found'
  }, [client])

  if (!client) {
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
      <Link
        to="/"
        className="fixed left-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/60"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        All demos
      </Link>
      {/* key resets widget state when navigating between clients. */}
      <BookingDemo key={client.slug} client={client} />
    </div>
  )
}
