#!/usr/bin/env node
// Inspect a business website (or Facebook/Instagram page) in its own headless Chromium.
// Safe to run many in parallel — each call launches a private browser.
//
//   node inspect.mjs <url> [--shot out.png] [--pages /about,/contact] [--no-follow]
//
// Prints JSON: booking CTAs (followed to see what "Book Now" really does), detected booking
// tools, emails (visible, mailto, page source, Cloudflare-obfuscated), social links, owner-ish
// phrases, logo candidates and a sampled theme (fonts, colors, button/header styles).
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const url = args.find((a) => /^https?:\/\//.test(a))
if (!url) {
  console.error('usage: node inspect.mjs <url> [--shot out.png] [--pages /about,/contact] [--no-follow]')
  process.exit(1)
}
const opt = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const shot = opt('--shot')
const extraPages = (opt('--pages') || '').split(',').filter(Boolean)
const follow = !args.includes('--no-follow')

// Hostname/path fragments of booking & field-service tools. A site using one of these for
// self-serve booking is group C (already has online booking).
const PROVIDERS = {
  setmore: /setmore\.com/, calendly: /calendly\.com/, acuity: /acuityscheduling|as\.me\//, square: /squareup\.com\/appointments|square\.site|book\.squareup/,
  jobber: /getjobber\.com|clienthub\.getjobber/, housecallpro: /housecallpro\.com/, urable: /urable\.com/, booksy: /booksy\.com/,
  vagaro: /vagaro\.com/, timetopet: /timetopet\.com/, mindbody: /mindbodyonline|mindbody\.io/, servicetitan: /servicetitan/,
  orbisx: /orbisx\.ca/, mobiletech: /mobile-tech\.app|mobiletech/, fieldd: /fieldd\.co/, bookingkoala: /bookingkoala/,
  launch27: /launch27/, simplybook: /simplybook/, youcanbook: /youcanbook\.me/, wixbookings: /wix.*bookings|\/book-online|\/booking-calendar/,
  schedulicity: /schedulicity/, tidycal: /tidycal/, zenbooker: /zenbooker/, workiz: /workiz/, markate: /markate/,
  servicem8: /servicem8/, appointy: /appointy/, picktime: /picktime/, fresha: /fresha\.com/, gingr: /gingrapp/,
  moego: /moego\.pet/, petexec: /petexec/, tintwiz: /tintwiz/, shopmonkey: /shopmonkey/, tekmetric: /tekmetric/,
  autoleap: /autoleap/, leadconnector: /leadconnectorhq|msgsndr|gohighlevel/, podium: /podium\.com/, thryv: /thryv/,
  broadly: /broadly\.com/, gorilladesk: /gorilladesk/, quotemachine: /quote-machine|quotemachine/, booker: /booker\.com/,
  hubspotmeetings: /meetings\.hubspot/, googlecalendar: /calendar\.google\.com\/calendar\/appointments/, getsquire: /getsquire/,
  joinposter: /joinposter/, lawnstarter: /lawnstarter/, responsibid: /responsibid/, rebook: /\/rebook/,
  godaddyappointments: /godaddy.*appointments|secureserver.*(booking|appointments)|\/m\/appointments/, daysmart: /daysmart|petza|123pet/,
  navigroom: /navigroom/, groomore: /groomore/, goldie: /heygoldie|goldie\.app/, detailbookie: /detailbookie/, appointfix: /appointfix/,
  booker2: /booker\.com|go\.booker/, wixbookings2: /_api\/bookings|bookings-widget/,
}
const CTA_RE = /book|schedul|appoint|reserv|quote|estimate|get started|request service/i
const SOCIAL_RE = /facebook\.com|instagram\.com|linkedin\.com|tiktok\.com|linktr\.ee|youtube\.com/i
const SELF_SERVE_RE = /select (a )?(date|time)|choose (a )?(date|time)|available (times|slots)|pick a time|time slots?|select service|step 1 of|add to cart|checkout|reserve your spot|confirm (my )?appointment|calendar/i

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36',
})
const page = await ctx.newPage()
const providerHits = (urls) => {
  const hits = new Set()
  for (const u of urls) for (const [name, re] of Object.entries(PROVIDERS)) if (re.test(u)) hits.add(name)
  return [...hits]
}

async function load(u) {
  await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(3500)
  // Trigger lazy-loaded widgets.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {})
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {})
}

