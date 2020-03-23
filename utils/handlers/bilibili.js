/**
 * Fetch follower stats from Bilibili
 *
 * @param {string} uid Bilibili user uid
 */
const fetchBilibiliStat = uid => {
  // Bilibili api module takes user uid as query parameter
  const url = `https://api.bilibili.com/x/relation/stat?vmid=${uid}&isonp=jsonp`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Bilibili API response handler
 *
 * @param {string} uid Bilibili user uid
 */
export const bilibiliHandler = async uid => {
  const response = await fetchBilibiliStat(uid)
  const stats = await response.json()
  const res = {
    source: 'bilibili',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200 || stats.code !== 0) {
    // Bilibili user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Bilibili user not found'
  } else {
    // Bilibili user found
    res.subs = stats.data.follower
  }

  return res
}
