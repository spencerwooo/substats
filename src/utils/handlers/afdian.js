/**
 * Fetch follower stats from Afdian
 *
 * @param {string} slug Afdian user slug
 */
const fetchAfdianStat = slug => {
  // afdian api module takes user slug as query parameter
  const url = `https://afdian.net/api/user/get-profile-by-slug?url_slug=${slug}`
  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Afdian fans API response handler
 *
 * @param {string} slug Afdian user slug
 */
export const afdianFansHandler = async slug => {
  const res = {
    source: 'afdianFans',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  const response = await fetchAfdianStat(slug)

  if (response.status !== 200) {
    // Afdian API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Afdian API failed'
  } else {
    const stats = await response.json()
    if (stats.ec !== 200) {
      res.failed = true
      res.subs = 0
      res.failedMsg = stats.em
    } else {
      // afdian user found
      res.subs = stats.data.user.creator.monthly_fans
    }
  }

  return res
}

/**
 * Afdian income API response handler
 *
 * @param {string} slug Afdian user slug
 */
export const afdianIncomeHandler = async slug => {
  const res = {
    source: 'afdianIncome',
    subs: '0.00',
    failed: false,
    failedMsg: '',
  }

  const response = await fetchAfdianStat(slug)

  if (response.status !== 200) {
    // Afdian API failed
    res.failed = true
    res.subs = '0.00'
    res.failedMsg = 'Afdian API failed'
  } else {
    const stats = await response.json()
    if (stats.ec !== 200) {
      res.failed = true
      res.subs = '0.00'
      res.failedMsg = stats.em
    } else {
      // afdian user found
      res.subs = stats.data.user.creator.monthly_income
    }
  }

  return res
}
