/**
 * Fetch follower stats from GitHub
 *
 * @param {string} login GitHub user login
 */
const fetchGitHubStats = login => {
  // GitHub api module takes user login as query parameter
  const url = `https://api.github.com/users/${login}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * GitHub API response handler
 *
 * @param {string} login GitHub login
 */
export const gitHubHandler = async login => {
  const response = await fetchGitHubStats(login)
  const stats = await response.json()
  const res = {
    source: 'github',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200) {
    // GitHub user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.message
  } else {
    // GitHub user found
    res.subs = stats.followers
  }

  return res
}
