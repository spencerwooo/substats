export default async function cacheProvider(
  cache: Cache,
  request: Request,
): Promise<{ cacheKey: Request; response: Response | null }> {
  // Generate cache key based on request url
  const cacheUrl = new URL(request.url)
  const cacheKey = new Request(cacheUrl.toString(), request)

  // Check if we have a cached response for this request
  let response = await cache.match(cacheKey)
  // If not, we return null to indicate that we need to pass on the request to
  // the router so that we get a fresh response
  if (!response) return { cacheKey, response: null }

  // Upon cache hit, we return the cached response immediately
  console.log('Edge cache hit!')
  response = new Response(response.body, response)
  // Set Cloudflare Edge cache hit
  response.headers.set('CF-Cache-Status', 'HIT')
  // Browser Cache-Control TTL, set to 0 to disable Browser cache
  response.headers.set('Cache-Control', 'max-age=0')

  return { cacheKey, response }
}
