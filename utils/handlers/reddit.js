/**
 * Fetch follower stats from Reddit
 *
 * @param {string} username Reddit user username
 */
const fetchRedditStats = username => {
  // Reddit api module takes user username as query parameter
  const url = `https://www.reddit.com/user/${username}/about.json`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Reddit API response handler
 *
 * @param {string} username Reddit username
 */
export const redditHandler = async username => {
  const response = await fetchRedditStats(username)
  const stats = await response.json()
  const res = {
    source: 'reddit',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200) {
    // Reddit user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.message
  } else {
    // Reddit user found, returns reddit user karma
    // !Reddit karma: https://www.quora.com/What-is-Reddit-karma-and-how-do-people-benefit-from-having-more-of-it
    res.subs = stats.data.link_karma + stats.data.comment_karma
  }

  return res
}
