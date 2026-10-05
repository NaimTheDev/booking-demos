#!/usr/bin/env node
// Shrinks oversized logos in public/logos in place (same file name/format, so demo paths stay valid).
// Caps the longest side at 640px and recompresses; only overwrites when the result is smaller.
//   node .claude/skills/ohio-leads/scripts/shrink-logos.mjs [maxKB=80]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const dir = path.join(root, 'public/logos')
const maxBytes = Number(process.argv[2] || 80) * 1024
let saved = 0
for (const f of fs.readdirSync(dir)) {
  const ext = path.extname(f).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue
  const file = path.join(dir, f)
  const before = fs.statSync(file).size
  if (before <= maxBytes) continue
  let img = sharp(file).resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
  img = ext === '.png' ? img.png({ palette: true, quality: 90, compressionLevel: 9 }) : ext === '.webp' ? img.webp({ quality: 85 }) : img.jpeg({ quality: 85, mozjpeg: true })
  const buf = await img.toBuffer()
  if (buf.length < before) {
    fs.writeFileSync(file, buf)
    saved += before - buf.length
    console.log(`${f}: ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`)
  }
}
console.log(`saved ${Math.round(saved / 1024)}KB`)
