import { demoEntries } from './clients'

/*
 * Per-client visual themes, sampled from each business's live homepage
 * (computed fonts, colors, button shapes and header layout) so the widget
 * reads as part of their site rather than a generic template.
 */

export interface TypeStyle {
  font: string
  weight: number
  case?: 'none' | 'uppercase'
  /** CSS letter-spacing, e.g. '-0.02em'. */
  tracking?: string
  color?: string
}

export interface ClientTheme {
  /** Google Fonts css2 `family=` specs to load, e.g. 'Mulish:wght@400;700;800'. */
  googleFonts: string[]
  mode: 'light' | 'dark'
  /** Hero headline. */
  display: TypeStyle
  /** Step titles and card titles. */
  heading: TypeStyle
  body: { font: string }
  /** Eyebrows, section labels, step names. */
  label: TypeStyle
  /** Card and field corner radius in px. */
  radius: number
  colors: {
    page: string
    surface: string
    surfaceAlt: string
    text: string
    muted: string
    border: string
    /** Selection borders, active step, radio fills. */
    brand: string
    /** Text on a `brand` fill. */
    brandFg: string
    /** Small icons. */
    accent: string
  }
  button: {
    bg: string
    fg: string
    /** px; 999 for pill buttons. */
    radius: number
    case?: 'none' | 'uppercase'
    tracking?: string
    weight: number
    font?: string
  }
  hero: HeroConfig
}

export interface HeroConfig {
  /** Thin utility strip above the header (phone, address, promo). */
  topBar?: { bg: string; fg: string; items: string[]; align?: 'between' | 'center' | 'start'; uppercase?: boolean }
  nav: {
    bg: string
    fg: string
    borderColor?: string
    /** Text wordmark for sites without a logo image. */
    wordmark?: string
    /** e.g. 'brightness(0) invert(1)' to show a dark logo on a dark header. */
    logoFilter?: string
    /** Solid brand block behind the logo (e.g. Snap & Crack's yellow tile). */
    logoPlate?: string
    /** 'lg' for square badge logos that read too small at the default height. */
    logoSize?: 'md' | 'lg'
    /** Right-hand header item. */
    action?: { label: string; href: string; style: 'button' | 'outline' | 'text'; color?: string }
  }
  /**
   * 'banner': full-width hero band with the booking card below.
   * 'panel': the site's centered content panel (logo, phone, headline) floats on the page background.
   */
  layout: 'banner' | 'panel'
  background: string
  fg: string
  align: 'left' | 'center'
  eyebrow?: {
    text: string
    style: 'pill' | 'badge' | 'mono' | 'italic' | 'caps' | 'script'
    /** Font family for the 'script' style. */
    font?: string
    color?: string
  }
  /** Lighter line shown above the headline. */
  kicker?: string
  headline: string
  /** Headline color when it differs from the hero text color. */
  headlineColor?: string
  /** Trailing word(s) of the headline set in `highlightColor`. */
  highlight?: string
  highlightColor?: string
  /** Put the highlighted words on their own line. */
  highlightOnNewLine?: boolean
  /** Lighter second line under the headline. */
  subline?: string
  sub?: string
  ornament?: 'rule' | 'frame'
  ornamentColor?: string
  size: 'md' | 'lg' | 'xl'
  /** Pull the booking card up over the hero. */
  overlap: boolean
  /** Translucent box behind the hero copy, like a text panel over a photo. */
  box?: string
}

// Arimo is metric-compatible with Arial/Helvetica, for machines (e.g. Linux) that have neither.
const HELVETICA = '"Helvetica Neue", Helvetica, Arial, Arimo'
const ARIAL = 'Arial, Helvetica, Arimo'
const ARIMO = 'Arimo:ital,wght@0,400;0,500;0,700;1,700'

