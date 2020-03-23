/**
 * Fetch follower stats from Twitter (without authentication)
 * This API is found from: https://kaspars.net/blog/twitter-follower-count-without-api
 *
 * @param {string} name Twitter screen name
 */
const fetchTwitterStats = name => {
  // Twitter api module takes user screen name as query parameter
  const url = `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${name}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Twitter API response handler
 *
 * @param {string} name Twitter screen name
 */
export const twitterHandler = async name => {
  const response = await fetchTwitterStats(name)
  const stats = await response.json()

  const res = {
    source: 'twitter',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (stats.length === 0) {
    // user not found from upstream twitter service
    res.subs = 0
    res.failed = true
    res.failedMsg = 'Twitter user not found'
  } else {
    // found twitter account
    res.subs = stats[0].followers_count
  }

  return res
}