async function scan() {
  const data = await page.evaluate(
    ({ ctaSrc, socialSrc }) => {
      const CTA = new RegExp(ctaSrc, 'i')
      const SOCIAL = new RegExp(socialSrc, 'i')
      const els = [...document.querySelectorAll('a,button,[role=button]')]
      const ctas = []
      for (const e of els) {
        const text = (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50)
        const href = e.getAttribute('href') || ''
        let path = href
        try {
          const u = new URL(href, location.href)
          // Match on the path only, so "facebook.com" never counts as a "book" link.
          path = u.hostname === location.hostname ? u.pathname + u.search : u.pathname + u.search + ' @' + u.hostname
          if (SOCIAL.test(u.hostname)) continue
        } catch {}
        if (CTA.test(text) || CTA.test(path)) ctas.push({ text, href: href ? new URL(href, location.href).href : '' })
      }
      const uniq = [...new Map(ctas.map((c) => [c.text + '|' + c.href, c])).values()].slice(0, 15)
      const assets = [...document.querySelectorAll('iframe[src],script[src],a[href],form[action],link[href]')].map(
        (e) => e.src || e.href || e.action || '',
      )
      const html = document.documentElement.innerHTML
      const text = document.body?.innerText || ''
      const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
      const junk = /\.(png|jpe?g|webp|svg|gif|avif|css|js)$|sentry|wixpress|example\.|your@|youremail|domain\.com|email\.com|@2x|@3x|godaddy|astigmatic|squarespace\.com|wix\.com|schema\.org|w3\.org/i
      const emails = { visible: [], mailto: [], source: [], cloudflare: [] }
      emails.visible = [...new Set(text.match(EMAIL) || [])].filter((e) => !junk.test(e))
      emails.mailto = [...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map((a) => decodeURIComponent(a.href.slice(7).split('?')[0])))]
      emails.source = [...new Set(html.match(EMAIL) || [])].filter((e) => !junk.test(e) && !emails.visible.includes(e) && !emails.mailto.includes(e))
      document.querySelectorAll('[data-cfemail]').forEach((el) => {
        const c = el.getAttribute('data-cfemail')
        const k = parseInt(c.substr(0, 2), 16)
        let s = ''
        for (let i = 2; i < c.length; i += 2) s += String.fromCharCode(parseInt(c.substr(i, 2), 16) ^ k)
        emails.cloudflare.push(s)
      })
      const socials = [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => SOCIAL.test(h) && !/sharer|share\?|intent\//.test(h)))].slice(0, 10)
      const phones = [...new Set(text.match(/\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g) || [])].slice(0, 5)
      const people = [...new Set(text.match(/(owner|founder|co-founder|founded by|president|ceo|operator|my name is|meet [A-Z][a-z]+)[^.\n]{0,90}/gi) || [])].slice(0, 8)
      return { title: document.title, ctas: uniq, assets, emails, socials, phones, people, textSample: text.replace(/\s+/g, ' ').slice(0, 700) }
    },
    { ctaSrc: CTA_RE.source, socialSrc: SOCIAL_RE.source },
  )
  data.frames = page.frames().map((f) => f.url()).filter((u) => u && u !== 'about:blank' && !/doubleclick|google\.com\/recaptcha|googletagmanager|facebook\.com\/tr/.test(u))
  data.providers = providerHits([...data.assets, ...data.frames])
  delete data.assets
  return data
}

