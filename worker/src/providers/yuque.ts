import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://www.yuque.com/lyndon
// https://www.yuque.com/api/actions?action_type=follow&target_id=85213&target_type=User
type YuqueResponse =
  | { data: { count: number } }
  | {
      code: string
      key: string
      status: string
      detail: [{ message: string; field: string; code: string }]
      message: string
    }

export default async function yuqueProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<YuqueResponse>({
    providerName: 'yuque',
    queryKey: key,
    // fetchUrl: `https://www.yuque.com/api/users/${key}/profile?`,
    fetchUrl: `https://www.yuque.com/api/actions?action_type=follow&target_id=${key}&target_type=User`,
    countObjPath: 'data.count',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'data' in d && 'count' in d.data,
  })
}
