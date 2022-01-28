export type SubstatsRequest = {
  query: { source: string | string[]; key: string | string[] }
  params: { source: string; key: string }
}
export type SubstatsResponse =
  | { source: string; failed: boolean; count: number }
  | { source: string; failed: boolean; message: string }
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
