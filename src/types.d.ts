export type SubstatsRequest = {
  query: { source: string | string[]; key: string | string[] }
  params: { source: string; key: string }
}
export type SubstatsResponse =
  | { source: string; failed: false; count: number }
  | { source: string; failed: true; message: string }
export type JSONResponse =
  | null
  | string
  | number
  | boolean
  | Array<JSONResponse>
  | { [key: string]: JSONResponse }

export declare type ProviderFunctions = (
  key: string,
) => Promise<SubstatsResponse>

export type SupportedProviders = 'sspai' | 'bilibili'
