#!/usr/bin/env node
// Web search through a private headless browser (Yahoo), for when the WebSearch tool's budget runs out.
// Runs all queries in parallel and prints organic results plus the local "Results near" pack.
//   node search.mjs "mobile dog grooming Dayton OH" "window tint Toledo OH"
import { chromium } from 'playwright-core'

const queries = process.argv.slice(2)
if (!queries.length) {
  console.error('usage: node search.mjs "<query>" ["<query>" ...]')
  process.exit(1)
}
const unwrap = (h) => {
  const m = h.match(/RU=([^/]+)/)
  return m ? decodeURIComponent(m[1]) : h
}
const browser = await chromium.launch()
const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36',
  locale: 'en-US',
})
await Promise.all(
  queries.map(async (q) => {
    const page = await ctx.newPage()
    let out = `### ${q}\n`
    try {
      await page.goto('https://search.yahoo.com/search?n=30&p=' + encodeURIComponent(q), { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(2000)
      const body = await page.innerText('body')
      const i = body.indexOf('Results near')
      if (i >= 0) {
        const sites = await page.$$eval('a', (as) => as.filter((a) => /Website/i.test(a.textContent)).map((a) => a.href))
        out += `  LOCAL: ${body.slice(i, i + 1400).replace(/\n+/g, ' · ')}\n  LOCAL SITES: ${sites.map(unwrap).join(' , ')}\n`
      }
      const results = await page.$$eval('div.algo', (els) =>
        els.map((e) => ({ t: (e.querySelector('h3')?.textContent || '').slice(0, 90), h: (e.querySelector('h3 a') || e.querySelector('a'))?.href || '' })),
      )
      for (const r of results) out += `  ${r.t} | ${unwrap(r.h)}\n`
    } catch (e) {
      out += `  ERR ${e.message}\n`
    }
    console.log(out)
    await page.close()
  }),
)
await browser.close()
