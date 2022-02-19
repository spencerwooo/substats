import type {
  ProviderFunctions,
  SubstatsResponse,
  SupportedProviders,
} from '@/types'

import objectPath from 'object-path'

import afdianProvider from './afdian'
import bilibiliProvider from './bilibili'
import coolapkProvider from './coolapk'
import sspaiProvider from './sspai'

type FailedSubstatsResponse = Extract<SubstatsResponse, { failed: true }>

/**
 * A common provider handler which fetches JSON data from fetchUrl and extracts
 * the count value (a number) from the path specified by countObjPath, returning
 * the data as a SubstatsResponse. If the response is not valid, it returns a
 * FailedSubstatsResponse.
 * @param {object} CommonProviderHandler
 * @property {SupportedProviders} providerName - The name of the provider
 * @property {string} fetchUrl - The URL to fetch JSON data from
 * @property {Record<string, string>} optionalHeaders - Optional headers to
 *  add when requesting the fetchUrl (mostly used for authentication)
 * @property {string} countObjPath - The path to the count value in the JSON
 * @property {string} errorMessageObjPath - The path to the error message
 * @property {(data: unknown) => boolean} isResponseValid - Checks if the
 * response is valid against a specific requirement (differs per provider)
 * @returns {Promise<SubstatsResponse>} The data as a SubstatsResponse
 */
export async function commonProviderHandler<T>({
  providerName,
  fetchUrl,
  optionalHeaders,
  countObjPath,
  errorMessageObjPath,
  isResponseValid,
}: {
  providerName: SupportedProviders
  fetchUrl: string
  optionalHeaders?: Record<string, string>
  countObjPath: string
  errorMessageObjPath: string
  isResponseValid: (d: T) => boolean
}): Promise<SubstatsResponse> {
  try {
    const resp = await fetch(fetchUrl, {
      headers: optionalHeaders ?? {
        'User-Agent': 'Mozilla/5.0 (compatible; Substatsbot/2.0)',
      },
      cf: { cacheEverything: true },
    })
    const data = await resp.json<T>()
    console.log(data)

    // If responded data is not null or undefined, and is valid by checking the
    // data against the callback isResponseValid()
    if (isResponseValid(data)) {
      const count = objectPath.get(
        data as unknown as Record<string, unknown>,
        countObjPath,
        0,
      )
      return {
        source: providerName,
        failed: false,
        count: typeof count === 'number' ? count : 0,
      }
    }

    throw new Error(
      objectPath.get<string>(
        data as unknown as Record<string, unknown>,
        errorMessageObjPath,
        `An error occured with the ${providerName} API`,
      ),
    )
  } catch (error) {
    return providerErrorHandler(error, providerName)
  }
}

/**
 * A function for handling and gracefully responsing errors thrown from the
 * commonProviderHandler().
 * @param error - The error thrown by the provider
 * @param provider - The name of the provider
 * @returns {FailedSubstatsResponse} The error as a FailedSubstatsResponse
 */
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

/**
 * Returns a mapping of provider names to provider functions.
 */
export default function getProviders(): Record<
  SupportedProviders,
  ProviderFunctions
> {
  return {
    afdian: afdianProvider,
    bilibili: bilibiliProvider,
    coolapk: coolapkProvider,
    sspai: sspaiProvider,
  }
}
