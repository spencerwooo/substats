/**
 * Fetch RSS stats from Inoreader
 *
 * @param {string} rss Inoreader RSS feed url to query
 */
const fetchInoreaderStats = rss => {
  // encode inoreader API requests
  const req = encodeURIComponent(rss)

  // inoreader api module takes an encoded `feed/{link}` URL as query parameter
  const url = `https://www.inoreader.com/autocomplete.php?origin=smart_search&term=${req}`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Inoreader API response handler
 *
 * @param {string} rss Inoreader RSS feed url to query
 */
export const inoreaderHandler = async rss => {
  const response = await fetchInoreaderStats(rss)
  const stats = await response.json()
  const res = {
    source: 'inoreader',
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
      // const text = stats[3]['label']
      const text = JSON.stringify(stats)
      const reg = new RegExp('<b>([0-9|k]*)</b> subscribers')
      const result = reg.exec(text)[1].replace('k', '000')
      res.subs = parseInt(result)
    } catch (error) {
      // rss feed unknown
      res.failed = true
      res.subs = 0
      res.failedMsg = 'RSS feed not found on Inoreader'
    }
  }

  return res
}
