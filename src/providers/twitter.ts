import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://twitter.com/GenshinImpact
type TwitterRawResponse = [{ followers_count: number }] | []
type TwitterResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(response: Response): Promise<TwitterResponse> {
  const data = await response.json<TwitterRawResponse>()
  if (data.length === 0) {
    return { error: 1, message: 'Twitter user not found' }
  }
  return { error: 0, followers: data[0].followers_count }
}

export default async function twitterProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<TwitterResponse>({
    providerName: 'twitter',
    queryKey: key,
    fetchUrl: `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${key}`,
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
