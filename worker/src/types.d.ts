export type SubstatsRequest = {
  query: {
    source: string | string[]
    key: string | string[]
    endpoint: string
    datapath: string
  }
  params: { source: string; key: string }
}
export type SubstatsResponse =
  | { source: string; key: string; failed: false; count: number | string }
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
  env: Env,
  endpoint?: string,
  datapath?: string,
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
  | 'juejin'
  | 'yuque'
