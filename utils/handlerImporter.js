// import API handlers for different platforms
import { bilibiliHandler } from './handlers/bilibili'
import { feedlyHandler } from './handlers/feedly'
import { gitHubHandler } from './handlers/github'
import { instagramHandler } from './handlers/instagram'
import { mediumHandler } from './handlers/medium'
import { newsblurHandler } from './handlers/newsblur'
import { sspaiHandler } from './handlers/sspai'
import { telegramHandler } from './handlers/telegram'
import { twitterHandler } from './handlers/twitter'
import { zhihuHandler } from './handlers/zhihu'
import { weiboHandler } from './handlers/weibo'

/**
 * Export implemented handlers to index.js for simple reference
 */
export const handlerImporter = () => {
  const handlers = {
    bilibili: bilibiliHandler,
    feedly: feedlyHandler,
    github: gitHubHandler,
    instagram: instagramHandler,
    medium: mediumHandler,
    newsblur: newsblurHandler,
    sspai: sspaiHandler,
    telegram: telegramHandler,
    twitter: twitterHandler,
    zhihu: zhihuHandler,
    weibo: weiboHandler,
  }
  return handlers
}
