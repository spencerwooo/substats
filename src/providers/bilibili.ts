import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// https://api.bilibili.com/x/relation/stat?vmid=401742377&isonp=jsonp
type BilibiliResponse =
  | {
      code: 0
      message: string
      ttl: number
      data: {
        mid: number
        following: number
        whisper: number
        black: number
        follower: number
      }
    }
  | { code: Omit<number, 0>; message: string; ttl: number }

export default async function bilibiliProvider(
  key: string,
): Promise<SubstatsResponse> {
  const url = 'https://api.bilibili.com/x/relation/stat'

  try {
    const resp = await fetch(`${url}?vmid=${key}&isonp=jsonp`, {
      cf: { cacheEverything: true },
    })
    const data = await resp.json<BilibiliResponse>()

    if (data.code === 0 && 'data' in data) {
      const { follower: count } = data.data
      return {
        source: 'bilibili',
        failed: false,
        count: count,
      }
    }

    // If data.code is not 0, then we have encountered an error with the API
    throw new Error(data.message ?? 'An error occured with the bilibili API')
  } catch (error) {
    return providerErrorHandler(error, 'bilibili')
  }
}
