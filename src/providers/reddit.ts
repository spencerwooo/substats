import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.reddit.com/user/Acidtwist
type RedditRawResponse =
  | { kind: string; data: { link_karma: number; comment_karma: number } }
  | { error: number; message: string }
type RedditResponse =
  | { kind: string; karma: number }
  | { error: number; message: string }

async function parseResponse(resp: Response): Promise<RedditResponse> {
  const data = await resp.json<RedditRawResponse>()
  if ('data' in data) {
    return {
      kind: data.kind,
      karma: data.data.link_karma + data.data.comment_karma,
    }
  } else {
    return data
  }
}

export default async function redditProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<RedditResponse>({
    providerName: 'reddit',
    fetchUrl: `https://www.reddit.com/user/${key}/about.json`,
    countObjPath: 'karma',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'karma' in d,
    parseResponse: parseResponse,
  })
}
