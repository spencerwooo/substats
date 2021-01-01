/**
 * Fetch follower stats from Unsplash
 * Auth: {UNSPLASH_ACCESS_TOKEN}, stored securely inside Cloudflare Worker's Secrets
 *
 * @param {string} username Unsplash username
 */
const fetchUnsplashStats = username => {
  // Unsplash API expects a user ID
  // eslint-disable-next-line no-undef
  const url = `https://api.unsplash.com/users/${username}?client_id=${UNSPLASH_ACCESS_TOKEN}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Unsplash followers API response handler
 *
 * @param {string} username Unsplash username
 */
export const unsplashHandler = async username => {
  const response = await fetchUnsplashStats(username)
  const stats = await response.json()
  const res = {
    source: 'unsplash',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (response.status !== 200) {
    // Unsplash user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.errors[0]
  } else {
    res.subs = stats.followers_count
  }
  return res
}
