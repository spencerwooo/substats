/**
 * Fetch RSS stats from Feeds Pub
 *
 * @param {string} rss RSS feed url to query
 */
const fetchFeedsPubStats = rss => {
  // encode Feeds Pub API requests
  let req = rss.trim()
  if (req[req.length - 1] === '/') {
    req = req.slice(0, -1)
  }
  req = encodeURIComponent(req)

  const url = `https://api.feeds.pub/graphql?query=query%20feed(%24id%3A%20String!)%7B%20feed(id%3A%20%24id)%20%7B%20followerCount%20%7D%20%7D&variables=%7B%22id%22%3A%20%22${req}%22%7D&operationName=feed`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Feeds Pub API response handler
 *
 * @param {string} rss Feeds Pub RSS feed url to query
 */
export const feedsPubHandler = async rss => {
  const response = await fetchFeedsPubStats(rss)
  const stats = await response.json()
  const res = {
    source: 'feedsPub',
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
      res.subs = stats.data.feed.followerCount
    } catch (error) {
      // rss feed unknown
      res.failed = true
      res.subs = 0
      res.failedMsg = 'RSS feed not found on Feeds Pub'
    }
  }

  return res
}