const baseThemes: Record<string, ClientTheme> = {
  // gkspolishing.com — WordPress/The7: red utility bar, white header, Saira Condensed hero in a red frame.
  gks: {
    googleFonts: ['Saira+Condensed:wght@600;700', 'Roboto+Condensed:wght@500;600;700', 'Roboto:wght@400;500;700'],
    mode: 'light',
    display: { font: '"Saira Condensed"', weight: 600, tracking: '0' },
    heading: { font: '"Roboto Condensed"', weight: 600, color: '#444444' },
    body: { font: 'Roboto' },
    label: { font: '"Roboto Condensed"', weight: 600, case: 'uppercase', tracking: '0.06em' },
    radius: 0,
    colors: {
      page: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F3F3',
      text: '#333333',
      muted: '#777777',
      border: '#DDDDDD',
      brand: '#C92A2A',
      brandFg: '#FFFFFF',
      accent: '#BF2B2B',
    },
    button: { bg: '#D90000', fg: '#FFFFFF', radius: 5, weight: 500 },
    hero: {
      topBar: {
        bg: '#C92A2A',
        fg: '#FFFFFF',
        items: ['Text or Call 440.937.4457', '1215 Lear Industrial Parkway, Avon, OH 44011'],
      },
      nav: { bg: '#FFFFFF', fg: '#444444', action: { label: 'Contact Us', href: 'tel:4409374457', style: 'text' } },
      layout: 'banner',
      background: 'linear-gradient(rgba(17,17,17,0.55), rgba(17,17,17,0.55)), #5A5A5A',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Book Your Detail or Restoration',
      sub: 'Cars, boats, stone, tile and concrete — one call does it all.',
      ornament: 'frame',
      ornamentColor: '#C92A2A',
      size: 'lg',
      overlap: false,
    },
  },

  // dynamiccardetail.com — black & white photo backdrop, translucent white panels, uppercase Arial, red mark.
  'dynamic-detail': {
    googleFonts: [ARIMO],
    mode: 'light',
    display: { font: ARIAL, weight: 700, case: 'uppercase', tracking: '0.01em', color: '#000000' },
    heading: { font: ARIAL, weight: 700, case: 'uppercase', color: '#222222' },
    body: { font: ARIAL },
    label: { font: ARIAL, weight: 400, case: 'uppercase', tracking: '0.02em', color: '#474747' },
    radius: 0,
    colors: {
      page: 'radial-gradient(ellipse 70% 60% at 75% 15%, #4a4a4a 0%, #1a1a1a 45%, #020202 100%)',
      surface: 'rgba(255, 255, 255, 0.93)',
      surfaceAlt: '#E9E9E9',
      text: '#333333',
      muted: '#757575',
      border: '#CFCFCF',
      brand: '#EF3622',
      brandFg: '#FFFFFF',
      accent: '#EF3622',
    },
    button: { bg: '#D42A1A', fg: '#FFFFFF', radius: 0, case: 'uppercase', tracking: '0.03em', weight: 700 },
    hero: {
      nav: { bg: 'transparent', fg: '#FFFFFF' },
      layout: 'panel',
      background: 'rgba(255, 255, 255, 0.93)',
      fg: '#535353',
      align: 'center',
      kicker: '440 382 5086',
      eyebrow: { text: 'Call or text', style: 'caps' },
      headline: 'We come to your home, office or shop',
      size: 'md',
      overlap: false,
    },
  },

  // ohiostonerestoration.com — Bootstrap site: Montserrat uppercase in bronze, Lato body, square buttons, stone hero.
  'ohio-stone': {
    googleFonts: ['Montserrat:wght@300;400;700', 'Lato:wght@400;700'],
    mode: 'light',
    display: { font: 'Montserrat', weight: 700, case: 'uppercase' },
    heading: { font: 'Montserrat', weight: 700, case: 'uppercase', color: '#875422' },
    body: { font: 'Lato' },
    label: { font: 'Lato', weight: 700, case: 'uppercase', tracking: '0.06em', color: '#4C4D4F' },
    radius: 0,
    colors: {
      page: '#F5F4F0',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F4F0',
      text: '#4C4D4F',
      muted: '#828386',
      border: '#DADBE0',
      brand: '#875422',
      brandFg: '#F5F4F0',
      accent: '#875422',
    },
    button: { bg: '#875422', fg: '#F5F4F0', radius: 0, case: 'uppercase', weight: 500, font: 'Lato' },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#4C4D4F',
        action: { label: '216.644.4176', href: 'tel:2166444176', style: 'text' },
      },
      layout: 'banner',
      background:
        'linear-gradient(rgba(20,20,20,0.35), rgba(20,20,20,0.35)), linear-gradient(120deg, #7a6d60 0%, #93836f 28%, #6b6259 52%, #857666 76%, #5f5850 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Schedule your restoration',
      subline: 'of any natural stone and tiled surface',
      size: 'lg',
      overlap: false,
    },
  },

  // smsautodetailing.com — Bebas Neue display over a dark photo, Barlow body, pale-blue square buttons with tracked caps.
  'sms-mobile': {
    googleFonts: ['Bebas+Neue', 'Barlow:wght@400;500;600;700'],
    mode: 'light',
    display: { font: '"Bebas Neue"', weight: 400, case: 'uppercase', tracking: '-0.005em' },
    heading: { font: 'Barlow', weight: 600, color: '#0D0D0D' },
    body: { font: 'Barlow' },
    label: { font: 'Barlow', weight: 600, case: 'uppercase', tracking: '0.14em', color: '#3F444B' },
    radius: 0,
    colors: {
      page: '#F4F6FC',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F6FC',
      text: '#1A1A1A',
      muted: '#3F444B',
      border: '#DCE3F1',
      brand: '#2563EB',
      brandFg: '#FFFFFF',
      accent: '#2563EB',
    },
    button: { bg: '#C0D4F5', fg: '#0D0D0D', radius: 0, case: 'uppercase', tracking: '0.2em', weight: 600 },
    hero: {
      nav: {
        bg: 'rgba(255, 255, 255, 0.08)',
        fg: '#FFFFFF',
        action: { label: '(440) 610-6043', href: 'tel:4406106043', style: 'button' },
      },
      layout: 'banner',
      background: 'radial-gradient(ellipse 60% 80% at 85% 30%, #3b3b3b 0%, #161616 55%, #0D0D0D 100%)',
      fg: '#FFFFFF',
      align: 'left',
      eyebrow: { text: 'Superior Mobile Solutions', style: 'caps' },
      headline: 'Book your detail',
      sub: 'Premium auto detailing that comes to you — anywhere in Northeast Ohio.',
      size: 'xl',
      overlap: false,
    },
  },

  // quietstormdetailing.com — royal-blue call bar, dark hero with blue light, Helvetica, red "Book Now" buttons.
  'quiet-storm': {
    googleFonts: [ARIMO],
    mode: 'light',
    display: { font: HELVETICA, weight: 700, tracking: '0.005em' },
    heading: { font: HELVETICA, weight: 700, color: '#060606' },
    body: { font: HELVETICA },
    label: { font: HELVETICA, weight: 700, case: 'uppercase', tracking: '0.05em', color: '#2E3237' },
    radius: 3,
    colors: {
      page: '#F9F9F9',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F4F6',
      text: '#060606',
      muted: '#5B6168',
      border: '#E1E4E8',
      brand: '#003C9A',
      brandFg: '#FFFFFF',
      accent: '#003C9A',
    },
    button: { bg: '#F72B2B', fg: '#FFFFFF', radius: 3, case: 'uppercase', tracking: '0.02em', weight: 700 },
    hero: {
      topBar: {
        bg: '#003C9A',
        fg: '#FFFFFF',
        items: ['Call our Quiet Storm Auto Detailing team! 216-375-3580'],
        align: 'center',
        uppercase: true,
      },
      nav: {
        bg: 'transparent',
        fg: '#FFFFFF',
        logoFilter: 'brightness(0) invert(1)',
        action: { label: 'Book Now', href: '#booking', style: 'button' },
      },
      layout: 'banner',
      background:
        'radial-gradient(ellipse 90% 45% at 20% 105%, rgba(28, 98, 214, 0.55) 0%, transparent 70%), linear-gradient(180deg, #0b0d12 0%, #05070b 100%)',
      fg: '#FFFFFF',
      align: 'left',
      kicker: 'Northeast Ohio’s Premium Car Care',
      headline: 'Book Quiet Storm Detailing',
      sub: 'Pick your package, choose a time, and we’ll go above and beyond for your vehicle.',
      size: 'lg',
      overlap: false,
    },
  },

  // lionheartdetailing.com — Elementor: white header, Mulish 800 caps, centered hero with a blue rule, square blue buttons.
  lionheart: {
    googleFonts: ['Mulish:wght@400;500;700;800'],
    mode: 'light',
    display: { font: 'Mulish', weight: 800, case: 'uppercase' },
    heading: { font: 'Mulish', weight: 800, color: '#222222' },
    body: { font: 'Mulish' },
    label: { font: 'Mulish', weight: 800, case: 'uppercase', tracking: '0.03em', color: '#54595F' },
    radius: 0,
    colors: {
      page: '#F4F5F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F2F3',
      text: '#222222',
      muted: '#54595F',
      border: '#DCDFE2',
      brand: '#0693E3',
      brandFg: '#FFFFFF',
      accent: '#0693E3',
    },
    button: { bg: '#0693E3', fg: '#FFFFFF', radius: 0, case: 'uppercase', weight: 500 },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#54595F',
        action: { label: '(614) 620-6039', href: 'tel:6146206039', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), #54595F',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Book auto detailing in Columbus Ohio',
      ornament: 'rule',
      ornamentColor: '#0693E3',
      sub: 'PPF, ceramic coating, mobile detailing, RV and boat detailing — pick a package and a time below.',
      size: 'md',
      overlap: false,
    },
  },

  // speedyks.com — navy utility bar, centered Montserrat hero, bright-blue pill badges and pill buttons, pale-blue cards.
  'speedy-ks': {
    googleFonts: ['Montserrat:wght@400;500;600;700'],
    mode: 'light',
    display: { font: 'Montserrat', weight: 700 },
    heading: { font: 'Montserrat', weight: 700, color: '#01012F' },
    body: { font: 'Montserrat' },
    label: { font: 'Montserrat', weight: 700, color: '#01012F' },
    radius: 4,
    colors: {
      page: '#FFFFFF',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F8FE',
      text: '#393939',
      muted: '#5F6470',
      border: '#D6E3F3',
      brand: '#007BFF',
      brandFg: '#FFFFFF',
      accent: '#01012F',
    },
    button: { bg: '#007BFF', fg: '#FFFFFF', radius: 999, weight: 600, tracking: '0.01em' },
    hero: {
      topBar: { bg: '#01012F', fg: '#FFFFFF', items: ['WE COME TO YOU®'], align: 'start' },
      nav: {
        bg: '#FFFFFF',
        fg: '#01012F',
        action: { label: 'Schedule Appointment', href: '#booking', style: 'text' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), linear-gradient(90deg, #2c3a55 0%, #3f4d68 50%, #2a3450 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Mobile Detailing Since 1994', style: 'pill' },
      headline: 'Autos, RVs, Boats & Much More',
      sub: 'Schedule your certified mobile detail online.',
      size: 'lg',
      overlap: true,
    },
  },

  // kcautodetailing.com — Wix: Helvetica, charcoal & cyan, italic "Mobile. Friendly. Clean." over a centered hero.
  'kc-auto': {
    googleFonts: [ARIMO],
    mode: 'light',
    display: { font: HELVETICA, weight: 500, tracking: '-0.01em' },
    heading: { font: HELVETICA, weight: 700, color: '#2F2E2E' },
    body: { font: HELVETICA },
    label: { font: HELVETICA, weight: 400, case: 'uppercase', tracking: '0.08em', color: '#605E5E' },
    radius: 5,
    colors: {
      page: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F4F4F4',
      text: '#2F2E2E',
      muted: '#605E5E',
      border: '#E2E2E2',
      brand: '#00AEEF',
      brandFg: '#000000',
      accent: '#00AEEF',
    },
    button: { bg: '#00AEEF', fg: '#000000', radius: 5, tracking: '0.08em', weight: 700 },
    hero: {
      nav: {
        bg: '#FFFFFF',
        fg: '#000000',
        action: { label: 'Call (614)-448-8116', href: 'tel:6144488116', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), linear-gradient(160deg, #6b6b6b 0%, #3b3b3b 60%, #2a2a2a 100%)',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Mobile. Friendly. Clean.', style: 'italic' },
      headline: 'Car Detailing Columbus OH',
      sub: 'Book your interior, exterior or paint correction appointment below.',
      size: 'lg',
      overlap: false,
    },
  },

  // deluxedetailingoh.com — Duda site: charcoal page, deep-red logo band, Oswald caps, tracked Lato buttons.
  'deluxe-detailing': {
    googleFonts: ['Oswald:wght@500;700', 'Lato:wght@400;700', 'Montserrat:wght@600;700'],
    mode: 'dark',
    display: { font: 'Oswald', weight: 700, case: 'uppercase', tracking: '0.005em', color: '#FAFAFA' },
    heading: { font: 'Oswald', weight: 500, case: 'uppercase', tracking: '0.01em', color: '#FFFFFF' },
    body: { font: 'Lato' },
    label: { font: 'Lato', weight: 700, case: 'uppercase', tracking: '0.2em', color: '#BDBDBD' },
    radius: 3,
    colors: {
      page: '#161616',
      surface: '#1C1C1C',
      surfaceAlt: '#232323',
      text: '#EEEEEE',
      muted: '#A8A8A8',
      border: '#333333',
      brand: '#B3180A',
      brandFg: '#FFFFFF',
      accent: '#D0301F',
    },
    button: { bg: '#831005', fg: '#FFFFFF', radius: 3, case: 'uppercase', tracking: '0.2em', weight: 400, font: 'Lato' },
    hero: {
      nav: {
        bg: '#161616',
        fg: '#FFFFFF',
        logoPlate: '#831005',
        action: { label: 'Call (614) 570-0617', href: 'tel:6145700617', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(90deg, #1c1c1c 0%, #1c1c1c 55%, #262626 100%)',
      fg: '#FAFAFA',
      align: 'left',
      headline: 'Book Columbus Ohio’s #1 mobile detailing team',
      sub: 'All the great detailing services you need in one place — at your driveway in Dublin, Powell and New Albany.',
      size: 'lg',
      overlap: false,
    },
  },

  // mhautodetail.com — Duda site: black info bar, dark green-tinted hero, Questrial, square pure-green and blue buttons.
  'mh-auto': {
    googleFonts: ['Questrial', 'Ubuntu:wght@400;500;700'],
    mode: 'light',
    display: { font: 'Questrial', weight: 400, tracking: '-0.005em' },
    heading: { font: 'Questrial', weight: 400, color: '#000000' },
    body: { font: 'Ubuntu' },
    label: { font: 'Questrial', weight: 400, case: 'uppercase', tracking: '0.18em', color: '#4D4D4D' },
    radius: 0,
    colors: {
      page: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceAlt: '#F6F6F6',
      text: '#111111',
      muted: '#4D4D4D',
      border: '#DDDDDD',
      brand: '#008000',
      brandFg: '#FFFFFF',
      accent: '#0404C9',
    },
    button: { bg: '#008000', fg: '#FFFFFF', radius: 0, case: 'uppercase', weight: 400, font: 'Questrial' },
    hero: {
      topBar: {
        bg: '#111111',
        fg: '#FFFFFF',
        items: ['Serving Columbus, Ohio and the surrounding areas!', 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday – Sunday: Closed'],
      },
      nav: {
        logoSize: 'lg',
        bg: 'transparent',
        fg: '#FFFFFF',
        action: { label: 'Call (614) 962-4554', href: 'tel:6149624554', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,120,0,0.75) 100%), #14331a',
      fg: '#FFFFFF',
      align: 'center',
      eyebrow: { text: 'Ceramic coatings, paint correction, and full detailing services', style: 'caps' },
      headline: 'Be proud of your vehicle once again',
      sub: 'Book your mobile detail with MH Auto Detailing.',
      size: 'lg',
      overlap: false,
    },
  },

  // columbusohmobilemechanics.com — Duda template: crimson header, translucent crimson text panel over a dark photo, Red Rose headings.
  'columbus-mobile-mechanics': {
    googleFonts: ['Red+Rose:wght@400;700', 'Poppins:wght@300;400;600'],
    mode: 'light',
    display: { font: '"Red Rose"', weight: 700 },
    heading: { font: '"Red Rose"', weight: 700, color: '#000000' },
    body: { font: 'Poppins' },
    label: { font: 'Poppins', weight: 600, case: 'uppercase', tracking: '0.06em', color: '#463939' },
    radius: 6,
    colors: {
      page: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',
      text: '#111111',
      muted: '#555555',
      border: '#DDDDDD',
      brand: '#C2002D',
      brandFg: '#FFFFFF',
      accent: '#C2002D',
    },
    button: { bg: '#000000', fg: '#FFFFFF', radius: 6, case: 'uppercase', weight: 600 },
    hero: {
      nav: {
        bg: '#C2002D',
        fg: '#FFFFFF',
        wordmark: 'Columbus Mobile Mechanics Co.',
        action: { label: '614-618-4646', href: 'tel:6146184646', style: 'text' },
      },
      layout: 'banner',
      background: 'radial-gradient(ellipse 70% 90% at 80% 40%, #5a5048 0%, #2b2622 55%, #151311 100%)',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Columbus Mobile Mechanics Co.',
      sub: 'Mobile mechanics serving Columbus, Ohio. Book on-site diagnostics and repair at your driveway.',
      box: 'rgba(194, 0, 45, 0.82)',
      size: 'lg',
      overlap: false,
    },
  },

  // columbusohiotint.com — WordPress: black warranty bar, charcoal header with the big logo, grey tab nav, Raleway on light grey.
  'tint-works': {
    googleFonts: ['Raleway:wght@500;700', 'Lato:wght@400;700'],
    mode: 'light',
    display: { font: 'Raleway', weight: 700, color: '#FFFFFF' },
    heading: { font: 'Raleway', weight: 700, color: '#333333' },
    body: { font: 'Lato' },
    label: { font: 'Raleway', weight: 500, case: 'uppercase', tracking: '0.05em', color: '#595959' },
    radius: 4,
    colors: {
      page: '#F3F3F3',
      surface: '#FFFFFF',
      surfaceAlt: '#EFEFEF',
      text: '#333333',
      muted: '#848484',
      border: '#DDDDDD',
      brand: '#010066',
      brandFg: '#FFFFFF',
      accent: '#D2112B',
    },
    button: { bg: '#D2112B', fg: '#FFFFFF', radius: 4, weight: 700 },
    hero: {
      topBar: { bg: '#000000', fg: '#FFFFFF', items: ['Lifetime Warranty on all window film and Labor'], align: 'start' },
      nav: {
        logoSize: 'lg', bg: '#333333', fg: '#FFFFFF', action: { label: '(614) 649-5878', href: 'tel:6146495878', style: 'text' } },
      layout: 'banner',
      background: '#000000',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Book window tint in Powell & Columbus, Ohio',
      sub: 'Tint Works & Car Audio — premier automotive customization. One company, two locations.',
      size: 'md',
      overlap: false,
    },
  },

  // motintking.com — Next.js: near-black and cream, Archivo Black with tight tracking, IBM Plex Mono labels, square yellow buttons.
  motint: {
    googleFonts: ['Archivo+Black', 'IBM+Plex+Sans:wght@400;500;600', 'IBM+Plex+Mono:wght@500;600'],
    mode: 'dark',
    display: { font: '"Archivo Black"', weight: 400, tracking: '-0.055em' },
    heading: { font: '"Archivo Black"', weight: 400, tracking: '-0.03em' },
    body: { font: '"IBM Plex Sans"' },
    label: { font: '"IBM Plex Mono"', weight: 600, case: 'uppercase', tracking: '0.16em', color: '#F6CA4B' },
    radius: 0,
    colors: {
      page: '#0A0B09',
      surface: '#101512',
      surfaceAlt: '#171914',
      text: '#FFFEFA',
      muted: '#B7B4A8',
      border: '#2A2E28',
      brand: '#F6CA4B',
      brandFg: '#0A0B09',
      accent: '#F6CA4B',
    },
    button: {
      bg: '#E0B83F',
      fg: '#101512',
      radius: 0,
      case: 'uppercase',
      tracking: '0.1em',
      weight: 600,
      font: '"IBM Plex Mono"',
    },
    hero: {
      nav: {
        bg: '#0A0B09',
        fg: '#FFFEFA',
        borderColor: '#2A2E28',
        action: { label: '614-822-0494', href: 'tel:6148220494', style: 'button' },
      },
      layout: 'banner',
      background: '#0A0B09',
      fg: '#FFFEFA',
      align: 'left',
      eyebrow: { text: 'Columbus · Tint · Wraps · PPF', style: 'mono' },
      headline: 'Make the car yours.',
      sub: 'Tint, wraps and paint protection — installed at our Trabue Road shop. Pick a service and a time below.',
      size: 'xl',
      overlap: false,
    },
  },

  // adonispressurewash.com — GoDaddy: black promo bar, white header, red hero with silver Righteous caps, square black/white buttons.
  'adonis-pressure-wash': {
    googleFonts: ['Righteous', 'Josefin+Sans:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Righteous', weight: 400, case: 'uppercase', tracking: '0.12em', color: '#C0C0C0' },
    heading: { font: 'Righteous', weight: 400, case: 'uppercase', tracking: '0.08em', color: '#161616' },
    body: { font: '"Josefin Sans"' },
    label: { font: '"Josefin Sans"', weight: 700, case: 'uppercase', tracking: '0.1em', color: '#161616' },
    radius: 0,
    colors: {
      page: '#F6F6F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F6F6F6',
      text: '#161616',
      muted: '#595959',
      border: '#DDDDDD',
      brand: '#BF1111',
      brandFg: '#FFFFFF',
      accent: '#BF1111',
    },
    button: { bg: '#000000', fg: '#FFFFFF', radius: 0, case: 'uppercase', tracking: '0.06em', weight: 600 },
    hero: {
      topBar: {
        bg: '#161616',
        fg: '#FFFFFF',
        items: ['10-Year Anniversary Special House + Driveway — $424 Restrictions apply'],
        align: 'center',
        uppercase: true,
      },
      nav: {
        logoSize: 'lg', bg: '#FFFFFF', fg: '#161616', action: { label: 'Get a free quote', href: '#booking', style: 'button' } },
      layout: 'banner',
      background: '#BF1111',
      fg: '#FFFFFF',
      align: 'left',
      headline: 'Professional pressure washing in Columbus & Central Ohio',
      headlineColor: '#C0C0C0',
      sub: 'Residential • Commercial • Fleet Washing. Proudly serving Central Ohio for 10 years.',
      size: 'md',
      overlap: false,
    },
  },

  // snapandcracklocksmith.com — Divi: yellow logo tile, royal-blue info bar, Oswald hero with a yellow rule, yellow buttons with blue text.
  'snap-and-crack': {
    googleFonts: ['Oswald:wght@500', 'Inter:wght@400;600;700'],
    mode: 'light',
    display: { font: 'Oswald', weight: 500 },
    heading: { font: 'Oswald', weight: 500, color: '#0A2C8A' },
    body: { font: 'Inter' },
    label: { font: 'Oswald', weight: 500, case: 'uppercase', tracking: '0.04em', color: '#0A2C8A' },
    radius: 3,
    colors: {
      page: '#F8F8F8',
      surface: '#FFFFFF',
      surfaceAlt: '#F2F2F2',
      text: '#333333',
      muted: '#5C5C5C',
      border: '#E1E1E1',
      brand: '#0A2C8A',
      brandFg: '#FFFFFF',
      accent: '#0A2C8A',
    },
    button: { bg: '#FFD200', fg: '#2B388F', radius: 3, weight: 700 },
    hero: {
      topBar: {
        bg: '#0A2C8A',
        fg: '#FFFFFF',
        items: ['Locksmith near me — serving the Columbus, OH metro region since 2013', 'Mobile service hours Mon–Sun: 7:00 am to 10:00 pm'],
      },
      nav: {
        bg: '#EEEEEE',
        fg: '#333333',
        logoPlate: '#FFD200',
        action: { label: '614-701-9991', href: 'tel:6147019991', style: 'button' },
      },
      layout: 'banner',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.55)), linear-gradient(180deg, #5b7fa8 0%, #3f5f86 55%, #33482f 100%)',
      fg: '#FFFFFF',
      align: 'center',
      headline: 'Book your trusted Columbus locksmith',
      ornament: 'rule',
      ornamentColor: '#FFD200',
      sub: 'Proudly serving local clients since 2013 — same-day service and up-front pricing.',
      size: 'lg',
      overlap: false,
    },
  },
}

export const themes: Record<string, ClientTheme> = {
  ...baseThemes,
  ...Object.fromEntries(demoEntries.map((entry) => [entry.client.slug, entry.theme])),
}
