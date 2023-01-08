import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://mastodon.social/api/v1/accounts/lookup?acct=oldpanda
type MastondonResponseOnSuccess = {
  followers_count: number
}

type MastondonResponseOnFailure = {
  error: string
}

type MastondonResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(response: Response): Promise<MastondonResponse> {
  if (
    response.status === 200 &&
    response.headers.get('content-type')?.includes('application/json')
  ) {
    const data = await response.json<MastondonResponseOnSuccess>()
    if ('followers_count' in data) {
      return {
        error: 0,
        followers: data.followers_count ?? 0,
      }
    }
    return {
      error: 1,
      message: 'Username not found on Mastodon',
    }
  }
  if (response.status === 404) {
    const data = await response.json<MastondonResponseOnFailure>()
    return { error: 1, message: data.error }
  }

  return {
    error: 1,
    message: 'Failed to fetch user info from Mastodon',
  }
}

export default async function mastodonProvider(
  key: string,
): Promise<SubstatsResponse> {
  const parts = key.split('@')
  const domain = parts.pop()
  const user = parts.join('@')
  return commonProviderHandler<MastondonResponse>({
    providerName: 'mastodon',
    queryKey: key,
    fetchUrl: `https://${domain}/api/v1/accounts/lookup?acct=${user}`,
    countObjPath: 'followers',
    errorMessageObjPath: 'error',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
