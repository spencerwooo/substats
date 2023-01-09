import { Code, Link, Text } from '@chakra-ui/react'
import { logos } from './logos'

export const whiteLogoSources = ['github', 'medium', 'unsplash']

const HelperText = ({ source, uid, url }: { source: string; uid: string; url: string }) => (
  <Text>
    Enter your {source}'s username or uid, such as the <Code fontSize="xs">{uid}</Code> part in your user profile URL:{' '}
    <Link href={url} isExternal>
      {url}
    </Link>
  </Text>
)

const SteamHelperText = () => (
  <Text>
    Note that your steam ID is not your steam username! Find your steam ID here:{' '}
    <Link href="https://steamidfinder.com/" isExternal color="orange.400">
      Steam ID Finder
    </Link>
    , with your username or profile URL, then pass the <Code fontSize="xs">steamID64</Code> to substats here. An
    example: <Code fontSize="xs">76561198336249957</Code>
  </Text>
)

const YuqueHelperText = () => (
  <Text>
    Go to your Yuque homepage, such as{' '}
    <Link href="https://www.yuque.com/lyndon" isExternal color="orange.400">
      https://www.yuque.com/lyndon
    </Link>
    , copy the link to <Code>粉丝</Code>, which should look like{' '}
    <Link href="https://www.yuque.com/explore/follows?type=Fans&userId=85213" isExternal>
      https://www.yuque.com/explore/follows?type=Fans&userId=85213
    </Link>
    . Pass <Code fontSize="xs">userId</Code> to substats, which is <Code fontSize="xs">85213</Code> in this case.
  </Text>
)

