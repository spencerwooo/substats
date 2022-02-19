import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// https://sspai.com/api/v1/user/slug/info/get?slug=spencerwoo
type SSPaiResponse =
  | { error: 0; data: { followed_count: number } }
  | { error: Omit<number, 0>; msg: string; data: null }

export default async function sspaiProvider(
  key: string,
): Promise<SubstatsResponse> {
  const url = 'https://sspai.com/api/v1/user/slug/info/get'

  try {
    const resp = await fetch(`${url}?slug=${key}`, {
      cf: { cacheEverything: true },
    })
    const data = await resp.json<SSPaiResponse>()

    if (data.error === 0 && data.data) {
      const { followed_count: count } = data.data
      return {
        source: 'sspai',
        failed: false,
        count: count,
      }
    }

    // If data.error is not 0, then we have encountered an error with the API
    throw new Error(data?.msg ?? 'An error occured with the sspai API')
  } catch (error) {
    return providerErrorHandler(error, 'sspai')
  }
}
