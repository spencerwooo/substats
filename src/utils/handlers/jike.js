import cheerio from 'cheerio'

/**
 * Fetch follower stats from Jike
 *
 * @param {string} login Jike user login
 */
const fetchJikeData = async id => {
  // Jike api module takes user uuid as query parameter (4DDA0425-FB41-4188-89E4-952CA15E3C5E)
  const url = `https://m.okjike.com/users/${id}`
  const headers = { 'User-Agent': 'substat-bot' }

  const resp = await fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })

  if (resp.status !== 200) {
    return { error: 'failed', data: 'Jike API failed' }
  }

  const html = await resp.text()

  // Parse HTML with cheerio to usable JSON Object
  const $ = cheerio.load(html)
  const raw = $('[type = "application/json"]').html()
  const data = JSON.parse(raw).props.pageProps.user.statsCount
  return { error: 'success', data: data }
}

/**
 * Jike follower API response handler
 *
 * @param {string} id Jike user UUID
 */
export const jikeFollowerHandler = async id => {
  // Fetch Jike user stats count
  const jikeData = await fetchJikeData(id)
  console.log(jikeData)

  // Initialize
  const res = {
    source: 'jikeFollower',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (jikeData.error === 'success') {
    // Jike user found
    res.subs = jikeData.data.followedCount
  } else {
    // Jike user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = jikeData.data
  }

  return res
}

/**
 * Jike highlighted personal updates API response handler
 *
 * @param {string} id Jike user UUID
 */
export const jikeHighlightHandler = async id => {
  // Fetch Jike user stats count
  const jikeData = await fetchJikeData(id)
  console.log(jikeData)

  // Initialize
  const res = {
    source: 'jikeHighlights',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (jikeData.error === 'success') {
    // Jike user found
    res.subs = jikeData.data.highlightedPersonalUpdates
  } else {
    // Jike user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = jikeData.data
  }

  return res
}

/**
 * Jike liked API response handler
 *
 * @param {string} id Jike user UUID
 */
export const jikeLikedHandler = async id => {
  // Fetch Jike user stats count
  const jikeData = await fetchJikeData(id)
  console.log(jikeData)

  // Initialize
  const res = {
    source: 'jikeLiked',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (jikeData.error === 'success') {
    // Jike user found
    res.subs = jikeData.data.liked
  } else {
    // Jike user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = jikeData.data
  }

  return res
}
