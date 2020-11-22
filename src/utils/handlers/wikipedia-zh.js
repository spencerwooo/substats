/**
 * Fetch editcount stats from Wikipedia-zh
 *
 * @param {string} Name Wikipedia-zh user name
 */
const fetchWikipediazhStats = name => {
    // Wikipedia-zh api module takes user login as query parameter
    const url = `https://zh.wikipedia.org/w/api.php?action=query&list=users&ususers=${name}&usprop=editcount&format=json`
  
    const headers = { 'User-Agent': 'substat-bot' }
    return fetch(url, { headers })
  }
  
  /**
   * Wikipedia-zh API response handler
   *
   * @param {string} Name Wikipedia-zh Name
   */
  export const wikipediazhHandler = async name => {
    const response = await fetchWikipediazhStats(name)
    const stats = await response.json()
    const res = {
      source: 'wikiepdia-zh',
      subs: 0,
      failed: false,
      failedMsg: '',
    }
  
    if (response.stats.query.users.0.missing = '') {
      // Wikipedia-zh user not found
      res.failed = true
      res.subs = 0
      res.failedMsg = 'Wikipedia-zh user not found'
    } else {
      // Wikipedia-zh user found
      res.subs = stats.query.users.0.editcount
    }
  
    return res
  }
  