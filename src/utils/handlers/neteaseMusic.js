/**
 * Fetch follower stats from Netease Music
 *
 * @param {string} uid Netease Music user uid
 */
const fetchNeteaseMusic = uid => {
  // Netease Music api module takes user uid as query parameter
  const url = `https://music.163.com/api/v1/user/detail/${uid}`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Netease Music API response handler
 *
 * @param {string} uid Netease Music user uid
 */
export const neteaseMusicHandler = async uid => {
  const res = {
    source: 'neteaseMusic',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  const response = await fetchNeteaseMusic(uid)
  const stats = await response.json()

  if (stats.code === 200) {
    // Netease Music user with uid found
    res.subs = stats.profile.followeds
  } else {
    // Netease Music user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Netease Music user not found'
  }
  return res
}
