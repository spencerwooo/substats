/**
 * Get Info about Weibo
 *
 * @param {string} userId Weibo user ID
 */
const fetchWeiboStat = userId => {
  // Weibo API expects a user ID
  const url = `https://m.weibo.cn/api/container/getIndex?containerid=100505${userId}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Weibo API response handler
 *
 * @param {string} userId Weibo user ID
 */
export const weiboHandler = async userId => {
  const response = await fetchWeiboStat(userId)
  const stats = await response.json()
  const res = {
    source: 'weibo',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (!stats.ok) {
    // Weibo user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.msg
  } else {
    // Weibo user found
    res.subs = stats.data.userInfo.followers_count
  }

  return res
}