export const availableSources = [
  {
    source: 'afdian',
    icon: '/assets/sources/logo_afdian.png',
    description: '爱发电 - sponsor, donation',
    warning: '',
    helper: <HelperText source="爱发电" uid="spencerwoo" url="https://afdian.net/@spencerwoo" />,
    badge: {
      label: '爱发电',
      labelColor: '946ce6',
      logo: '',
      suffix: '发电人次 / 月',
      color: '282c34',
      link: (k: string) => `https://afdian.net/@${k}`,
    },
  },
  {
    source: 'bilibili',
    icon: '/assets/sources/logo_bilibili.png',
    description: '哔哩哔哩 - 视频',
    warning: '',
    helper: <HelperText source="Bilibili" uid="401742377" url="https://space.bilibili.com/401742377" />,
    badge: {
      label: '哔哩哔哩',
      labelColor: 'FE7398',
      logo: logos.bilibili,
      suffix: '关注',
      color: '282c34',
      link: (k: string) => `https://space.bilibili.com/${k}`,
    },
  },
  {
    source: 'coolapk',
    icon: '/assets/sources/logo_coolapk.png',
    description: '酷安 - APP, Android、安卓',
    warning: '',
    helper: <HelperText source="酷安" uid="466253" url="http://www.coolapk.com/u/466253" />,
    badge: {
      label: '酷安',
      labelColor: '11ab60',
      logo: logos.coolapk,
      suffix: '关注',
      color: '282c34',
      link: (k: string) => `https://www.coolapk.com/u/${k}`,
    },
  },
  {
    source: 'feedly',
    icon: '/assets/sources/logo_feedly.png',
    description: 'Feedly - RSS',
    warning: '',
    helper: (
      <Text>
        Enter your RSS link used on Feedly, such as{' '}
        <Link href="https://blog.feedly.com/feed/" isExternal>
          <Code fontSize="xs">https://blog.feedly.com/feed/</Code>
        </Link>
      </Text>
    ),
    badge: {
      label: 'Feedly',
      labelColor: '2bb24c',
      logo: 'feedly',
      logoColor: 'ffffff',
      suffix: 'subs',
      color: '282c34',
      link: (k: string) => k,
    },
  },
  {
    source: 'feedspub',
    icon: '/assets/sources/logo_feedspub.png',
    description: 'Feedspub - RSS',
    warning: '',
    helper: (
      <Text>
        Enter your RSS link used on Feeds Pub, such as{' '}
        <Link href="https://blog.feeds.pub/rss.xml" isExternal>
          <Code fontSize="xs">https://blog.feeds.pub/rss.xml</Code>
        </Link>
      </Text>
    ),
    badge: {
      label: 'Feeds Pub',
      labelColor: '282c34',
      logo: logos.feedsPub,
      suffix: 'subs',
      color: '61b04b',
      link: (k: string) => k,
    },
  },
  {
    source: 'github',
    icon: '/assets/sources/logo_github.png',
    description: 'GitHub - developer',
    warning: '',
    helper: <HelperText source="github" uid="spencerwooo" url="https://github.com/spencerwooo" />,
    badge: {
      label: 'GitHub',
      labelColor: '282c34',
      logo: 'github',
      suffix: 'follows',
      color: '181717',
      link: (k: string) => `https://github.com/${k}`,
    },
  },
  {
    source: 'inoreader',
    icon: '/assets/sources/logo_inoreader.png',
    description: 'Inoreader - RSS',
    warning: 'This route is very fragile - may not always work.',
    helper: (
      <Text>
        Enter your RSS link used on Inoreader, such as{' '}
        <Link href="https://www.inoreader.com/blog/feed" isExternal>
          <Code fontSize="xs">https://www.inoreader.com/blog/feed</Code>
        </Link>
      </Text>
    ),
    badge: {
      label: 'Inoreader',
      labelColor: '007bc7',
      logo: logos.inoreader,
      suffix: 'subs',
      color: '282c34',
      link: (k: string) => k,
    },
  },
  {
    source: 'instagram',
    icon: '/assets/sources/logo_ins.png',
    description: 'Instagram - social',
    warning: '',
    helper: <HelperText source="Instagram" uid="9gag" url="https://instagram.com/9gag" />,
    badge: {
      label: 'Instagram',
      labelColor: 'd7417b',
      logo: 'instagram',
      logoColor: 'ffffff',
      suffix: 'follows',
      color: '282c34',
      link: (k: string) => `https://instagram.com/${k}`,
    },
  },
  {
    source: 'jike',
    icon: '/assets/sources/logo_jike.png',
    description: 'Jike - social、即刻',
    warning: '',
    helper: (
      <HelperText
        source="即刻"
        uid="4DDA0425-FB41-4188-89E4-952CA15E3C5E"
        url="https://m.okjike.com/users/4DDA0425-FB41-4188-89E4-952CA15E3C5E"
      />
    ),
    badge: {
      label: '即刻',
      labelColor: '282c34',
      logo: logos.jike,
      suffix: '关注',
      color: 'fbae00',
      link: (k: string) => `https://m.okjike.com/users/${k}`,
    },
  },
  {
    source: 'mastodon',
    icon: '/assets/sources/logo_mastodon.png',
    description: 'Mastodon - social、长毛象',
    warning: '',
    helper: (
      <Text>
        Enter the concatanation of your username and hostname using <Code fontSize="xs">@</Code>, such as{' '}
        <Code fontSize="xs">oldpanda@mastodon.social</Code> derived from your user profile URL:{' '}
        <Link href="https://mastodon.social/@oldpanda" isExternal>
          https://mastodon.social/@oldpanda
        </Link>
      </Text>
    ),
    badge: {
      label: 'Mastodon',
      labelColor: '',
      logo: 'mastodon',
      suffix: 'follows',
      color: '6364ff',
      link: (k: string) => {
        let parts = k.split('@')
        let domain = parts.pop()
        let user = parts.join('@')
        return `https://${domain}/@${user}`
      },
    },
  },
  {
    source: 'medium',
    icon: '/assets/sources/logo_medium.png',
    description: 'Medium - social、文章',
    warning: '',
    helper: <HelperText source="Medium" uid="SpencerWooo" url="https://medium.com/@SpencerWooo" />,
    badge: {
      label: 'Medium',
      labelColor: '03a87c',
      logo: 'medium',
      suffix: 'follows',
      color: '12100e',
      link: (k: string) => `https://medium.com/@${k}`,
    },
  },
  {
    source: 'neteasemusic',
    icon: '/assets/sources/logo_neteasemusic.png',
    description: '网易云音乐 - social, music',
    warning: '',
    helper: <HelperText source="网易云音乐" uid="416608258" url="https://music.163.com/#/user/home?id=416608258" />,
    badge: {
      label: '网易云音乐',
      labelColor: 'e72d2c',
      logo: logos.neteaseMusic,
      suffix: '粉丝',
      color: '282c34',
      link: (k: string) => `https://music.163.com/#/user/home?id=${k}`,
    },
  },
  {
    source: 'reddit',
    icon: '/assets/sources/logo_reddit.png',
    description: 'Reddit - social',
    warning: '',
    helper: <HelperText source="reddit" uid="jushoro" url="https://www.reddit.com/user/jushoro" />,
    badge: {
      label: 'Reddit Karma',
      labelColor: 'ff4500',
      logo: 'reddit',
      logoColor: 'ffffff',
      suffix: '',
      color: '282c34',
      link: (k: string) => `https://www.reddit.com/user/${k}`,
    },
  },
  {
    source: 'sspai',
    icon: '/assets/sources/logo_sspai.png',
    description: '少数派 - articles、文章',
    warning: '',
    helper: <HelperText source="少数派" uid="spencerwoo" url="https://sspai.com/u/spencerwoo/posts" />,
    badge: {
      label: '少数派',
      labelColor: '282c34',
      logo: logos.sspai,
      suffix: '关注',
      color: 'd71a1b',
      link: (k: string) => `https://sspai.com/u/${k}/posts`,
    },
  },
  {
    source: 'steamgames',
    icon: '/assets/sources/logo_steam.png',
    description: 'Steam (Games number) - game、游戏',
    warning: '',
    helper: <SteamHelperText />,
    badge: {
      label: 'Steam',
      labelColor: '134375',
      logo: 'steam',
      suffix: 'games',
      color: '0b1a37',
      link: (k: string) => `https://steamcommunity.com/profiles/${k}`,
    },
  },
  {
    source: 'steamfriends',
    icon: '/assets/sources/logo_steam.png',
    description: 'Steam (Friends number) - game、游戏',
    warning: '',
    helper: <SteamHelperText />,
    badge: {
      label: 'Steam',
      labelColor: '134375',
      logo: 'steam',
      suffix: 'friends',
      color: '0b1a37',
      link: (k: string) => `https://steamcommunity.com/profiles/${k}`,
    },
  },
  {
    source: 'telegram',
    icon: '/assets/sources/logo_tg.png',
    description: 'Telegram Channel - social、电报、频道',
    warning: 'This route is for querying members inside your Telegram channels only.',
    helper: <HelperText source="telegram" uid="realSpencerWoo" url="https://t.me/realSpencerWoo" />,
    badge: {
      label: 'Telegram',
      labelColor: '282c34',
      logo: 'telegram',
      suffix: 'members',
      color: '2CA5E0',
      link: (k: string) => `https://t.me/${k}`,
    },
  },
  {
    source: 'twitter',
    icon: '/assets/sources/logo_twitter.png',
    description: 'Twitter - social、推特、蓝鸟',
    warning: '',
    helper: <HelperText source="twitter" uid="realSpencerWoo" url="https://twitter.com/realSpencerWoo" />,
    badge: {
      label: 'Twitter',
      labelColor: '282c34',
      logo: 'twitter',
      suffix: 'follows',
      color: '1da1f2',
      link: (k: string) => `https://twitter.com/${k}`,
    },
  },
  {
    source: 'unsplash',
    icon: '/assets/sources/logo_unsplash.png',
    description: 'Unsplash - photography, design, social',
    warning: '',
    helper: <HelperText source="unsplash" uid="adamhoang" url="https://unsplash.com/@adamhoang" />,
    badge: {
      label: 'Unsplash',
      labelColor: '000000',
      logo: 'unsplash',
      suffix: 'follows',
      color: '282c34',
      link: (k: string) => `https://unsplash.com/@${k}`,
    },
  },
  {
    source: 'weibo',
    icon: '/assets/sources/logo_weibo.png',
    description: '微博 - social',
    warning: '',
    helper: <HelperText source="weibo" uid="5648729445" url="https://weibo.com/u/5648729445" />,
    badge: {
      label: '微博',
      labelColor: 'e71f19',
      logo: 'sina-weibo',
      suffix: '关注',
      color: '040000',
      link: (k: string) => `https://weibo.com/${k}`,
    },
  },
  {
    source: 'wikipediazh',
    icon: '/assets/sources/logo_wikipedia.png',
    description: 'Wikipedia 中文 - 维基百科',
    warning: '',
    helper: <HelperText source="维基百科" uid="ChenSimon" url="https://zh.wikipedia.org/wiki/User:ChenSimon" />,
    badge: {
      label: '维基百科',
      labelColor: '000000',
      logo: 'wikipedia',
      suffix: '编辑',
      color: '282c34',
      link: (k: string) => `https://zh.wikipedia.org/wiki/User:${k}`,
    },
  },
  {
    source: 'zhihu',
    icon: '/assets/sources/logo_zhihu.png',
    description: '知乎 - social',
    warning: '',
    helper: <HelperText source="知乎" uid="bi-xiao-tian-99" url="https://www.zhihu.com/people/bi-xiao-tian-99" />,
    badge: {
      label: '知乎',
      labelColor: '0084ff',
      logo: 'zhihu',
      logoColor: 'ffffff',
      suffix: '关注',
      color: '282c34',
      link: (k: string) => `https://www.zhihu.com/people/${k}`,
    },
  },
  {
    source: 'juejin',
    icon: '/assets/sources/logo_juejin.png',
    description: '掘金 - articles、文章',
    warning: '',
    helper: <HelperText source="掘金" uid="1838039172387262" url="https://juejin.cn/user/1838039172387262" />,
    badge: {
      label: '掘金',
      labelColor: '1e80ff',
      logo: 'juejin',
      logoColor: 'ffffff',
      suffix: '关注',
      color: '282c34',
      link: (k: string) => `https://juejin.cn/user/${k}`,
    },
  },
  {
    source: 'yuque',
    icon: '/assets/sources/logo_yuque.png',
    description: '语雀 - articles、文章',
    warning: '',
    helper: <YuqueHelperText />,
    badge: {
      label: '语雀',
      labelColor: '36d07c',
      logo: 'yuque',
      logoColor: 'ffffff',
      suffix: '关注',
      color: '282c34',
      link: (k: string) => `https://www.yuque.com/${k}`,
    },
  },
]
