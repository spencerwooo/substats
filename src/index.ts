import cacheProvider from './cache'
import { handleRequest } from './handler'
export default {
  async fetch(
    request: Request,
    env: Env,
    context: FetchEvent,
  ): Promise<Response> {
    const { cacheKey, response: cachedResponse } = await cacheProvider(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const cache = caches.default
    const freshResponse = await handleRequest(request, env)

    // Cloudflare Edge Cache-Control TTL, 5-minutes for statistics response
    freshResponse.headers.set('Cache-Control', 'public, max-age=300')
    // Store the fetched statistics as cacheKey (context.waitUntil so we can
    // return the response without blocking on writing to cache)
    context.waitUntil(cache.put(cacheKey, freshResponse.clone()))

    // Set Cloudflare Edge cache miss
    freshResponse.headers.set('CF-Cache-Status', 'MISS')
    // Browser Cache-Control TTL, set to 0 to disable Browser Cache
    freshResponse.headers.set('Cache-Control', 'max-age=0')
    return freshResponse
  },
}
