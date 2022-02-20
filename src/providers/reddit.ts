import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.reddit.com/user/jushoro/about.json
type RedditResponse =
  | { kind: string; data: { total_karma: number } }
  | { error: number; message: string }

export default async function redditProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<RedditResponse>({
    providerName: 'reddit',
    fetchUrl: `https://www.reddit.com/user/${key}/about.json`,
    countObjPath: 'data.total_karma',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'data' in d,
  })
}
