/**
 * Fetch RSS stats from NewsBlur
 * API docs: https://newsblur.com/api#/rss_feeds/search_feed
 *
 * NOTE: NewsBlur API require authentication
 *
 * @param {string} rss NewsBlur RSS feed url to query
 */
const fetchNewsBlurStats = (rss, cookie) => {
  // encode NewsBlur API requests
  const req = encodeURIComponent(rss)

  // NewsBlur api module takes an encoded `feed/{link}` URL as query parameter
  const url = `https://newsblur.com/rss_feeds/search_feed?address=${req}`
  const headers = { 'User-Agent': 'substat-bot', Cookie: cookie }
  return fetch(url, { headers })
}

/**
 * Authenticate with NewsBlur API
 * TO-DO: Add CRON job to store cookies in Cloudflare using KV (may require a subscription)
 *
 * @param {string} token NewsBlur login token
 */
const authNewsBlur = token => {
  // authenticate first
  const authUrl = 'https://newsblur.com/api/login'
  const authHeaders = {
    'User-Agent': 'substat-bot',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  }
  return fetch(authUrl, {
    body: `username=${token}`,
    method: 'POST',
    headers: authHeaders,
  })
}

/**
 * Get NewsBlur login cookie
 * (OMG Cloudflare Workers don't preserve cookies? Seriously?)
 *
 * @param {string} key cookie name
 */
const getCookie = (req, key) => {
  let result = null
  const cookieString = req.headers.get('Set-Cookie')
  if (cookieString) {
    const cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim()
      if (cookieName === key) {
        result = cookie
      }
    })
  }
  return result
}

/**
 * NewsBlur API response handler
 *
 * @param {string} rss NewsBlur RSS feed url to query
 */
export const newsblurHandler = async rss => {
  const res = {
    source: 'newsblur',
    subs: 0,
    failed: true,
    failedMsg: '',
  }

  try {
    // authenticate first
    // eslint-disable-next-line no-undef
    const newsblurLoginResp = await authNewsBlur(NEWSBLUR_TOKEN)
    const newsblurLoginStat = await newsblurLoginResp.json()

    if (!newsblurLoginStat.authenticated) {
      // authentication failed
      const errMsg = JSON.stringify(newsblurLoginStat.errors)
      res.failedMsg = `Authentication failed at login: ${errMsg}`
    } else {
      // successfully authed
      const cookie = getCookie(newsblurLoginResp, 'newsblur_sessionid')
      const response = await fetchNewsBlurStats(rss, cookie)

      if (response.status === 200) {
        const stats = await response.json()

        if (stats.result === 'ok') {
          // request success
          if (stats.code === undefined) {
            // no error code, feed found, real success!
            res.subs = stats.subs
            res.failed = false
          } else {
            // feed not found
            res.failedMsg = stats.message
          }
        } else {
          // request failed
          res.failedMsg = 'NewsBlur API Error'
        }
      } else {
        // authentication failed
        res.failedMsg = 'Authentication failed at feed fetch'
      }
    }
  } catch (error) {
    res.failedMsg = error
  }

  return res
}
