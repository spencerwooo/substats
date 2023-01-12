import cacheProvider from './cache'
import handler from './handler'

export default {
  async fetch(
    request: Request,
    env: Env,
    context: FetchEvent,
  ): Promise<Response> {
    // Global cache reference
    const cache = caches.default
    // Get cacheKey and matched response (if any) from the cache provider
    const { cacheKey, response } = await cacheProvider(cache, request)

    // Only serve cache under production
    if (env.ENVIRONMENT === 'production') {
      // If we have a cached response, return it immediately
      if (response) return response
    }

    // On cache miss, we pass the request to the router
    const freshResponse = await handler(request, env, context)

    // Cloudflare Edge Cache-Control TTL, 5 minutes for statistics response
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
