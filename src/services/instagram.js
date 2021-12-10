const userAgent = 'substat-bot'

/**
 * Simulate logging into Instagram
 */
const loginInstagram = () => {
  const url = 'https://www.instagram.com/accounts/login/ajax/'
  const fakeToken = 'PlanRebel'
  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: `ig_cb=1; csrftoken=${fakeToken}`,
    'X-Csrftoken': fakeToken,
    'User-Agent': userAgent,
  }
  return fetch(url, {
    body: `username=${IG_EMAIL}&enc_password=#PWD_INSTAGRAM_BROWSER:0:${new Date().getTime()}:${IG_PWD}`,
    headers,
    method: 'POST',
  })
}

/**
 * Extract the cookie from the response
 *
 * @param {Response} response Response after simulating logging
 */
const parseInstagramCookie = response => {
  const keys = ['csrftoken', 'ds_user_id', 'rur', 'sessionid']
  return response.headers
    .get('set-cookie')
    .replaceAll('Secure, ', '')
    .split('; ')
    .map(element => {
      if (keys.some(key => element.startsWith(key))) {
        return element
      } // end if
    })
    .filter(Boolean)
    .join('; ')
}

/**
 * Fetch follower stats from Instagram
 *
 * @param {string} username Instagram user username
 * @param {Boolean} useKv A flag indicating if the cookie stored in KV should be used
 * @returns
 */
const fetchInstagramStats = async (username, useKv) => {
  // Bypass Instagram automatic redirect to login page
  const COOKIE_KV_KEY = 'ig-cookie'
  var cookie = await KV.get(COOKIE_KV_KEY)

  if (cookie == null || useKv === false) {
    const response = await loginInstagram()
    cookie = parseInstagramCookie(response)
    await KV.put(COOKIE_KV_KEY, cookie)
  }

  // Instagram api module takes user username as query parameter
  const url = `https://www.instagram.com/${username}/?__a=1`
  const headers = {
    Cookie: `${cookie}; ig_cb=1`,
    'User-Agent': userAgent,
  }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Process follower stats fetched
 *
 * @param {string} username Instagram user username
 * @param {Boolean} useKv A flag indicating if the cookie stored in KV should be used
 * @returns
 */
const processResponse = async (username, useKv) => {
  const response = await fetchInstagramStats(username, useKv)

  if (response.status === 404) {
    return { error: response.status }
  }

  const stats = await response.json()
  // The API is actually GraphQL instead of REST, but we only need the
  // followers number, so a simple JSON parse should be sufficient
  return { count: stats.graphql.user.edge_followed_by.count }
}

/**
 * Instagram API response handler
 *
 * @param {string} username Instagram username
 */
export const instagramHandler = async username => {
  const res = {
    source: 'instagram',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  try {
    var result = await processResponse(username, true)
    res.subs = result.count
  } catch (e1) {
    // Execute again to update expired cookie
    try {
      result = await processResponse(username, false)
      res.subs = result.count
    } catch (e2) {
      // If Substats still failed to parse the response as JSON, then it most
      // likely means the way to retrieve the follower count is limited by
      // Instagram. Another workaround may be required.
      res.failed = true
      res.subs = 0
      res.failedMsg =
        'Sorry, Substats has been limited by the Instagram API, please try ' +
        'and host Substats on your own Cloudflare Workers account as a workaround.'
    }
  }

  if (result.error != null) {
    // Instagram user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = `${result.error}: Instagram user not found`
  }

  return res
}
