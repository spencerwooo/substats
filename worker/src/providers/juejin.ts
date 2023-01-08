import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://juejin.cn/user/1838039172387262
type JuejinResponse = {
  err_no: number
  err_msg: string
  data: {
    follower_count: number
  }
}

export default async function juejinProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<JuejinResponse>({
    providerName: 'juejin',
    queryKey: key,
    fetchUrl: `https://api.juejin.cn/user_api/v1/user/get?user_id=${key}`,
    countObjPath: 'data.follower_count',
    errorMessageObjPath: 'err_msg',
    isResponseValid: d => 'follower_count' in d.data,
  })
}
