import qs from 'qs'

import { fetchFeedlyStats } from './utils/feedly'
import { fetchSspaiStats } from './utils/sspai'
import { fetchTwitterStats } from './utils/twitter'

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
      // service providers
      source: [],
      // query keys (feed link for RSS; username or slug for others)
      queryKey: [],
    }

    const url = new URL(req)
    const query = qs.parse(url.search, { ignoreQueryPrefix: true })

    // empty query, send greetings
    if (Object.keys(query).length === 0) {
      params.greet = true
      return params
    }

    // if source is null or query key is null, send invalid request
    if (
      query.source === '' ||
      typeof query.source === 'undefined' ||
      query.queryKey === '' ||
      typeof query.queryKey === 'undefined'
    ) {
      params.valid = false
      return params
    }

    // parse source and queryString in query string
    if (typeof query.source === 'string' && typeof query.queryKey === 'string') {
      // single query key, maybe multiple sources
      params.source = query.source.split('|')
      // populate query key list
      params.source.forEach(() => {
        params.queryKey.push(query.queryKey)
      })
    } else if (query.source.length > 1 || query.queryKey.length > 1) {
      // multiple query key, multiple sources
      if (query.source.length === query.queryKey.length) {
        params.source = query.source
        params.queryKey = query.queryKey
      } else {
        // source and queryKey index doesn't match
        params.valid = false
      }
    } else {
      params.valid = false
    }
    console.log(params)
    return params
  } catch (error) {
    return null
  }
}

/**
 * Fetch subscriber stats from list of service providers
 *
 * @param {list} sources List of service providers to query
 * @param {list} queryKey Target query key list
 */
async function fetchStats(sources, queryKey) {
  let result = {
      totalSubs: 0,
      subsInEachSource: {},
      failedSources: {},
    },
    i,
    subs,
    response,
    stats

  // iterate over sources list and queryKey list
  for (i = 0; i < sources.length; i += 1) {
    switch (sources[i]) {
      case 'feedly':
        response = await fetchFeedlyStats(queryKey[i])
        stats = await response.json()
        console.log(response, stats)
        if (!response.ok) {
          subs = 0
          result.failedSources[sources[i]] = stats.errorMessage
        } else {
          try {
            subs = stats.source.subscribers
          } catch (error) {
            subs = 0
            result.failedSources[sources[i]] = 'RSS feed not found on Feedly'
          }
        }
        result.totalSubs += subs
        result.subsInEachSource[sources[i]] = subs
        break
      case 'sspai':
        response = await fetchSspaiStats(queryKey[i])
        stats = await response.json()
        if (stats.error !== 0) {
          subs = 0
          result.failedSources[sources[i]] = stats.msg
        } else {
          subs = stats.data.followed_count
        }
        result.totalSubs += subs
        result.subsInEachSource[sources[i]] = subs
        break
      case 'twitter':
        response = await fetchTwitterStats(queryKey[i])
        stats = await response.json()
        if (stats.length === 0) {
          subs = 0
          result.failedSources[sources[i]] = 'Twitter user not found'
        } else {
          subs = stats[0]['followers_count']
        }
        result.totalSubs += subs
        result.subsInEachSource[sources[i]] = subs
        break
      default:
        // not implemented
        result.subsInEachSource[sources[i]] = 0
        result.failedSources[sources[i]] = 'Not implemented'
    }
  }

  return result
}

/**
 * Respond to query
 *
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
        errorMsg: 'Substats: Sorry, only GET requests are accepted.',
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
        greeting: 'Substats: Begin with a request to see your subscriber count.',
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
          'Substats: Invalid request. You should structure your query as such: /?source={YOUR_SERVICE_PROVIDER}&queryKey={YOUR_QUERY}',
        request: request.url,
      },
    }
    return new Response(JSON.stringify(invalidResp), respInit.invalid)
  }

  // Fetch statistics
  const result = await fetchStats(resp.source, resp.queryKey)

  const finalResp = {
    status: respInit.ok.status,
    data: result,
  }

  response = new Response(JSON.stringify(finalResp), respInit.ok)
  return response
}
