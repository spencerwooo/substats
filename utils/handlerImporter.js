// import API handlers for different platforms
import { bilibiliHandler } from './handlers/bilibili'
import { coolapkHandler } from './handlers/coolapk'
import { feedlyHandler } from './handlers/feedly'
import { gitHubHandler } from './handlers/github'
import { instagramHandler } from './handlers/instagram'
import { mediumHandler } from './handlers/medium'
import { neteaseMusicHandler } from './handlers/neteaseMusic'
import { newsblurHandler } from './handlers/newsblur'
import { redditHandler } from './handlers/reddit'
import { sspaiHandler } from './handlers/sspai'
import { telegramHandler } from './handlers/telegram'
import { twitterHandler } from './handlers/twitter'
import { weiboHandler } from './handlers/weibo'
import { zhihuHandler } from './handlers/zhihu'

/**
 * Export implemented handlers to index.js for simple reference
 */
export const handlerImporter = () => {
  const handlers = {
    bilibili: bilibiliHandler,
    coolapk: coolapkHandler,
    feedly: feedlyHandler,
    github: gitHubHandler,
    instagram: instagramHandler,
    medium: mediumHandler,
    newsblur: newsblurHandler,
    reddit: redditHandler,
    neteaseMusic: neteaseMusicHandler,
    sspai: sspaiHandler,
    telegram: telegramHandler,
    twitter: twitterHandler,
    weibo: weiboHandler,
    zhihu: zhihuHandler,
  }
  return handlers
}
