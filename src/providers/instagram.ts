import type { Env, SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.instagram.com/9gag/?__a=1
type InstagramResponseOnSuccess = {
  graphql: { user: { edge_followed_by: { count: number } } }
}
type InstagramResponse =
  | { error: 0; followers: number }
  | { error: 1; message: string }

async function parseResponse(response: Response): Promise<InstagramResponse> {
  // On status 200 success and response content-type json
  if (
    response.status === 200 &&
    response.headers.get('content-type')?.includes('application/json')
  ) {
    const data = await response.json<InstagramResponseOnSuccess>()

    if ('graphql' in data) {
      return {
        error: 0,
        followers: data.graphql?.user?.edge_followed_by?.count ?? 0,
      }
    }
    return { error: 1, message: 'Username not found on Instagram' }
  }
  return { error: 1, message: 'An error occured with the Instagram API' }
}
export default async function instagramProvider(
  key: string,
  env?: Env,
): Promise<SubstatsResponse> {
  return commonProviderHandler<InstagramResponse>({
    providerName: 'instagram',
    queryKey: key,
    fetchUrl: `https://www.instagram.com/${key}/?__a=1`,
    optionalHeaders: { Cookie: env?.INSTAGRAM_COOKIE ?? '' },
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'followers' in d,
    parseResponse: parseResponse,
  })
}
