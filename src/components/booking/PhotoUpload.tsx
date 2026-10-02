import { Camera, X } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'

export const MAX_PHOTOS = 4

interface PhotoUploadProps {
  photos: File[]
  onChange: (photos: File[]) => void
}

export function PhotoUpload({ photos, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const previews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos])

  // Object URLs hold the file in memory until revoked.
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews])

  function handleFiles(files: FileList | null) {
    if (!files) return
    const images = [...files].filter((f) => f.type.startsWith('image/'))
    onChange([...photos, ...images].slice(0, MAX_PHOTOS))
    // Reset so picking the same file again still fires onChange.
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-1.5 text-sm font-medium">
        <Camera className="size-4 text-[var(--brand-accent)]" aria-hidden="true" />
        Add photos <span className="font-normal text-muted">(optional)</span>
      </p>
      <p className="text-xs text-muted">Helps us prep and quote accurately. Up to {MAX_PHOTOS} photos.</p>
      <div className="flex flex-wrap gap-2">
        {previews.map((url, i) => (
          <div key={url} className="relative size-20 overflow-hidden rounded-xl border border-border">
            <img src={url} alt={`Upload ${i + 1}`} className="size-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(photos.filter((_, j) => j !== i))}
              aria-label={`Remove photo ${i + 1}`}
              className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <label className="flex size-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-surface-secondary text-xs text-muted hover:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-accent)]">
            <Camera className="size-5" aria-hidden="true" />
            Add
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              aria-label="Add photos"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        )}
      </div>
    </div>
  )
}
