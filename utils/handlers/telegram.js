/**
 * Get Info about Telegram
 * API description: https://core.telegram.org/bots/api#getchatmemberscount
 * Auth: {TG_BOT_TOKEN}, stored securely inside Cloudflare Worker's Secrets
 *
 * @param {string} chatId Telegram user ID
 */
const fetchTelegramStat = chatId => {
  // Telegram API expects a chatId
  // eslint-disable-next-line no-undef
  const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/getChatMembersCount?chat_id=@${chatId}`

  const headers = { 'User-Agent': 'substat-bot' }
  return fetch(url, { headers })
}

/**
 * Telegram API response handler
 *
 * @param {string} chatId Telegram channel or group's chatId
 */
export const telegramHandler = async chatId => {
  const response = await fetchTelegramStat(chatId)
  const stats = await response.json()
  const res = {
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
