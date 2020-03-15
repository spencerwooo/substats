import qs from 'qs'

import { fetchFeedlyStats } from './utils/feedly'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Parse request parameters
 *
 * @param {Request} req
 */
function parseRequest(req) {
  try {
    let params = {
      // check if query is valid
      valid: true,
      // if query is empty, send default greetings message
      greet: false,
      // RSS service providers (currently Feedly is supported)
      source: [],
      // RSS subscription link (URL)
      rss: '',
    }

    const url = new URL(req)
    const query = qs.parse(url.search, { ignoreQueryPrefix: true })

    // empty query, send greetings
    if (Object.keys(query).length === 0) {
      params.greet = true
      return params
    }

    // if source is null or rss link is null, send invalid request
    if (
      query.source === '' ||
      typeof query.source === 'undefined' ||
      query.rss === '' ||
      typeof query.rss === 'undefined'
    ) {
      params.valid = false
      return params
    }

    // parse source and rss in query string
    params.source = query.source.split('|')
    params.rss = query.rss
    return params
  } catch (error) {
    return null
  }
}

/**
 * Fetch RSS link statistics from list of RSS providers
 *
 * @param {list} sources List of RSS service providers to query
 * @param {URL} url Target RSS link
 */
async function fetchStats(sources, url) {
  let result = {
    totalSubs: 0,
    subsInEachSource: {},
    failedSources: [],
  }

  for await (const source of sources) {
    switch (source) {
      case 'feedly':
        try {
          const response = await fetchFeedlyStats(url)
          const stats = await response.json()
          console.log('Success:', source, stats.source)

          // fetch feedly stats failed
          if (!response.ok) {
            throw new Error(stats.errorMessage)
          }

          // fetch feedly stats success
          const subs = stats.source.subscribers
          result.totalSubs += subs
          result.subsInEachSource[source] = subs
        } catch (error) {
          console.log(error)
          result.failedSources.push(source)
        }
        break
      default:
        console.log('Not implemented:', source)
        result.subsInEachSource[source] = 0
        result.failedSources.push(source)
    }
  }

  return result
}

/**
 * Respond
 * @param {Request} request
 */
async function handleRequest(request) {
  const respInit = {
    ok: { status: 200, headers: { 'content-type': 'application/json' } },
    ban: { status: 403, headers: { 'content-type': 'application/json' } },
    invalid: { status: 400, headers: { 'content-type': 'application/json' } },
  }
  let response = null

  // Ban all requests other than GET
  if (request.method !== 'GET') {
    const errorResp = {
      status: respInit.ban.status,
      data: {
        errorMsg: '[RSS stats] Sorry, only GET requests are accepted.',
        requestMethod: request.method,
      },
    }
    return new Response(JSON.stringify(errorResp), respInit.ban)
  }

  const resp = parseRequest(request.url)

  // Empty request, send greetings
  if (resp.greet) {
    const greetingResp = {
      status: respInit.ok.status,
      data: {
        greeting:
          '[RSS stats] Begin with a request to see your RSS subscriber count.',
        request: request.url,
      },
    }
    return new Response(JSON.stringify(greetingResp), respInit.ok)
  }

  // Invalid request, send 400 bad request
  if (!resp.valid) {
    const invalidResp = {
      status: respInit.invalid.status,
      data: {
        err:
          '[RSS stats] Invalid request. Valid requests: /?source={YOUR_RSS_PROVIDER}&rss={YOUR_RSS_LINK}',
        request: request.url,
      },
    }
    return new Response(JSON.stringify(invalidResp), respInit.invalid)
  }

  // Fetch statistics
  const result = await fetchStats(resp.source, resp.rss)
  console.log(result)

  const finalResp = {
    status: respInit.ok.status,
    data: result,
  }

  response = new Response(JSON.stringify(finalResp), respInit.ok)
  return response
}
