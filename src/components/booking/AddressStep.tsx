import { Alert, Chip, Description, Input, Label, TextField } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, ShieldAlert, Truck } from 'lucide-react'
import type { ClientConfig } from '../../data/clients'
import type { AddressStatus } from '../../lib/booking'

interface AddressStepProps {
  client: ClientConfig
  address: string
  onAddressChange: (value: string) => void
  status: AddressStatus
}

export function AddressStep({ client, address, onAddressChange, status }: AddressStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <TextField fullWidth value={address} onChange={onAddressChange} autoFocus>
        <Label className="flex items-center gap-1.5">
          <MapPin className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />
          Service address or ZIP code
        </Label>
        <Input placeholder={`e.g. ${client.address}`} autoComplete="street-address" />
        <Description>We'll confirm your location is inside our free service radius.</Description>
      </TextField>

      <AnimatePresence mode="wait">
        {status === 'verified' && (
          <motion.div
            key="verified"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>✓ Address Verified! Mobile service available at your address.</Alert.Title>
                <Alert.Description>
                  You're inside {client.name}'s home service area — no travel fees.
                </Alert.Description>
              </Alert.Content>
            </Alert>
          </motion.div>
        )}
        {status === 'outside' && (
          <motion.div
            key="outside"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Alert status="warning">
              <Alert.Indicator>
                <ShieldAlert className="size-5" aria-hidden="true" />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title>Just outside our free radius</Alert.Title>
                <Alert.Description>
                  You can still book — a small travel fee will be confirmed by text before your
                  appointment.
                </Alert.Description>
              </Alert.Content>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        <p className="brand-label flex items-center gap-1.5 text-xs">
          <Truck className="size-3.5" aria-hidden="true" /> Free service zones
        </p>
        <div className="flex flex-wrap gap-2">
          {client.freeRadiusZones.map((zone) => (
            <Chip key={zone} size="sm" variant="secondary">
              {zone}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
