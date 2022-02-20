import type { SubstatsResponse } from '@/types'

import cheerio from 'cheerio'

import { commonProviderHandler } from '.'

// https://m.okjike.com/users/2204A477-38C8-4D9D-9705-9C9B990BE042
type JikeResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(resp: Response): Promise<JikeResponse> {
  const html = await resp.text()
  const $ = cheerio.load(html)
  const raw = $('[type = "application/json"]').html()

  if (raw) {
    const cnt = JSON.parse(raw)?.props?.pageProps?.user?.followed_count ?? 0
    return { error: 0, followers: cnt }
  }
  return { error: 1, message: 'No data found' }
}

export default async function jikeProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<JikeResponse>({
    providerName: 'jike',
    queryKey: key,
    fetchUrl: `https://m.okjike.com/users/${key}`,
    optionalHeaders: { Referer: `https://m.okjike.com/users/${key}` },
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
