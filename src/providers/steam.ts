import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

type SteamResponse =
  | { error: 0; data: { followed_count: number } }
  | { error: Omit<number, 0>; msg: string; data: null }

export default async function steamProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<SteamResponse>({
    providerName: 'steam',
    queryKey: key,
    fetchUrl: `https://placeholder.com/v1?user=${key}`,
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && d.data !== null,
  })
}
