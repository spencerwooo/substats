import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.yuque.com/lyndon
type YuqueResponse = {
  data: {
    followers_count: number
  }
}

export default async function yuqueProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<YuqueResponse>({
    providerName: 'yuque',
    queryKey: key,
    fetchUrl: `https://www.yuque.com/api/users/${key}/profile?`,
    countObjPath: 'data.followers_count',
    errorMessageObjPath: '',
    isResponseValid: d => 'followers_count' in d.data,
  })
}
