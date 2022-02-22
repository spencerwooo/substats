import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// /stats/common/?endpoint=https://xkcd.com/info.0.json&datapath=num
// /stats/common?endpoint=https://api.genshin.dev/domains/cecilia-garden&datapath=rewards.0.details.0.mora
export default async function commonEndpointProvider(
  _key: string,
  _env: Env,
  endpoint?: string,
  datapath?: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<unknown>({
    providerName: 'common',
    queryKey: datapath ?? '',
    fetchUrl: endpoint ?? '',
    countObjPath: datapath ?? '',
    errorMessageObjPath: 'no error message fallback to default',
    // There is no way for us to validate this data as the URL is user-provided,
    // so we just return true for every scenario and let the error get thrown by
    // the commonProviderHandler() if it fails.
    isResponseValid: () => true,
  })
}
