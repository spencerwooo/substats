import qs from 'qs'

import { feedlyHandler } from './utils/feedly'
import { gitHubHandler } from './utils/github'
import { instagramHandler } from './utils/instagram'
import { mediumHandler } from './utils/medium'
import { sspaiHandler } from './utils/sspai'
import { twitterHandler } from './utils/twitter'
import { zhihuHandler } from './utils/zhihu'
import { weiboHandler } from './utils/weibo'

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
  // function's returning value
  let fetchStatsRes = {
    totalSubs: 0,
    subsInEachSource: {},
    failedSources: {},
  }
  // result from upstream service provider
  let res = {
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  // iterate over sources list and queryKey list, we use for loop to accommodate
  // the await functions more easily
  for (let i = 0; i < sources.length; i += 1) {
    switch (sources[i]) {
      case 'feedly':
        res = await feedlyHandler(queryKey[i])
        break
      case 'github':
        res = await gitHubHandler(queryKey[i])
        break
      case 'instagram':
        res = await instagramHandler(queryKey[i])
        break
      case 'medium':
        res = await mediumHandler(queryKey[i])
        break
      case 'sspai':
        res = await sspaiHandler(queryKey[i])
        break
      case 'twitter':
        res = await twitterHandler(queryKey[i])
        break
      case 'zhihu':
        res = await zhihuHandler(queryKey[i])
        break
      case 'weibo':
        res = await weiboHandler(queryKey[i])
        break
      default:
        // not implemented
        res.subs = 0
        res.failed = true
        res.failedMsg = 'Not implemented'
        break
    }

    // populate returned result
    if (res.failed) {
      fetchStatsRes.failedSources[sources[i]] = res.failedMsg
    }
    fetchStatsRes.totalSubs += res.subs
    fetchStatsRes.subsInEachSource[sources[i]] = res.subs
  }

  return fetchStatsRes
}

/**
 * Respond to query
 *
 * @param {Request} request
 */
async function handleRequest(request) {
  const respInit = {
    ok: { status: 200, headers: { 'content-type': 'application/json' } },
    greet: { status: 200, headers: { 'content-type': 'text/html' } },
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

  // Empty request, default to landing page
  if (resp.greet) {
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
      <link href="https://cdn.jsdelivr.net/gh/spencerwooo/Substats@5d015b2a87c44bc47f8cc2f64671f34391f9b5b4/styles/default.min.css" rel="stylesheet">
    </head>
    <body>
      <img id="banner" src="https://substats.spencerwoo.com/img/substats.svg" alt="Substats" width="360px" height="auto" />
      <h6>📈📉 Shhhh...we're counting your subscribers!</h6>
      <div>
        <a href="https://api.spencerwoo.com/substats/"><img src="https://img.shields.io/badge/Now%20on-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=f38020" alt="Now on Cloudflare Workers" ></a>
        <a href="https://stats.uptimerobot.com/92yjVTmk63/784533782"><img src="https://img.shields.io/uptimerobot/status/m784533782-966fa87a7f1afd93c9cc4e51?label=Status&color=00B0D8&logo=probot&logoColor=white" alt="Uptime Robot status" ></a>
        <a href="https://github.com/spencerwooo/Substats/actions?query=workflow%3ADeploy"><img src="https://github.com/spencerwooo/Substats/workflows/Deploy/badge.svg" alt="Deploy" ></a>
        <a href="https://substats.spencerwoo.com/"><img src="https://img.shields.io/netlify/34dba5ee-8e3f-4c0d-bc4e-1023f4a1c2ae?color=01ad9f&label=Docs&logo=netlify" alt="Netlify" ></a>
      </div>
      <div id="code-banner-container">
        <div id="code-banner">
          <code>
            <em>Query Format</em><br>
            <span class="token accent">GET</span> <span class="token source-highlight">/?source=</span>{YOUR_SERVICE_PROVIDER}<span class="token query-highlight">&queryKey=</span><span>{YOUR_QUERY}</span><br><br>
            <em>For instance</em><br>
            <a href="/?source=sspai&queryKey=spencerwoo"><span class="token accent">GET</span> <span class="token source-highlight">/?source=</span><span>sspai</span><span class="token query-highlight">&queryKey=</span><span>spencerwoo</span></a><br>
            <a href="/?source=github&queryKey=spencerwooo"><span class="token accent">GET</span> <span class="token source-highlight">/?source=</span><span>github</span><span class="token query-highlight">&queryKey=</span><span>spencerwooo</span></a><br>
            <em>...</em>
          </code>
          <span id="code-class">HTTP<span>
        </div>
      </div>
      <div class="first-line">🚀 IF YOU SEE THIS PAGE, THEN <strong>SUBSTATS</strong> IS UP AND RUNNING.</div>
      <div class="second-line">🎮 FOR ONLINE DOCUMENTATION, PLEASE REFER TO <a href="https://substats.spencerwoo.com/">SUBSTATS.SPENCERWOO.COM</a>.</div>
      <footer>
        <div><a href="https://github.com/spencerwooo/Substats">GITHUB</a> | <a href="https://substats.spencerwoo.com/">DOCUMENTATION</a> | <a href="https://blog.spencerwoo.com/2020/03/substats/">BLOG POST</a></div>
        <div class="second-line">MADE WITH 💗 BY <a href="https://spencerwoo.com">SPENCER WOO</a> ©2020</div>
      </footer>
    </body>
    </html>
    `
    return new Response(landing, respInit.greet)
  }

  // Invalid request, send 400 bad request
  if (!resp.valid) {
    const invalidResp = {
      status: respInit.invalid.status,
      data: {
        err:
          'Substats: Invalid request. You should structure your query like so: /?source={YOUR_SERVICE_PROVIDER}&queryKey={YOUR_QUERY}',
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
