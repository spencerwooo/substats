import type { Env, SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://unsplash.com/@adamhoang
type UnsplashResponse =
  | { id: string; download: number; followers_count: number }
  | { errors: Array<string> }

export default async function unsplashProvider(
  key: string,
  env?: Env,
): Promise<SubstatsResponse> {
  return commonProviderHandler<UnsplashResponse>({
    providerName: 'unsplash',
    queryKey: key,
    fetchUrl: `https://api.unsplash.com/users/${key}?client_id=${env?.UNSPLASH_ACCESS_TOKEN}`,
    countObjPath: 'followers_count',
    errorMessageObjPath: 'errors.0',
    isResponseValid: d => 'followers_count' in d,
  })
}
