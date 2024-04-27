import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://api.bilibili.com/x/web-interface/card?mid=401742377&isonp=jsonp
type BilibiliResponse =
  | {
      code: 0
      message: string
      ttl: number
      data: {
        card: object,
        like_num: number
        following: boolean
        archive_count: number
        article_count: number
        follower: number
      }
    }
  | { code: Omit<number, 0>; message: string; ttl: number }

export default async function bilibiliProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<BilibiliResponse>({
    providerName: 'bilibili',
    queryKey: key,
    fetchUrl: `https://api.bilibili.com/x/web-interface/card?mid=${key}`,
    countObjPath: 'data.follower',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.code === 0 && 'data' in d,
  })
}
