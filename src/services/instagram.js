/**
 * Fetch follower stats from Instagram
 *
 * @param {string} username Instagram user username
 */
const fetchInstagramStats = username => {
  // Instagram api module takes user username as query parameter
  const url = `https://www.instagram.com/${username}/?__a=1`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Instagram API response handler
 *
 * @param {string} username Instagram username
 */
export const instagramHandler = async username => {
  const response = await fetchInstagramStats(username)
  const res = {
    source: 'instagram',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200) {
    // Instagram user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = `${response.status}: Instagram user not found`
  } else {
    try {
      // Instagram user found
      const stats = await response.json()

      // The API is actually GraphQL instead of REST, but we only need the
      // followers number, so a simple JSON parse should be sufficient
      res.subs = stats.graphql.user.edge_followed_by.count
    } catch (e) {
      // If Substats failed to parse the response as JSON, then it means the
      // API is rate limited by Instagram. Return a failure response.
      res.failed = true
      res.subs = 0
      res.failedMsg =
        'Sorry, Substats has been limited by the Instagram API, please try ' +
        'and host Substats on your own Cloudflare Workers account as a workaround.'
    }
  }

  return res
}
