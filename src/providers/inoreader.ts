import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// type InoreaderResponse = { data: unknown } | { error: unknown }

export default async function inoreaderProvider(
  key: string,
): Promise<SubstatsResponse> {
  // TODO: not working yet
  return providerErrorHandler(
    new Error(`sorry ${key}, this route is not working yet`),
    'inoreader',
    key,
  )
}
