#!/usr/bin/env node
// Builds nothing — run `npm run build` first. Serves dist/ with `vite preview`, opens every demo and reports
// pages that fail: "No demo" fallback, page errors, broken images (logo 404s) or failed requests.
// Saves a screenshot per demo when --shots <dir> is given (handy for eyeballing themes).
//   node .claude/skills/ohio-leads/scripts/render-check.mjs [--shots /tmp/shots] [slug ...]
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const args = process.argv.slice(2)
const si = args.indexOf('--shots')
const shots = si >= 0 ? args.splice(si, 2)[1] : null
if (shots) fs.mkdirSync(shots, { recursive: true })

const inline = [...fs.readFileSync(path.join(root, 'src/data/clients.ts'), 'utf8').matchAll(/^ {4}slug: '([^']+)'/gm)].map((m) => m[1])
const files = fs.readdirSync(path.join(root, 'src/data/demos')).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3))
const slugs = args.length ? args : [...inline, ...files]

const port = 4199
// Run vite's binary directly (not via npx) so killing it really stops the server.
const server = spawn(path.join(root, 'node_modules/.bin/vite'), ['preview', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'pipe' })
server.stderr.on('data', (d) => process.stderr.write(d))
const base = await new Promise((resolve, reject) => {
  const t = setTimeout(() => reject(new Error('vite preview did not start')), 30000)
  server.stdout.on('data', (d) => {
    const m = String(d).match(/http:\/\/localhost:\d+\/[^\s]*/)
    if (m) { clearTimeout(t); resolve(m[0].replace(/\/$/, '')) }
  })
})

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const problems = []
const queue = [...slugs]
await Promise.all(Array.from({ length: 6 }, async () => {
  const page = await ctx.newPage()
  for (let slug; (slug = queue.shift()); ) {
    const issues = []
    const onErr = (e) => issues.push('pageerror: ' + e.message.slice(0, 120))
    const onFail = (r) => { if (!/fonts\.g|google|favicon/.test(r.url())) issues.push('request failed: ' + r.url().slice(0, 100)) }
    const onResp = (r) => { if (r.status() >= 400 && /logos|assets/.test(r.url())) issues.push(`${r.status()}: ${r.url().slice(0, 100)}`) }
    page.on('pageerror', onErr); page.on('requestfailed', onFail); page.on('response', onResp)
    try {
      await page.goto(`${base}/demo/${slug}`, { waitUntil: 'networkidle', timeout: 30000 })
      const text = await page.locator('body').innerText()
      if (/No demo for/.test(text)) issues.push('renders the "No demo" fallback (missing client or theme)')
      const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')))
      for (const b of broken) issues.push('broken image: ' + b)
      if (shots) await page.screenshot({ path: path.join(shots, `${slug}.png`) })
    } catch (e) {
      issues.push('load error: ' + e.message.slice(0, 120))
    }
    page.off('pageerror', onErr); page.off('requestfailed', onFail); page.off('response', onResp)
    if (issues.length) problems.push({ slug, issues })
  }
}))
await browser.close()
server.kill()
console.log(`checked ${slugs.length} demos · ${problems.length} with problems`)
for (const p of problems) console.log(`- ${p.slug}\n    ${p.issues.join('\n    ')}`)
process.exit(problems.length ? 1 : 0)
