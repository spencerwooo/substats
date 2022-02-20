import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://weibo.com/u/5648729445
type WeiboResponseOnSuccess = {
  ok: 1
  data: { user: { followers_count: number } }
}
type WeiboResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(response: Response): Promise<WeiboResponse> {
  // On status 200 success and response content-type json, return a successful
  // response parsed as a JSON object
  if (
    response.status === 200 &&
    response.headers.get('content-type')?.includes('application/json')
  ) {
    const data = await response.json<WeiboResponseOnSuccess>()
    if (data.ok) {
      return { error: 0, followers: data.data.user.followers_count }
    }
    return { error: 1, message: JSON.stringify(data) }
  }

  // On failed requests, weibo API returns content-type html
  if (response.headers.get('content-type')?.includes('text/html')) {
    const text = await response.text()
    return { error: 1, message: text }
  }

  return { error: 1, message: 'An error occured with the weibo API' }
}

export default async function weiboProvider(
  key: string,
): Promise<SubstatsResponse> {
  const weiboVisitorSub =
    '_2AkMVTurVf8NxqwJRmP8SxWnnZYt3wgvEieKjEhsOJRMxHRl-yj9jqmMbtRB6Ps7EOi_upuTEi2XWmWSspqsOd-wzsci3'
  const weiboVisitorSubP =
    '0033WrSXqPxfM72-Ws9jqgMF55529P9D9WhvVSYln1qiD47zRNxYFhTS'
  return commonProviderHandler<WeiboResponse>({
    providerName: 'weibo',
    queryKey: key,
    fetchUrl: `https://weibo.com/ajax/profile/info?uid=${key}`,
    optionalHeaders: {
      Cookie: `SUB=${weiboVisitorSub}; SUBP=${weiboVisitorSubP}`,
    },
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
