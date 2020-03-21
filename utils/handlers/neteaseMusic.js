/**
 * Fetch follower stats from Netease Music
 *
 * @param {string} uid Netease Music user uid
 */
const fetchNeteaseMusic = uid => {
  // Netease Music api module takes user uid as query parameter
  // TODO: find a valid API
  const url = `https://music.163.com/#/user/home?id=${uid}`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Netease Music API response handler
 *
 * @param {string} uid Netease Music user uid
 */
export const neteaseMusicHandler = async uid => {
  // TODO: implement netease music API
  // const response = await fetchNeteaseMusic(uid)
  // const respHtml = await response.text()
  // console.log(respHtml)

  let res = {
    source: 'neteaseMusic',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  try {
    // TODO: implement netease music fan count
    const fan_count = 0
    res.subs = fan_count
    throw 'To be implemented.'
  } catch (e) {
    // Netease Music user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = e
  }
  return res
}
