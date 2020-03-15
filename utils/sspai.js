/**
 * Fetch follower stats from sspai
 *
 * @param {String} slug sspai slug id
 */
export const fetchSspaiStats = slug => {
  // sspai api module takes user slug as query parameter
  const url = `https://sspai.com/api/v1/user/slug/info/get?slug=${slug}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}
