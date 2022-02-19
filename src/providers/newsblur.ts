import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// type NewsblurResponse =
//   | { error: 0; data: { followed_count: number } }
//   | { error: Omit<number, 0>; msg: string; data: null }

export default async function newsblurProvider(
  key: string,
): Promise<SubstatsResponse> {
  // TODO: not working yet
  return providerErrorHandler(
    new Error(`sorry ${key}, this route is not working yet`),
    'newsblur',
  )
  // return commonProviderHandler<NewsblurResponse>({
  //   providerName: 'newsblur',
  //   fetchUrl: `https://placeholder.com/v1?user=${key}`,
  //   countObjPath: 'followers',
  //   errorMessageObjPath: 'message',
  //   isResponseValid: d => d.error === 0 && d.data !== null,
  // })
}
