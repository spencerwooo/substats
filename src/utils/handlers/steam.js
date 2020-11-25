/**
 * Fetch owned games number from Steam
 *
 * *Authentication: STEAM_API_KEY
 *
 * @param {string} steamId Steam user steamId
 */
const fetchSteamGamesStats = steamId => {
  // Steam api module takes user steamId as query parameter
  // eslint-disable-next-line no-undef
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

/**
 * Steam games API response handler
 *
 * @param {string} steamId Steam steamId
 */
export const steamGamesHandler = async steamId => {
  const res = {
    source: 'steamGames',
    subs: 0,
    failed: false,
    failedMsg: '',
  }
  const response = await fetchSteamGamesStats(steamId)

  if (response.status !== 200) {
    // steamId invalid
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Invalid steamId'
  } else {
    // steamId valid, return http 200
    const stats = await response.json()

    if (Object.keys(stats.response).length === 0) {
      res.failed = true
      res.subs = 0
      res.failedMsg = 'Player not found for this steamID'
    } else {
      // Steam user found, returns Steam player owned games count
      res.subs = stats.response.game_count
    }
  }

  return res
}

/**
 * Fetch steam friends count
 *
 * *Authentication: STEAM_API_KEY
 *
 * @param {string} steamId Steam user steamId
 */
const fetchSteamFriendStats = steamId => {
  // Steam api module takes user steamId as query parameter
  // eslint-disable-next-line no-undef
  const url = `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${STEAM_API_KEY}&steamid=${steamId}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Steam friends API response handler
 *
 * @param {string} steamId Steam steamId
 */
export const steamFriendsHandler = async steamId => {
  const res = {
    source: 'steamFriends',
    subs: 0,
    failed: false,
    failedMsg: '',
  }
  const response = await fetchSteamFriendStats(steamId)

  if (response.status !== 200) {
    // steamId invalid
    res.failed = true
    res.subs = 0
    res.failedMsg = 'Invalid steamId'
  } else {
    // steamId valid, return length of friends list
    const stats = await response.json()
    res.subs = stats.friendslist.friends.length
  }

  return res
}
