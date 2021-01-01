// import API services for different platforms
import { afdianFansHandler, afdianIncomeHandler } from './services/afdian'
import { bilibiliHandler } from './services/bilibili'
import { coolapkHandler } from './services/coolapk'
import { feedlyHandler } from './services/feedly'
import { feedsPubHandler } from './services/feedsPub'
import { gitHubHandler } from './services/github'
import { inoreaderHandler } from './services/inoreader'
import { instagramHandler } from './services/instagram'
import { jikeFollowerHandler, jikeHighlightHandler, jikeLikedHandler } from './services/jike'
import { mediumHandler } from './services/medium'
import { neteaseMusicHandler } from './services/neteaseMusic'
import { newsblurHandler } from './services/newsblur'
import { redditHandler } from './services/reddit'
import { sspaiHandler } from './services/sspai'
import { steamGamesHandler, steamFriendsHandler } from './services/steam'
import { telegramHandler } from './services/telegram'
import { twitterHandler } from './services/twitter'
import { unsplashHandler } from './services/unsplash'
import { weiboHandler } from './services/weibo'
import { zhihuHandler } from './services/zhihu'
import { wikipediaZhHandler } from './services/wikipediaZh'

/**
 * Export implemented services to index.js for simple reference
 */
export const services = () => {
  const services = {
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
  return services
}
