/**
 * Get Info about Telegram
 * API description: https://core.telegram.org/bots/api#getchatmemberscount
 * Auth: {TG_BOT_TOKEN}, stored securely inside Cloudflare Worker's Secrets
 *
 * @param {string} chat_id Telegram user ID
 */
const fetchTelegramStat = chat_id => {
  // Telegram API expects a chat_id
  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/getChatMembersCount?chat_id=@${chat_id}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Telegram API response handler
 *
 * @param {string} chat_id Telegram channel or group's chat_id
 */
export const telegramHandler = async chat_id => {
  const response = await fetchTelegramStat(chat_id)
  const stats = await response.json()
  let res = {
    source: 'telegram',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  if (stats.ok) {
    // Telegram user found
    res.subs = stats.result
  } else {
    // Telegram user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.description
  }

  return res
}
