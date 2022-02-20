import { Bindings } from 'bindings'

export type SubstatsRequest = {
  query: { source: string | string[]; key: string | string[] }
  params: { source: string; key: string }
}
export type SubstatsResponse =
  | { source: string; key: string; failed: false; count: number }
  | { source: string; key: string; failed: true; message: string }
export type JSONResponse =
  | null
  | string
  | number
  | boolean
  | Array<JSONResponse>
  | { [key: string]: JSONResponse }

export declare type ProviderFunctions = (
  key: string,
  env?: Record<keyof Bindings.Env, string>,
) => Promise<SubstatsResponse>

export type SupportedProviders =
  | 'common'
  | 'afdian'
  | 'bilibili'
  | 'coolapk'
  | 'feedly'
  | 'feedspub'
  | 'github'
  | 'inoreader'
  | 'instagram'
  | 'jike'
  | 'medium'
  | 'neteasemusic'
  | 'newsblur'
  | 'reddit'
  | 'sspai'
  | 'steamgames'
  | 'steamfriends'
  | 'telegram'
  | 'twitter'
  | 'unsplash'
  | 'weibo'
  | 'wikipediazh'
  | 'zhihu'

export type Env = Record<keyof Bindings.Env, string>
