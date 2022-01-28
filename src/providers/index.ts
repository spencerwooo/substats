import type { ProviderFunctions } from '../types'

import sspaiProvider from './sspai'

export default function getProviders(): Record<string, ProviderFunctions> {
  return {
    sspai: sspaiProvider,
  }
}
