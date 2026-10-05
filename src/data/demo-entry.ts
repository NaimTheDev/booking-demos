import type { ClientConfig } from './clients'
import type { ClientTheme } from './themes'

/** One demo file in ./demos: the client's booking config plus the theme sampled from its site. */
export interface DemoEntry {
  client: ClientConfig
  theme: ClientTheme
}
