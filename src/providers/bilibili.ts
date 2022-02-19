import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

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
  return commonProviderHandler<BilibiliResponse>({
    providerName: 'bilibili',
    fetchUrl: `https://api.bilibili.com/x/relation/stat?vmid=${key}&isonp=jsonp`,
    countObjPath: 'data.follower',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.code === 0 && 'data' in d,
  })
}
