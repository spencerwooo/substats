import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://feedly.com/v3/recommendations/feeds/feed%2Fhttps%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml?count=0
type FeedlyResponse =
  | { scheme: string; source: { subscribers: number }; recommendations: [] }
  | { scheme: string; recommendations: [] }

export default async function feedlyProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<FeedlyResponse>({
    providerName: 'feedly',
    queryKey: key,
    fetchUrl: `https://feedly.com/v3/recommendations/feeds/feed%2F${key}?count=0`,
    countObjPath: 'source.subscribers',
    errorMessageObjPath: 'no error message fallback to default',
    isResponseValid: d => 'source' in d,
  })
}
