import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://afdian.net/api/user/get-profile-by-slug?url_slug=afdian
type AfdianResponse =
  | {
      ec: 200
      em: string
      data: {
        user: {
          creator: {
            // This number becomes '**' if the user hides their monthly income
            // details from being accessed publicly
            monthly_fans: number | '**'
            monthly_income: string
          }
        }
      }
    }
  | { ec: Omit<number, 200>; em: string; data: Record<string, never> }

export default async function afdianProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<AfdianResponse>({
    providerName: 'afdian',
    queryKey: key,
    fetchUrl: `https://afdian.net/api/user/get-profile-by-slug?url_slug=${key}`,
    countObjPath: 'data.user.creator.monthly_fans',
    errorMessageObjPath: 'em',
    isResponseValid: d => d.ec === 200 && 'user' in d.data,
  })
}
