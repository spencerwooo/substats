/**
 * Fetch RSS stats from Feedly
 *
 * @param {string} rss Feedly RSS feed url to query
 */
const fetchFeedlyStats = rss => {
  // encode feedly API requests
  const req = encodeURIComponent(`feed/${rss}`)

  // feedly api module takes an encoded `feed/{link}` URL as query parameter
  const url = `https://feedly.com/v3/recommendations/feeds/${req}`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Feedly API response handler
 *
 * @param {string} rss Feedly RSS feed url to query
 */
export const feedlyHandler = async rss => {
  const response = await fetchFeedlyStats(rss)
  const stats = await response.json()
  const res = {
    source: 'feedly',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (!response.ok) {
    // request failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.errorMessage
  } else {
    try {
      // found rss link
      res.subs = stats.source.subscribers
    } catch (error) {
      // rss feed unknown
      res.failed = true
      res.subs = 0
      res.failedMsg = 'RSS feed not found on Feedly'
    }
  }

  return res
}
