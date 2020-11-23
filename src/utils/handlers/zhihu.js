/**
 * Fetch follower stats from Zhihu
 *
 * @param {string} urlToken Zhihu user urlToken
 */
const fetchZhihuStat = urlToken => {
  // Zhihu api module takes user urlToken as query parameter (more querys use comma to separate)
  // for instance: follower_count,following_count,following_topic_count,following_question_count...
  const url = `https://www.zhihu.com/api/v4/members/${urlToken}?include=follower_count`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
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
    res.subs = stats.follower_count
  }

  return res
}
