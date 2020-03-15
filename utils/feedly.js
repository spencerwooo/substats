/**
 * Fetch RSS stats from Feedly
 * @param {URL} rss RSS subscription link
 */
export const fetchFeedlyStats = rss => {
  // encode feedly API requests
  const req = encodeURIComponent(`feed/${rss}`)

  // feedly api module takes an encoded `feed/{link}` URL as query parameter
  const url = `https://feedly.com/v3/recommendations/feeds/${req}`

  const headers = { 'User-Agent': 'rss-stat-bot' }
  return fetch(url, { headers })
}
