import type { SubstatsResponse } from '@/types'

import cheerio from 'cheerio'

import { commonProviderHandler } from '.'

// https://m.okjike.com/users/2204A477-38C8-4D9D-9705-9C9B990BE042
type JikeRawResponse = {
  props: {
    pageProps: {
      user: {
        statsCount: {
          topicSubscribed: number
          topicCreated: number
          followedCount: number
          followingCount: number
          highlightedPersonalUpdates: number
          liked: number
          respectedCount: number
        }
      }
    }
  }
}
type JikeResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(resp: Response): Promise<JikeResponse> {
  const html = await resp.text()

  const extractPageProps = (): JikeRawResponse | null => {
    const $ = cheerio.load(html)
    const raw = $('[type = "application/json"]').html()
    return raw ? (JSON.parse(raw) as JikeRawResponse) : null
  }
  const props = extractPageProps()
  if (!props) {
    return { error: 1, message: 'No data found' }
  }

  const followers = props.props.pageProps.user.statsCount.followedCount ?? 0
  return { error: 0, followers }
}

export default async function jikeProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<JikeResponse>({
    providerName: 'jike',
    queryKey: key,
    fetchUrl: `https://m.okjike.com/users/${key}`,
    optionalHeaders: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0',
    },
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
