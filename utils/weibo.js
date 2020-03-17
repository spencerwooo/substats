/**
 * Get Info about Weibo
 *
 * @param {string} user_id Weibo user ID
 */
const fetchWeiboStat = user_id => {
  // Weibo API expects a user ID
  const url = `https://m.weibo.cn/api/container/getIndex?containerid=100505${user_id}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Weibo API response handler
 *
 * @param {string} user_id Weibo user ID
 */
export const weiboHandler = async user_id => {
  const response = await fetchWeiboStat(user_id)
  const stats = await response.json()
  let res = {
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
