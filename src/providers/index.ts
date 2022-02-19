import type {
  ProviderFunctions,
  SubstatsResponse,
  SupportedProviders,
} from '@/types'

import bilibiliProvider from './bilibili'
import sspaiProvider from './sspai'

type FailedSubstatsResponse = Extract<SubstatsResponse, { failed: true }>

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
