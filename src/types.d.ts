export interface SubstatsRequest {
  query: {
    source: string | string[]
    key: string | string[]
    // queryKey specified here for backwards compatibility
    queryKey?: string | string[]
  }
  params: {
    source: string
    key: string
  }
}
export type JSONResponse =
  | null
  | string
  | number
  | boolean
  | Array<JSONResponse>
  | { [key: string]: JSONResponse }
