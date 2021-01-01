/**
 * Fetch editcount stats from Wikipedia (Zh)
 *
 * @param {string} Name Wikipedia (Zh) user name
 */
const fetchWikipediaZhStats = name => {
  // Wikipedia (Zh) api module takes user login as query parameter
  const url = `https://zh.wikipedia.org/w/api.php?action=query&list=users&ususers=${name}&usprop=editcount&format=json`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Wikipedia (Zh) API response handler
 *
 * @param {string} Name Wikipedia (Zh) Name
 */
export const wikipediaZhHandler = async name => {
  const response = await fetchWikipediaZhStats(name)
  const stats = await response.json()
  const res = {
    source: 'wikipediaZh',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if ('missing' in stats.query.users[0]) {
    // Wikipedia (Zh) user not found
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Wikipedia (zh) user not found'
  } else {
    // Wikipedia (Zh) user found
    res.subs = stats.query.users[0].editcount
  }

  return res
}
