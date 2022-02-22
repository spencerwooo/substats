import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://sspai.com/api/v1/user/slug/info/get?slug=spencerwoo
type SSPaiResponse =
  | { error: 0; data: { followed_count: number } }
  | { error: Omit<number, 0>; msg: string; data: null }

export default async function sspaiProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<SSPaiResponse>({
    providerName: 'sspai',
    queryKey: key,
    fetchUrl: `https://sspai.com/api/v1/user/slug/info/get?slug=${key}`,
    countObjPath: 'data.followed_count',
    errorMessageObjPath: 'msg',
    isResponseValid: d => d.error === 0 && d.data !== null,
  })
}
