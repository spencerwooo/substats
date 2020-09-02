/**
 * Fetch follower stats from Medium
 *
 * @param {string} username Medium user username
 */
const fetchMediumStats = username => {
  // Medium api module takes user username as query parameter
  const url = `https://medium.com/${username}?format=json`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Medium API response handler
 *
 * @param {string} username Medium username
 */
export const mediumHandler = async username => {
  let response = await fetchMediumStats(username)
  const res = {
    source: 'medium',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  // whacky Medium puts weird characters in front of JSON
  const JSON_HIJACKING_PREFIX = '])}while(1);</x>'

  // default Medium API returns application/text
  response = await response.text()
  // remove leading weird character, then parse Medium response in JSON
  const stats = JSON.parse(response.replace(JSON_HIJACKING_PREFIX, ''))

  // Medium user found
  if (stats.success) {
    // get Medium user ID
    const userId = stats.payload.user.userId

    // get Medium user followers
    const mediumUser = stats.payload.references.SocialStats[userId]
    const followerCount = mediumUser.usersFollowedByCount
    res.subs = followerCount
  } else {
    // Medium user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.error
  }

  return res
}
