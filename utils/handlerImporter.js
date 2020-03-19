// import API handlers for different platforms
import { bilibiliHandler } from './bilibili'
import { feedlyHandler } from './feedly'
import { gitHubHandler } from './github'
import { instagramHandler } from './instagram'
import { mediumHandler } from './medium'
import { newsblurHandler } from './newsblur'
import { sspaiHandler } from './sspai'
import { telegramHandler } from './telegram'
import { twitterHandler } from './twitter'
import { zhihuHandler } from './zhihu'
import { weiboHandler } from './weibo'

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
