import qs from 'qs'

// import all handlers from different platforms into a global object
import { services } from './serviceProviders'

//! register sources that return non-numbers here, if a source doesn't return a number, we will handle it separately
const singleOnlySources = ['afdianIncome']

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/**
 * Parse request parameters
 *
 * @param {Request} req
 */
function parseRequest(req) {
  try {
    const params = {
      // check if query is valid
      valid: true,
      // if query is empty, send default greetings message
      greet: false,
      // some sources don't return a number, for those we accept only single requests
      singleOnly: false,
      singleOnlySrc: '',
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

    // if returned value is not a number, only single requests are supported
    if (typeof query.source !== 'string' && query.source.length > 1) {
      query.source.forEach(src => {
        if (singleOnlySources.includes(src)) {
          params.valid = false
          params.singleOnly = true
          params.singleOnlySrc = src
          return params
        }
      })
    }

    // parse source and queryString in query string
    if (typeof query.source === 'string' && typeof query.queryKey === 'string') {
      // single query key, maybe multiple sources
      params.source = query.source.split('|')

      if (params.source.length === 1) {
        // single source
        params.singleOnly = true
        // populate query key list (we takes a list as input, even when there's only one query)
        params.queryKey.push(query.queryKey)
      } else {
        // multiple sources
        params.source.forEach(src => {
          // detect if a singleOnly source is requested inside multiple requests
          if (singleOnlySources.includes(src)) {
            params.valid = false
            params.singleOnly = true
            params.singleOnlySrc = src
          }
          // populate query key list
          params.queryKey.push(query.queryKey)
        })
      }
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
    console.error(error)
    return null
  }
}

/**
 * Fetch subscriber stats from list of service providers
 *
 * @param {bool} singleOnly Whether or not we add up all subs for each source
 * @param {list} sources List of service providers to query
 * @param {list} queryKey Target query key list
 */
async function fetchStats(singleOnly, sources, queryKey) {
  // function's returning value
  const fetchStatsRes = {
    totalSubs: 0,
    subsInEachSource: {},
    failedSources: {},
  }

  // reference handlers
  const handlers = services()

  // construct big concurrent promise array
  const resPromise = []
  sources.forEach((source, i) => {
    // init source specific array with 0 subs each
    fetchStatsRes.subsInEachSource[source] = 0
    // create promise array
    if (source in handlers) {
      resPromise.push(handlers[source](queryKey[i]))
    } else {
      // not implemented
      fetchStatsRes.failedSources[source] = 'Not implemented'
    }
  })

  // parallel requests take off!
  await Promise.allSettled(resPromise).then(sourceReturns => {
    sourceReturns.forEach(res => {
      if (res.status === 'fulfilled') {
        // promise fulfilled (fetch succeeded)
        if (res.value.failed) {
          // error occured on fetch end
          fetchStatsRes.failedSources[res.value.source] = res.value.failedMsg
        } else {
          // successfully fetched subs
          if (singleOnly) {
            // if requested source is singleOnly source, we won't add up all sources
            fetchStatsRes.totalSubs = res.value.subs
          } else {
            fetchStatsRes.totalSubs += res.value.subs
          }
          fetchStatsRes.subsInEachSource[res.value.source] = res.value.subs
        }
      }
      // promise rejected (fetch failed)
      if (res.status === 'rejected') {
        fetchStatsRes.failedSources['substats-error'] = res.reason
      }
    })
  })
  return fetchStatsRes
}

/**
 * Respond to query
 *
 * @param {Event} event
 */
async function handleRequest(event) {
  const request = event.request
  // enable CORS
  const headersJson = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  }
  // default page returns html
  const headersHtml = {
    'Content-Type': 'text/html',
  }

  const respInit = {
    ok: { status: 200, headers: headersJson },
    greet: { status: 200, headers: headersHtml },
    ban: { status: 403, headers: headersJson },
    invalid: { status: 400, headers: headersJson },
  }

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

  // Use Worker Cache API to get/set request caches
  const cache = caches.default
  const cacheKey = new Request(new URL(request.url).toString(), request)
  // Try to find cached response in the Cloudflare Edge cache
  let response = await cache.match(cacheKey)
  // Edge Cache found
  if (response) {
    console.log('Edge Cache hit!')
    // Repack response to make headers mutable
    response = new Response(response.body, response)
    // Set Cloudflare Edge cache hit
    response.headers.set('CF-Cache-Status', 'HIT')
    // Browser Cache-Control TTL, set to 0 to disable Browser cache
    response.headers.set('Cache-Control', 'max-age=0')
    // Emit cached response immediately
    return response
  } else {
    console.log('Edge Cache miss.')
  }

  // Empty request, default to landing page
  if (resp.greet) {
    // latest commit hash for jsDelivr to use when loading external JS and CSS
    const COMMIT_HASH = 'a5dbafea730dc41afd7c9cf57c0943152171ffd4'
    // Cloudflare doesn't allow static site hosting for free plans,
    // so I have to settle for inline HTML and styles. Sad!
    const landing = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Home | Substats API</title>
      <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/gh/spencerwooo/Substats@${COMMIT_HASH}/styles/default.min.css" rel="stylesheet">
      <link rel="shortcut icon" type="image/png" sizes="16x16" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACCUlEQVQ4jY2Rz2sTURDHJ0hBPYj4A2yyzcwW7U1UFIrU7Ir/hIfeevAf8KQ28ObZ9qh4KRU8WA2CIVs8elZRhB5EKPWiFTwoWmmSnZeku9HnIbvJNlbsg3d5M3xmvp8HwvjLMG4Ku6uG8YEwTocLJ47DXo8w2V1uQxQ+lrJ75v8ARRvC9F00dncBtUXTvS1Fh/8JsBZyVuUPtudcDJmuhoqeGk2yE4RrUnZO7zlWfRbdkGlRNHUykM22Hiv91dzSxamOGp/YULR/uBYq1wsZP2YgP0TR2Z0OGH+bXv5vomm5qYtTFiCX1tsqXxSm95lIHxrKOZIBDInT2BXGR02VP9bfUhUcYfqU9oRMS5AOEcZKyPhaGM0QbL0x65xKIU3tloT7TrbrauzC4CcAcq05p2AUzhumLGjNLhSO9p0wLWZqTyATFQaT8KIwfR1EomVre41bt1wMGUNhsoZRzE0cBVuZPBQH/o0oKC3Gz/wSAEBTFS8ZTa3EfNwo02Q6wDBVU7hROANxcLkWBb5Nbiuqeed6X0h3h6Slzqb7AKaHENX8KAOwceBdBwDoKOekMEVJ82d7//xIb7vxCWGMk/d3EAX+ywygG694VwAAbBX2CdN6at3M4ygAwJc7zgGTeBCmn9Cueu524FWiFf9FVPNmUmFJ3iXD9NYwvanfRhcAYPUajAjT8947vvoDw+eYQXI6eiYAAAAASUVORK5CYII=" />
    </head>
    <body>
      <img id="banner" src="https://substats.spencerwoo.com/img/substats.svg" alt="Substats" width="360px" height="auto" />
      <h6>📈📉 Shhhh...we're counting your subscribers!</h6>
      <div>
        <a href="https://api.spencerwoo.com/substats/"><img
            src="https://img.shields.io/badge/Now%20on-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=f38020"
            alt="Now on Cloudflare Workers"></a>
        <a href="https://stats.uptimerobot.com/92yjVTmk63/784533782"><img
            src="https://img.shields.io/uptimerobot/status/m784533782-966fa87a7f1afd93c9cc4e51?label=Status&color=00B0D8&logo=probot&logoColor=white"
            alt="Uptime Robot status"></a>
        <a href="https://github.com/spencerwooo/Substats/actions?query=workflow%3ADeploy"><img
            src="https://github.com/spencerwooo/Substats/workflows/Deploy/badge.svg" alt="Deploy"></a>
        <a href="https://substats.spencerwoo.com/"><img
            src="https://badgen.net/https/now.swoo.workers.dev/dpl_FiMBkC6zs1o9eb36Hzd1fgnstM1D?labelColor=black&label=Vercel&icon=zeit"
            alt="Vercel"></a>
      </div>
      <div id="code-banner-container">
        <div id="code-banner">
          <code>
            <em>Query Format</em><br>
            <span class="token accent">GET</span> <span class="token source-highlight">/?source=</span>{YOUR_SERVICE_PROVIDER}<span class="token query-highlight">&queryKey=</span><span>{YOUR_QUERY}</span><br><br>
            <em>For instance</em><br>
            <a href="/substats/?source=sspai&queryKey=spencerwoo"><span class="token accent">GET</span> <span class="token source-highlight">/?source=</span><span>sspai</span><span class="token query-highlight">&queryKey=</span><span>spencerwoo</span></a><br>
            <a href="/substats/?source=github&queryKey=spencerwooo"><span class="token accent">GET</span> <span class="token source-highlight">/?source=</span><span>github</span><span class="token query-highlight">&queryKey=</span><span>spencerwooo</span></a><br>
            <em>...</em>
            <span id="code-class">HTTP<span>
          </code>
        </div>
      </div>
      <div class="first-line">🚀 IF YOU SEE THIS PAGE, THEN <strong>SUBSTATS</strong> IS UP AND RUNNING.</div>
      <div class="second-line">🎮 FOR ONLINE DOCUMENTATION, PLEASE REFER TO <a
          href="https://substats.spencerwoo.com/">SUBSTATS.SPENCERWOO.COM</a>.</div>
      <footer>
        <div><a href="https://github.com/spencerwooo/Substats">GITHUB</a> | <a
            href="https://substats.spencerwoo.com/">DOCUMENTATION</a> | <a
            href="https://blog.spencerwoo.com/2020/03/substats/">BLOG POST</a></div>
        <div class="second-line">MADE WITH 💗 BY <a href="https://spencerwoo.com">SPENCER WOO</a> ©2020</div>
      </footer>
    </body>
    <script src="https://cdn.jsdelivr.net/gh/spencerwooo/Substats@${COMMIT_HASH}/styles/default.min.js"></script>
    </html>
    `
    response = new Response(landing, respInit.greet)
    // Cloudflare Edge Cache-Control TTL, 4-hours for Landing page
    response.headers.set('Cache-Control', 'public, max-age=14400')
    event.waitUntil(cache.put(cacheKey, response.clone()))
    // Set Cloudflare Edge cache miss
    response.headers.set('CF-Cache-Status', 'MISS')
    return response
  }

  // Invalid request, send 400 bad request
  if (resp.valid === false) {
    const invalidErr = `Substats: Invalid request. You should structure your query like so: /?source={YOUR_SERVICE_PROVIDER}&queryKey={YOUR_QUERY}`
    const singleOnlyErr = `Substats: Invalid request. For source: '${resp.singleOnlySrc}' we only accept single requests.`
    let err = ''
    if (resp.singleOnly) {
      err = singleOnlyErr
    } else {
      err = invalidErr
    }
    const invalidResp = {
      status: respInit.invalid.status,
      data: {
        err: err,
        request: request.url,
      },
    }
    return new Response(JSON.stringify(invalidResp), respInit.invalid)
  }

  // Fetch statistics
  const result = await fetchStats(resp.singleOnly, resp.source, resp.queryKey)
  const finalResp = {
    status: respInit.ok.status,
    data: result,
  }
  response = new Response(JSON.stringify(finalResp), respInit.ok)
  // Cloudflare Edge Cache-Control TTL, 5-minutes for statistics response
  response.headers.set('Cache-Control', 'public, max-age=300')
  // Store the fetched statistics as cacheKey
  event.waitUntil(cache.put(cacheKey, response.clone()))
  // Set Cloudflare Edge cache miss
  response.headers.set('CF-Cache-Status', 'MISS')
  // Browser Cache-Control TTL, set to 0 to disable Browser Cache
  response.headers.set('Cache-Control', 'max-age=0')
  return response
}
