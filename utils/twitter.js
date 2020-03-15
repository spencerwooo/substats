/**
 * Fetch follower stats from Twitter (without authentication)
 * This API is found from: https://kaspars.net/blog/twitter-follower-count-without-api
 *
 * @param {String} name Twitter screen name
 */
export const fetchTwitterStats = name => {
  // Twitter api module takes user screen name as query parameter
  const url = `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${name}`

  const headers = { 'User-Agent': 'substat-bot' }
  console.log(url)
  return fetch(url, { headers })
}
