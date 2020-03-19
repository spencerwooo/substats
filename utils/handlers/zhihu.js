/**
 * Fetch follower stats from Zhihu
 *
 * @param {string} url_token Zhihu user url_token
 */
const fetchZhihuStat = url_token => {
  // zhihu api module takes user url_token as query parameter
  const url = `https://www.zhihu.com/api/v4/members/${url_token}/followers?limit=1`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Zhihu API response handler
 *
 * @param {string} url_token Zhihu user url_token
 */
export const zhihuHandler = async url_token => {
  const response = await fetchZhihuStat(url_token)
  const stats = await response.json()
  let res = {
    source: 'zhihu',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200) {
    // Zhihu user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.error.message
  } else {
    // Zhihu user found
    res.subs = stats.paging.totals
  }

  return res
}
