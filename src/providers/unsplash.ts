import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

type UnsplashResponse =
  | { error: 0; data: { followed_count: number } }
  | { error: Omit<number, 0>; msg: string; data: null }

export default async function unsplashProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<UnsplashResponse>({
    providerName: 'unsplash',
    fetchUrl: `https://placeholder.com/v1?user=${key}`,
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && d.data !== null,
  })
}
