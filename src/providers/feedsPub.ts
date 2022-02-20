import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https%3A%2F%2Fblog.feeds.pub%2Frss.xml
// https://api.feeds.pub/graphql?operationName=feed&query=query%20feed%28%24id%3A%20String%21%29%20%7B%0A%20%20feed%28id%3A%20%24id%29%20%7B%0A%20%20%20%20followerCount%0A%20%20%7D%0A%7D%0A&variables=%7B%22id%22%3A%20%22https%3A%2F%2Fblog.feeds.pub%2Frss.xml%22%7D
type FeedsPubResponse =
  | { data: { feed: { followerCount: number } } }
  | { data: { feed: null }; errors: [{ message: string }] }

export default async function feedsPubProvider(
  key: string,
): Promise<SubstatsResponse> {
  const feed = key.endsWith('/') ? key.slice(0, -1) : key
  return commonProviderHandler<FeedsPubResponse>({
    providerName: 'feedspub',
    queryKey: key,
    fetchUrl: `https://api.feeds.pub/graphql?query=query%20feed(%24id%3A%20String!)%7B%20feed(id%3A%20%24id)%20%7B%20followerCount%20%7D%20%7D&variables=%7B%22id%22%3A%20%22${feed}%22%7D&operationName=feed`,
    countObjPath: 'data.feed.followerCount',
    errorMessageObjPath: 'errors.0.message',
    isResponseValid: d => !('errors' in d) && d.data.feed !== null,
  })
}
