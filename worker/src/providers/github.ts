import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

type GithubResponse = { followers: number } | { message: string }

export default async function githubProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<GithubResponse>({
    providerName: 'github',
    queryKey: key,
    fetchUrl: `https://api.github.com/users/${key}`,
    countObjPath: 'followers',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'followers' in d,
  })
}
