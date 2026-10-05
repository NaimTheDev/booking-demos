#!/usr/bin/env node
// Consistency check between demos and lead records.
//   node .claude/skills/ohio-leads/scripts/check.mjs           → report + exit 1 on errors
//   node .claude/skills/ohio-leads/scripts/check.mjs --taken   → names/domains/phones already used (for dedupe)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const leadsDir = path.join(root, 'leads')
const leads = fs.existsSync(leadsDir) ? fs.readdirSync(leadsDir).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(path.join(leadsDir, f), 'utf8')) })) : []

// Demo slugs: inline ones in clients.ts plus one file per demo in src/data/demos.
const inline = [...fs.readFileSync(path.join(root, 'src/data/clients.ts'), 'utf8').matchAll(/^ {4}slug: '([^']+)'/gm)].map((m) => m[1])
const demoDir = path.join(root, 'src/data/demos')
const files = fs.existsSync(demoDir) ? fs.readdirSync(demoDir).filter((f) => f.endsWith('.ts')) : []
const fileSlugs = files.map((f) => {
  const src = fs.readFileSync(path.join(demoDir, f), 'utf8')
  return { file: f, slug: src.match(/slug: '([^']+)'/)?.[1] }
})
const demos = [...inline, ...fileSlugs.map((f) => f.slug)]

const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const domain = (u) => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' } }
const digits = (p) => (p || '').replace(/\D/g, '').slice(-10)

// Businesses dropped on purpose (usually group C). Never re-add them as leads.
const droppedFile = path.join(leadsDir, '_dropped.json')
const dropped = fs.existsSync(droppedFile) ? JSON.parse(fs.readFileSync(droppedFile, 'utf8')) : []

if (process.argv.includes('--taken')) {
  for (const d of dropped) console.log(['DROPPED', d.name, d.domain || '', d.reason].join('\t'))
  for (const l of leads.sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name)))
    console.log([l.region, l.slug, l.name, domain(l.website) || (l.instagram ? 'ig:' + l.instagram : ''), digits(l.phone)].join('\t'))
  process.exit(0)
}

const errors = []
const warn = []
for (const f of fileSlugs) if (f.file !== `${f.slug}.ts`) errors.push(`demo file ${f.file} has slug '${f.slug}' (file name must match)`)
for (const s of demos) if (!leads.some((l) => l.slug === s)) errors.push(`demo '${s}' has no leads/${s}.json`)
for (const l of leads) {
  if (l.file !== `${l.slug}.json`) errors.push(`${l.file}: slug '${l.slug}' doesn't match file name`)
  if (!demos.includes(l.slug)) errors.push(`lead '${l.slug}' has no demo`)
  if (!['A', 'B'].includes(l.fit)) errors.push(`${l.slug}: fit must be A or B (group C leads are dropped), got '${l.fit}'`)
  for (const k of ['name', 'city', 'region', 'vertical', 'bookingToday']) if (!l[k]) errors.push(`${l.slug}: missing ${k}`)
  if (!l.website && !l.instagram && !l.facebook) errors.push(`${l.slug}: needs website, instagram or facebook`)
  if (!l.contact?.name) warn.push(`${l.slug}: no contact name`)
  if (!l.emails?.length && !l.contactForm) warn.push(`${l.slug}: no email or contact form`)
  for (const e of l.emails || []) if (!e.source) errors.push(`${l.slug}: email ${e.address} needs a source`)
}
for (const l of leads) {
  const hit = dropped.find((d) => norm(d.name) === norm(l.name) || (d.domain && d.domain === domain(l.website)))
  if (hit) errors.push(`${l.slug}: '${hit.name}' was dropped (${hit.reason}) — remove it or delete it from leads/_dropped.json`)
}
const dupes = (key, label) => {
  const seen = new Map()
  for (const l of leads) {
    const k = key(l)
    if (!k) continue
    if (seen.has(k)) errors.push(`duplicate ${label}: ${seen.get(k)} and ${l.slug} (${k})`)
    else seen.set(k, l.slug)
  }
}
dupes((l) => norm(l.name), 'name')
dupes((l) => domain(l.website), 'domain')
dupes((l) => digits(l.phone), 'phone')
dupes((l) => norm(l.instagram), 'instagram')

const byRegion = {}
for (const l of leads) byRegion[l.region] = (byRegion[l.region] || 0) + 1
console.log(`demos: ${demos.length} · leads: ${leads.length} · A: ${leads.filter((l) => l.fit === 'A').length} · B: ${leads.filter((l) => l.fit === 'B').length}`)
console.log('by region:', JSON.stringify(byRegion))
for (const w of warn) console.log('warn:', w)
for (const e of errors) console.log('ERROR:', e)
process.exit(errors.length ? 1 : 0)
