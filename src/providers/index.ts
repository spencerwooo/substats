import type {
  ProviderFunctions,
  SubstatsResponse,
  SupportedProviders,
} from '@/types'

import objectPath from 'object-path'

import bilibiliProvider from './bilibili'
import sspaiProvider from './sspai'

type FailedSubstatsResponse = Extract<SubstatsResponse, { failed: true }>

export async function commonProviderHandler<T>({
  name,
  url,
  countObjPath,
  errorMessageObjPath,
  isResponseValid,
}: {
  name: SupportedProviders
  url: string
  countObjPath: string
  errorMessageObjPath: string
  isResponseValid: (d: T) => boolean
}): Promise<SubstatsResponse> {
  try {
    const resp = await fetch(url, { cf: { cacheEverything: true } })
    const data = await resp.json<T>()
    console.log(data)

    // If responded data is not null or undefined, and is valid by checking the
    // data against the callback isResponseValid()
    if (isResponseValid(data)) {
      return {
        source: name,
        failed: false,
        count: objectPath.get<number>(
          data as unknown as Record<string, unknown>,
          countObjPath,
          0,
        ),
      }
    }

    throw new Error(
      objectPath.get<string>(
        data as unknown as Record<string, unknown>,
        errorMessageObjPath,
        `An error occured with the ${name} API`,
      ),
    )
  } catch (error) {
    return providerErrorHandler(error, name)
  }
}

export function providerErrorHandler(
  error: unknown,
  provider: string,
): FailedSubstatsResponse {
  return {
    source: provider,
    failed: true,
    message:
      // Failing and throwing the error gracefully
      error instanceof Error
        ? error.message
        : `An error occured with the ${provider} API`,
  }
}

export default function getProviders(): Record<
  SupportedProviders,
  ProviderFunctions
> {
  return {
    bilibili: bilibiliProvider,
    sspai: sspaiProvider,
  }
}
