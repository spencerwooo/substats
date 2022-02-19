import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://medium.com/@spencerwooo?format=json
type MediumRawResponse =
  | {
      success: true
      payload: {
        user: { userId: string }
        references: {
          SocialStats: Record<
            string,
            {
              userId: number
              usersFollowedCount: number
              usersFollowedByCount: number
            }
          >
        }
      }
    }
  | { success: false; error: string }
type MediumResponse =
  | { error: 0; followers: number }
  | { error: Omit<number, 0>; message: string }

// Medium has some weird characters in front of their JSON response
const JSON_HIJACKING_PREFIX = '])}while(1);</x>'
async function parseResponse(resp: Response): Promise<MediumResponse> {
  const text = await resp.text()
  const sanitiseText = text.replace(JSON_HIJACKING_PREFIX, '')
  const data = JSON.parse(sanitiseText) as MediumRawResponse

  if (data.success) {
    // This required a middle processing procedure, where first we get the
    // userId to get a reference to the SocialStats object, and then we get the
    // followers count by the user's userId
    const uid = data.payload.user.userId
    const user = data.payload.references.SocialStats[uid]
    const followers = user.usersFollowedByCount
    return { error: 0, followers }
  } else {
    return { error: 1, message: data.error }
  }
}

export default async function mediumProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<MediumResponse>({
    providerName: 'medium',
    fetchUrl: `https://medium.com/@${key}?format=json`,
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'count' in d,
    parseResponse: parseResponse,
  })
}
