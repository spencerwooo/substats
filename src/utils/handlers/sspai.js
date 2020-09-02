/**
 * Fetch follower stats from sspai
 *
 * @param {string} slug sspai slug
 */
const fetchSspaiStats = slug => {
  // sspai api module takes user slug as query parameter
  const url = `https://sspai.com/api/v1/user/slug/info/get?slug=${slug}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * SSPAI API response handler
 *
 * @param {string} slug sspai slug
 */
export const sspaiHandler = async slug => {
  const response = await fetchSspaiStats(slug)
  const stats = await response.json()
  const res = {
    source: 'sspai',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (stats.error !== 0) {
    // sspai user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.msg
  } else {
    // sspai user found
    res.subs = stats.data.followed_count
  }

  return res
}
