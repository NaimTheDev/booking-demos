---
name: ohio-leads
description: Find new local service-business leads in Ohio that lack online booking, qualify them (group A/B/C), research the owner's contact info, build a themed booking demo for each, and regenerate LEADS.md and COMPETITORS.md. Use when asked to find more leads/prospects, add demos for new businesses, check whether a business already has online booking, find who to email at a lead, or refresh the lead/competitor tables.
---

# Ohio leads → booking demos

Pipeline for turning a local service business into (1) a qualified lead record and (2) a booking-widget demo
themed after its own site. Everything a lead needs lives in two files, so many leads can be built in parallel
without touching shared code:

| File | Committed? | Holds |
|---|---|---|
| `src/data/demos/<slug>.ts` | yes (repo is public) | client config (services, prices, zones) + theme. **No owner/contact data.** |
| `public/logos/<slug>.<ext>` | yes | logo image |
| `leads/<slug>.json` | **no** (gitignored) | fit, owner contact, emails, booking-today, competitors |

`LEADS.md` and `COMPETITORS.md` are generated from `leads/*.json` — never hand-edit them.

Scripts (run from repo root; first time: `npm --prefix .claude/skills/ohio-leads/scripts install`):

- `node .claude/skills/ohio-leads/scripts/inspect.mjs <url> [--shot file.png] [--pages /about,/contact] [--no-follow]` —
  private headless Chromium (parallel-safe; don't use the shared Playwright MCP browser from subagents). Returns booking
  CTAs and follows the first one, detected booking tools, emails (visible / mailto / page source / Cloudflare-decoded),
  socials, owner phrases, logo candidates, sampled fonts/colors/buttons, and a `fitHint`. Works on Facebook pages
  (logged-out "Intro" often lists email + phone) and Instagram (bio only).
- `node .claude/skills/ohio-leads/scripts/search.mjs "<query>" ["<query>" …]` — Yahoo search in a private headless
  browser (organic results + local pack), parallel per query. The WebSearch tool has a per-session budget that a
  big run exhausts quickly; switch to this when it does.
- `node .claude/skills/ohio-leads/scripts/check.mjs` — validates demos ↔ leads, fit, duplicates (name/domain/phone/IG).
  `--taken` prints every existing lead (use it to avoid duplicates before researching).
- `node .claude/skills/ohio-leads/scripts/build-docs.mjs` — regenerates LEADS.md + COMPETITORS.md.

## 1. Find candidates

Search Google/Bing (WebSearch) for `<service> <city> OH` across the target area. Good verticals (all supported by the
widget): mobile auto detailing (`auto`), boat detailing (`marine`), RV washing (`rv`), stone/marble restoration
(`stone`), mobile mechanics (`mechanic`), mobile/salon pet grooming (`pet`), window tint / wraps / PPF (`tint`),
pressure washing / soft washing (`exterior`), locksmiths (`locksmith`); `multi` when services span categories
(tag each service with `category`). Don't add new verticals without also updating `Vertical`, `CATEGORY_LABELS`,
`SIZE_TIERS` and `VerticalIcon` — subagents must stick to the existing ones.

Prefer owner-operated local businesses with a real website (or an active IG/FB page) and published services. Skip
franchises/national chains, lead-gen/referral sites, and anything already in `check.mjs --taken`.

## 2. Qualify — keep only A and B

Run `inspect.mjs` on the homepage, then judge (the `fitHint` is only a hint):

- **A** — has a "Book / Schedule" button, but it only opens a contact form, a call-back promise, a phone number, or DMs.
  The widget is a direct upgrade. Best leads.
- **B** — no booking at all: quote form, phone, email or "DM us" only.
- **C — drop.** Customer can pick a service/time online: any booking tool (Square, Acuity, Setmore, Calendly, Jobber
  client hub, Housecall Pro, Urable, OrbisX booking, Wix Bookings, MoeGo, Time To Pet, Booksy, Vagaro, GoHighLevel
  calendars…) or a custom self-serve flow ("Step 1 of 5", date/time pickers, live totals). Also check the business's
  Facebook page — e.g. a Jobber work-request link there counts. Gift-card-only use of a tool does not make it C.

**Always check the business's Facebook page too** (`inspect.mjs <facebook url> --no-follow`; if it bounces to a
login wall, retry with `https://m.facebook.com/<page>`): an "Online booking"
button or a Jobber/booking link in the Intro makes it C even when the website has no booking. When you drop a
business that someone might find again (especially one dropped by the user), add it to `leads/_dropped.json`
(`{ "name", "domain", "reason" }`) — `check.mjs` errors if a dropped business comes back, and `--taken` lists them.

Record what "booking today" looks like in one line (e.g. `"BOOK NOW" → contact form, calls back within 24h`).

## 3. Contact research

