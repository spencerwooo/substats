import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.zhihu.com/people/bi-xiao-tian-99
type ZhihuResponse =
  | { id: string; url_token: string; name: string; follower_count: number }
  | { error: { code: number; name: string; message: string } }

export default async function zhihuProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<ZhihuResponse>({
    providerName: 'zhihu',
    queryKey: key,
    fetchUrl: `https://www.zhihu.com/api/v4/members/${key}?include=follower_count`,
    countObjPath: 'follower_count',
    errorMessageObjPath: 'error.message',
    isResponseValid: d => 'follower_count' in d,
  })
}
