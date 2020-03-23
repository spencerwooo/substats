/**
 * Fetch follower stats from Zhihu
 *
 * @param {string} urlToken Zhihu user urlToken
 */
const fetchZhihuStat = urlToken => {
  // zhihu api module takes user urlToken as query parameter
  const url = `https://www.zhihu.com/api/v4/members/${urlToken}/followers?limit=1`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Zhihu API response handler
 *
 * @param {string} urlToken Zhihu user urlToken
 */
export const zhihuHandler = async urlToken => {
  const response = await fetchZhihuStat(urlToken)
  const stats = await response.json()
  const res = {
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
