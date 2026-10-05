#!/usr/bin/env node
// Regenerates LEADS.md and COMPETITORS.md (both gitignored) from leads/*.json.
//   node .claude/skills/ohio-leads/scripts/build-docs.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const dir = path.join(root, 'leads')
const leads = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))

const DEMO = 'https://naimthedev.github.io/booking-demos/demo/'
const REGIONS = [
  ['northeast-ohio', 'Northeast Ohio (Cleveland, Akron, Canton, Youngstown)'],
  ['northwest-ohio', 'Northwest Ohio (Toledo, Sandusky, Findlay, Lima)'],
  ['central-ohio', 'Central Ohio (Columbus)'],
  ['southwest-ohio', 'Southwest Ohio (Cincinnati, Dayton)'],
  ['southeast-ohio', 'Southeast Ohio'],
]
const FIT = {
  A: 'A — "Book" button exists but only opens a form / call-back / DM (widget is a direct upgrade)',
  B: 'B — No booking at all: quote form, phone or DMs only',
}
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const link = (label, url) => (url ? `[${cell(label)}](${url})` : cell(label))
const contact = (l) => {
  const c = l.contact || {}
  const name = c.name ? `${c.name}${c.role ? `, ${c.role}` : ''}` : 'Not found'
  return `${name}${c.confidence && c.confidence !== 'high' ? ` _(${c.confidence})_` : ''}`
}
const emails = (l) => (l.emails?.length ? l.emails.map((e) => `${e.address}${e.source && e.source !== 'site' ? ` _(${e.source})_` : ''}`).join('<br>') : l.contactForm ? link('form', l.contactForm) : '—')
const site = (l) => (l.website ? link(l.name, l.website) : l.instagram ? link(`${l.name} (IG)`, `https://instagram.com/${l.instagram.replace(/^@/, '')}`) : cell(l.name))

const today = new Date().toISOString().slice(0, 10)
let out = `# Lead Contacts\n\nGenerated ${today} from \`leads/*.json\` by \`.claude/skills/ohio-leads/scripts/build-docs.mjs\` — edit the JSON, not this file.\n`
out += `Emails are only listed where the business publishes them (site, page source, Facebook or Instagram); none are guessed.\n\n`
out += `**${leads.length} leads** · A: ${leads.filter((l) => l.fit === 'A').length} · B: ${leads.filter((l) => l.fit === 'B').length}\n`
for (const [region, label] of REGIONS) {
  const rl = leads.filter((l) => l.region === region)
  if (!rl.length) continue
  out += `\n## ${label} · ${rl.length}\n`
  for (const fit of ['A', 'B']) {
    const fl = rl.filter((l) => l.fit === fit).sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
    if (!fl.length) continue
    out += `\n**${FIT[fit]}**\n\n| Business | City | Contact | Email | Phone | Booking today | Demo |\n|---|---|---|---|---|---|---|\n`
    for (const l of fl) out += `| ${site(l)} | ${cell(l.city)} | ${cell(contact(l))} | ${emails(l)} | ${cell(l.phone || '—')} | ${cell(l.bookingToday)} | [demo](${DEMO}${l.slug}) |\n`
  }
}
const noted = leads.filter((l) => l.notes?.length)
if (noted.length) {
  out += `\n## Notes\n\n`
  for (const l of noted.sort((a, b) => a.name.localeCompare(b.name))) out += `- **${l.name}:** ${l.notes.join(' ')}\n`
}
fs.writeFileSync(path.join(root, 'LEADS.md'), out)

let comp = `# Local Competitors Already Offering Online Booking\n\nGenerated ${today} from \`leads/*.json\`. A competitor is listed only if its site lets a customer\n**pick a service and book online** (booking tool verified on the page). Contact-form / quote / phone-only sites are excluded.\n\nDemo base URL: \`${DEMO}<slug>\`\n`
const none = []
for (const [region, label] of REGIONS) {
  const rl = leads.filter((l) => l.region === region).sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
  if (!rl.length) continue
  comp += `\n## ${label}\n\n| Lead (original site) | Local competitor w/ online booking | Booking tool seen | Booking demo |\n|---|---|---|---|\n`
  for (const l of rl) {
    const cs = l.competitors?.length ? l.competitors : [{ name: '**None found.**', url: '', tool: '—', note: l.competitorsNote }]
    if (!l.competitors?.length) none.push(l.name)
    cs.forEach((c, i) => {
      const lead = i === 0 ? `${site(l)} — ${cell(l.city)}` : ''
      const name = c.url ? link(c.name, c.url) : cell(c.name)
      comp += `| ${lead} | ${name}${c.city ? ` (${cell(c.city)})` : ''}${c.note ? ` ${cell(c.note)}` : ''} | ${cell(c.tool)} | ${i === 0 ? `[demo](${DEMO}${l.slug})` : ''} |\n`
    })
  }
}
if (none.length) comp += `\n## Notes\n\n- **No local competitor with online booking found for:** ${none.join(', ')} — the demo puts them ahead of every local rival.\n`
fs.writeFileSync(path.join(root, 'COMPETITORS.md'), comp)
console.log(`Wrote LEADS.md and COMPETITORS.md for ${leads.length} leads`)