async function theme() {
  return page.evaluate(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null)
    const pick = (el) => {
      const s = cs(el)
      if (!s) return null
      return { font: s.fontFamily, weight: s.fontWeight, size: s.fontSize, color: s.color, transform: s.textTransform, spacing: s.letterSpacing }
    }
    const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 }
    const h1 = [...document.querySelectorAll('h1')].find(visible)
    const h2 = [...document.querySelectorAll('h2,h3')].find(visible)
    const header = document.querySelector('header') || document.querySelector('nav')
    const buttons = [...document.querySelectorAll('a,button')].filter((e) => {
      if (!visible(e)) return false
      const s = getComputedStyle(e)
      return s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent' && (e.innerText || '').trim().length > 2
    }).slice(0, 4).map((e) => {
      const s = getComputedStyle(e)
      return { text: e.innerText.trim().slice(0, 30), bg: s.backgroundColor, fg: s.color, radius: s.borderRadius, transform: s.textTransform, weight: s.fontWeight, font: s.fontFamily, spacing: s.letterSpacing }
    })
    const imgs = [...document.querySelectorAll('img,svg')].filter((i) => {
      const id = ((i.getAttribute('src') || '') + ' ' + (i.getAttribute('alt') || '') + ' ' + (i.getAttribute('class') || '') + ' ' + (i.closest('a')?.getAttribute('href') || '')).toLowerCase()
      return visible(i) && (id.includes('logo') || i.closest('header') || i.closest('[class*=logo]'))
    }).slice(0, 5).map((i) => ({ src: i.currentSrc || i.src || '(inline svg)', alt: i.getAttribute('alt'), w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }))
    const fonts = [...document.querySelectorAll('link[href*="fonts.googleapis"]')].map((l) => l.href)
    const og = document.querySelector('meta[property="og:image"]')?.content
    const icon = document.querySelector('link[rel*="icon"]')?.href
    // Most common non-white/black background colors among large elements.
    const counts = {}
    for (const el of document.querySelectorAll('section,header,footer,div,nav')) {
      const r = el.getBoundingClientRect()
      if (r.width < 300 || r.height < 40) continue
      const bg = getComputedStyle(el).backgroundColor
      if (bg === 'rgba(0, 0, 0, 0)') continue
      counts[bg] = (counts[bg] || 0) + Math.round((r.width * r.height) / 1000)
    }
    const bgs = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c]) => c)
    return {
      body: { ...pick(document.body), bg: cs(document.body).backgroundColor },
      h1: h1 ? { text: h1.innerText.trim().slice(0, 80), ...pick(h1) } : null,
      h2: h2 ? { text: h2.innerText.trim().slice(0, 60), ...pick(h2) } : null,
      header: header ? { bg: cs(header).backgroundColor, color: cs(header).color, position: cs(header).position } : null,
      buttons, bgs, googleFonts: fonts, logos: imgs, ogImage: og, favicon: icon,
    }
  })
}

const out = { input: url }
try {
  await load(url)
  out.finalUrl = page.url()
  out.home = await scan()
  if (!/facebook|instagram/.test(url)) out.theme = await theme()
  if (shot) await page.screenshot({ path: shot })

  for (const p of extraPages) {
    try {
      await load(new URL(p, out.finalUrl).href)
      const s = await scan()
      out[p] = { url: page.url(), emails: s.emails, people: s.people, phones: s.phones, providers: s.providers, textSample: s.textSample }
    } catch (e) {
      out[p] = 'ERR ' + e.message.slice(0, 100)
    }
  }

  // Follow the first real booking CTA to see whether it's self-serve or just a form.
  if (follow) {
    const cta = out.home.ctas.find((c) => /book|schedul|appoint|reserv/i.test(c.text + ' ' + c.href) && c.href && !/^(tel|mailto|sms):/.test(c.href) && !c.href.endsWith('#'))
      || out.home.ctas.find((c) => c.href && !/^(tel|mailto|sms):/.test(c.href))
    if (cta) {
      try {
        if (cta.href.split('#')[0] !== out.finalUrl.split('#')[0]) await load(cta.href)
        const s = await scan()
        const body = (await page.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ')
        out.followed = {
          cta: cta.text,
          url: page.url(),
          providers: s.providers,
          frames: s.frames.slice(0, 6),
          selfServeSignals: [...new Set(body.match(new RegExp(SELF_SERVE_RE.source, 'gi')) || [])].slice(0, 6),
          hasForm: await page.locator('form input, form textarea').count().then((n) => n > 0).catch(() => false),
          textSample: body.slice(0, 600),
        }
      } catch (e) {
        out.followed = 'ERR ' + e.message.slice(0, 100)
      }
    }
  }
} catch (e) {
  out.error = e.message.slice(0, 200)
}
await browser.close()

// Verdict hint (the agent still judges): C = any booking tool or self-serve flow found.
const allProviders = new Set([...(out.home?.providers || []), ...(out.followed?.providers || [])])
const selfServe = (out.followed?.selfServeSignals || []).length > 0
out.fitHint = out.error ? 'unknown' : allProviders.size || selfServe ? 'C? (booking tool or self-serve flow — verify)' : (out.home?.ctas || []).some((c) => /book|schedul|appoint/i.test(c.text)) ? 'A? (has a Book CTA without a booking tool)' : 'B? (no booking CTA)'
out.providersFound = [...allProviders]
console.log(JSON.stringify(out, null, 2))
