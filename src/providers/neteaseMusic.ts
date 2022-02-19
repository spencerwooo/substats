import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://music.163.com/#/user/home?id=416608258
type NeteaseMusicResponse =
  | { code: 200; profile: { followeds: number } }
  | { code: 400; message: string }
  | { code: 404 }

export default async function neteaseMusicProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<NeteaseMusicResponse>({
    providerName: 'neteasemusic',
    fetchUrl: `https://music.163.com/api/v1/user/detail/${key}`,
    countObjPath: 'profile.followeds',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.code === 200 && 'profile' in d,
  })
}