Goal: the person most likely to answer an email (owner/founder, else a manager) + the best email.
Sources, in order: the site's About/Team/Contact/privacy-policy pages (`--pages /about,/contact,/privacy-policy`),
page source (inspect shows it), the business's Facebook page Intro, Instagram bio, BBB profile (lists owner),
LinkedIn, Ohio SOS filings, local news. Only publicly published **business** contact info — no home addresses,
personal cell numbers or family details. **Never guess an email pattern.** Tag every email with its source
(`site`, `page source`, `facebook`, `instagram`, `bbb`, …) and give the name a confidence (`high`/`medium`/`low`).

## 4. Competitors

For each lead, list 1–3 nearby businesses in the same vertical that **do** offer online booking, verified with
`inspect.mjs` (record the tool it found). Reuse competitors already in `leads/*.json` when they're close enough
(same metro + vertical). If none exist, leave `competitors: []` and say who you checked in `competitorsNote` —
"no local rival books online" is a selling point.

## 5. Build the demo

1. Collect services, prices, add-ons, size tiers and service area from the site's service/pricing pages.
   Prices come only from the business — `price: null` when unpublished (shows as custom quote); use `priceBySize`
   for exact per-size prices and `startingAt` for "starting at". Per-foot rates (boats/RVs): `priceUnit: 'per-foot'`
   with the published rate as `price`, and size tiers carrying `referenceFeet` (see `gks` in clients.ts) — never
   bake a guessed length into a flat price. Different rates per length band: `priceBySize` with each band's minimum
   (rate × shortest length) and `startingAt: true`. Leave out services they don't offer.
   Durations are estimates unless published. `freeRadiusZones`: their published service area (cities/ZIPs).
2. Logo: download the header logo (inspect lists candidates; IG/FB profile picture if no site) to
   `public/logos/<slug>.<ext>` with `curl -L`. Check it with the Read tool (it renders images). Set
   `logo.background` to a plate color it reads on. Omit `logo` if there's nothing usable.
3. Theme: run `inspect.mjs --shot /tmp/…/<slug>.png`, look at the screenshot, and mirror the site — fonts
   (Google Fonts specs; Arial/Helvetica sites use the Arimo fallback like `kc-auto` in `src/data/themes.ts`),
   colors, button radius/case, header colors, hero headline. For IG-only businesses, theme from the logo/posts.
   `src/data/themes.ts` has 15 worked examples; the type docs there explain every field.
4. Write `src/data/demos/<slug>.ts` — copy `src/data/demos/wolf-pack-wraps.ts` as the template (default export
   `{ client, theme } satisfies DemoEntry`). File name must equal the slug. Region by ZIP prefix:
   `northeast-ohio` 440–449 · `northwest-ohio` 434–436, 458 · `central-ohio` 430–433 · `southwest-ohio` 450–455 ·
   `southeast-ohio` 437–439, 456–457. Service/add-on ids: short slug prefix (`wp-wrap`).
5. Write `leads/<slug>.json`:

```json
{
  "slug": "wolf-pack-wraps",
  "name": "Wolf Pack Wraps",
  "website": null,
  "instagram": "wolfpackwraps",
  "facebook": null,
  "city": "Columbus",
  "region": "central-ohio",
  "vertical": "tint",
  "fit": "B",
  "bookingToday": "Instagram only — bio says \"DM for scheduling\"",
  "contact": { "name": "Jane Doe", "role": "Owner", "confidence": "high", "sources": ["https://www.instagram.com/wolfpackwraps/"] },
  "emails": [{ "address": "info@example.com", "source": "site" }],
  "phone": "614-555-0100",
  "contactForm": null,
  "notes": ["One-line facts useful for personalizing the email."],
  "competitors": [{ "name": "…", "url": "https://…", "tool": "Square Appointments", "city": "Hilliard" }],
  "competitorsNote": "Only when competitors is empty: who was checked.",
  "researched": "YYYY-MM-DD"
}
```

## 6. Finish

`node .claude/skills/ohio-leads/scripts/shrink-logos.mjs` (caps logos at 640px / ~80KB) ·
`npx tsc -b && npm run lint` · `node .claude/skills/ohio-leads/scripts/check.mjs` (fix every ERROR) ·
`node .claude/skills/ohio-leads/scripts/build-docs.mjs` · spot-check a few demos with `npm run dev` at
`/demo/<slug>`. Dropping a lead (e.g. it turned out to be C): delete its demo file, logo and lead JSON together.

## Scaling with subagents

Split by geography (one metro/area per agent) so agents don't research the same businesses; give each agent the
`check.mjs --taken` list and a target count. Each agent writes only its own `src/data/demos/<slug>.ts`,
`public/logos/<slug>.*` and `leads/<slug>.json`, uses `inspect.mjs` (never the shared Playwright MCP browser), and
must not edit shared files (`clients.ts`, `themes.ts`, `booking.ts`, components). Run check/build-docs once at the end.
