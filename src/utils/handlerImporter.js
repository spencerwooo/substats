// import API handlers for different platforms
import { afdianFansHandler, afdianIncomeHandler } from './handlers/afdian'
import { bilibiliHandler } from './handlers/bilibili'
import { coolapkHandler } from './handlers/coolapk'
import { feedlyHandler } from './handlers/feedly'
import { feedsPubHandler } from './handlers/feedsPub'
import { gitHubHandler } from './handlers/github'
import { inoreaderHandler } from './handlers/inoreader'
import { instagramHandler } from './handlers/instagram'
import { jikeFollowerHandler, jikeHighlightHandler, jikeLikedHandler } from './handlers/jike'
import { mediumHandler } from './handlers/medium'
import { neteaseMusicHandler } from './handlers/neteaseMusic'
import { newsblurHandler } from './handlers/newsblur'
import { redditHandler } from './handlers/reddit'
import { sspaiHandler } from './handlers/sspai'
import { steamGamesHandler, steamFriendsHandler } from './handlers/steam'
import { telegramHandler } from './handlers/telegram'
import { twitterHandler } from './handlers/twitter'
import { unsplashHandler } from './handlers/unsplash'
import { weiboHandler } from './handlers/weibo'
import { zhihuHandler } from './handlers/zhihu'
import { wikipediaZhHandler } from './handlers/wikipediaZh'

/**
 * Export implemented handlers to index.js for simple reference
 */
export const handlerImporter = () => {
  const handlers = {
    afdianFans: afdianFansHandler,
    afdianIncome: afdianIncomeHandler,
    bilibili: bilibiliHandler,
    coolapk: coolapkHandler,
    feedly: feedlyHandler,
    feedsPub: feedsPubHandler,
    github: gitHubHandler,
    inoreader: inoreaderHandler,
    instagram: instagramHandler,
    jikeFollower: jikeFollowerHandler,
    jikeHighlights: jikeHighlightHandler,
    jikeLiked: jikeLikedHandler,
    medium: mediumHandler,
    newsblur: newsblurHandler,
    reddit: redditHandler,
    neteaseMusic: neteaseMusicHandler,
    sspai: sspaiHandler,
    steamGames: steamGamesHandler,
    steamFriends: steamFriendsHandler,
    telegram: telegramHandler,
    twitter: twitterHandler,
    unsplash: unsplashHandler,
    weibo: weiboHandler,
    zhihu: zhihuHandler,
    wikipediaZh: wikipediaZhHandler,
  }
  return handlers
}
