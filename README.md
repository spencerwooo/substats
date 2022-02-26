<div align="center">
  <img src="./assets/header.png" alt="substats" />
  <h3><a href="https://api.swo.moe/stats">substats</a></h3>
  <p><a href="#get-started">Get started</a> · <a href="#whats-new">What's new?</a> · <a href="#sponsoring">Sponsoring</a></p>
  <p>( ｀д′) <em>how many followers do i have? how many!</em></p>

  <img src="https://img.shields.io/badge/Cloudflare-F69652?style=flat&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/Version-2.0*-F69652?style=flat&labelColor=2B3137" alt="Version 2.0/substats" />
  <a href="https://github.com/spencerwooo/substats/actions?query=workflow%3ADeploy"><img src="https://github.com/spencerwooo/substats/workflows/Deploy/badge.svg" alt="Vercel" /></a>
</div>

## Get started

> sub · stats /səb ˈ stats/
> - a serverless api for getting the number of followers of you in your favourite services

_*Version 2.0 is still in `beta`, not all features are ported from 1.0. Check below for details 👇_

### Basic

```
https://api.swo.moe
```

You request:

```http
GET /stats/:source/:key
```

I respond:

```typescript
{
  source: string,
  key: string,
  failed: true | false,
  count: number | string  // Most often it's a number when source !== 'common'
}
```

Yep, it's that simple now. ;)

_*Note that `key` needs to be url encoded, remember this if you are requesting the `feedly`, `inoreader`, or `feedspub` routes._

### Building badges 🎫

Of course! And as a matter of fact, substats works quite well with [`shields.io`](https://shields.io)'s `/dynamic` route. All these badges below are dynamically generated with substat's data:

[![GitHub](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fgithub%2Fspencerwooo&query=count&color=181717&label=GitHub&labelColor=282c34&logo=github&suffix=+follows&cacheSeconds=3600)](https://github.com/spencerwooo)
[![Telegram](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Ftelegram%2FrealSpencerWoo&query=count&color=2CA5E0&label=Telegram&labelColor=282c34&logo=telegram&suffix=+members&cacheSeconds=3600)](https://t.me/realSpencerWoo)
[![微博](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fweibo%2F6265807914&query=count&color=040000&label=%E5%BE%AE%E5%8D%9A&labelColor=e71f19&logo=sina-weibo&suffix=+%E5%85%B3%E6%B3%A8&cacheSeconds=3600)](https://weibo.com/6265807914)
[![少数派](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fsspai%2Fspencerwoo&query=count&color=d71a1b&label=%E5%B0%91%E6%95%B0%E6%B4%BE&labelColor=282c34&suffix=+%E5%85%B3%E6%B3%A8&cacheSeconds=3600)](https://sspai.com/u/spencerwoo)
[![爱发电](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fafdian%2Fspencerwoo&query=count&color=282c34&label=%E7%88%B1%E5%8F%91%E7%94%B5&labelColor=946ce6&suffix=+%E5%8F%91%E7%94%B5%E4%BA%BA%E6%AC%A1+%2F+%E6%9C%88&cacheSeconds=3600)](https://afdian.net/@spencerwoo)
[![即刻](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fjike%2F4DDA0425-FB41-4188-89E4-952CA15E3C5E&query=count&color=fbae00&label=%E5%8D%B3%E5%88%BB&labelColor=282c34&suffix=+%E5%85%B3%E6%B3%A8&cacheSeconds=3600)](https://m.okjike.com/users/4DDA0425-FB41-4188-89E4-952CA15E3C5E)
[![Steam](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fsteamgames%2F76561198336249957&query=count&color=0b1a37&label=Steam&labelColor=134375&logo=steam&suffix=+games&cacheSeconds=3600)](https://steamcommunity.com/profiles/76561198336249957)
[![知乎](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fzhihu%2Fbi-xiao-tian-99&query=count&color=282c34&label=%E7%9F%A5%E4%B9%8E&labelColor=0084ff&logo=zhihu&logoColor=ffffff&suffix=+%E5%85%B3%E6%B3%A8&cacheSeconds=3600)](https://www.zhihu.com/people/bi-xiao-tian-99)
[![哔哩哔哩](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.swo.moe%2Fstats%2Fbilibili%2F401742377&query=count&color=282c34&label=%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9&labelColor=FE7398&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc%2FpXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx+bCQD8%2FS9tmgVqeDr1lLigDgZvDhXso+K9TyTBQRwRJ8AHjntl0Flh5QRAQK%2FmKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR%2FRwkRKPizBN8CgEcuESj4Lwm+BwBjahEk+H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l+72BSs8d7w8U+JDAnZERQMcV+CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T+5aVk6+2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I%2FwcSbXU5jQBUkRtdf4Rar90v8kSv3+I3ffCCSpk8I%2Fw+lgDkdI%2Fv2rEp2CaiWm1AsDQLlDAD+dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3%2FBBMHEyBmDXlFfA8IzeHb+Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC%2FA8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu%2FZaEcCUxFvgz2zO+BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U%2FH50Pq4JNP7Qiw8UFnJwcK+tXy+Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC+OIx5TDqo5nDT+F%2FSS%2F9CYzwb+No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd+I0HPXslLKnT0N+wnkrTKi9JZL%2FL9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td%2FTvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC%2FosSYvjRQz4cJ6n7KO3rYQL7M+L6nVtfDVRAEQRAEQRAEQRAEIZ5%2FSAXmdfXaoQsAAAAASUVORK5CYII%3D&suffix=+%E5%85%B3%E6%B3%A8&cacheSeconds=3600)](https://space.bilibili.com/401742377)

You can easily create your own badge with our badge builder at [substats.swo.moe](https://substats.swo.moe/).

![Badge builder screenshot](assets/badge-builder-screenshot.png)

### Advanced - the `/common` route 🍀

What if the source you are trying to use is not supported yet, but it's just a simple `GET` request? In this case, you can use the route:

```http
GET /stats/common?endpoint=<url>&datapath=<path>
```

Such as:

```http
GET /stats/common/?endpoint=https://api.genshin.dev/domains/cecilia-garden&datapath=rewards.0.details.2.mora
```

In this case, the `endpoint` is an API url:

```
https://api.genshin.dev/domains/cecilia-garden
```

The response this URL returns looks like:

```jsonc
{
  "name": "Cecilia Garden",
  "type": "Forgery",
  // ...
  "rewards": [
    {
      "details": [
        { /* ... */ },
        { /* ... */ },
        {
          "mora": 1125,
        },
      ]
    }
  ]
}
```

Hence, we provide the `datapath` as `rewards.0.details.2.mora`. (I specifically chose this data as it contains an array to demonstrate how to reference the value `mora` inside the array by index.)

Response from the `endpoint` provided by you is parsed with [object-path](https://github.com/mariocasciaro/object-path), and the method for constructing a reference `datapath` to your value in the response is the same.

Try our `/common` route API URL builder here: [substats.swo.moe/common](https://substats.swo.moe/common).

![Common route screenshot](assets/common-route-screenshot.png)

## Supported sources

- afdian
- bilibili
- coolapk
- feedly
- feedspub
- github
- inoreader
- instagram
- jike
- medium
- neteasemusic
- reddit
- sspai
- steamgames
- steamfriends
- telegram
- twitter
- unsplash
- weibo
- wikipediazh
- zhihu

<a href="https://api.swo.moe/stats/afdian/afdian"><img src="docs/public/assets/sources/logo_afdian.png" width="auto" height="64px" alt="logo_afdian" /></a>
<a href="https://api.swo.moe/stats/bilibili/401742377"><img src="docs/public/assets/sources/logo_bilibili.png" width="auto" height="64px" alt="logo_bilibili" /></a>
<a href="https://api.swo.moe/stats/coolapk/466253"><img src="docs/public/assets/sources/logo_coolapk.png" width="auto" height="64px" alt="logo_coolapk" /></a>
<a href="https://api.swo.moe/stats/feedly/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="docs/public/assets/sources/logo_feedly.png" width="auto" height="64px" alt="logo_feedly" /></a>
<a href="https://api.swo.moe/stats/feedspub/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="docs/public/assets/sources/logo_feedspub.png" width="auto" height="64px" alt="logo_feedspub" /></a>
<a href="https://api.swo.moe/stats/github/spencerwooo"><img src="docs/public/assets/sources/logo_github.png" width="auto" height="64px" alt="logo_github" /></a>
<a href="https://api.swo.moe/stats/inoreader/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="docs/public/assets/sources/logo_inoreader.png" width="auto" height="64px" alt="logo_inoreader" /></a>
<a href="https://api.swo.moe/stats/instagram/9gag"><img src="docs/public/assets/sources/logo_ins.png" width="auto" height="64px" alt="logo_ins" /></a>
<a href="https://api.swo.moe/stats/jike/2204A477-38C8-4D9D-9705-9C9B990BE042"><img src="docs/public/assets/sources/logo_jike.png" width="auto" height="64px" alt="logo_jike" /></a>
<a href="https://api.swo.moe/stats/medium/SpencerWooo"><img src="docs/public/assets/sources/logo_medium.png" width="auto" height="64px" alt="logo_medium" /></a>
<a href="https://api.swo.moe/stats/neteasemusic/416608258"><img src="docs/public/assets/sources/logo_neteasemusic.png" width="auto" height="64px" alt="logo_neteasemusic" /></a>
<a href="https://api.swo.moe/stats/reddit/jushoro"><img src="docs/public/assets/sources/logo_reddit.png" width="auto" height="64px" alt="logo_reddit" /></a>
<a href="https://api.swo.moe/stats/sspai/spencerwoo"><img src="docs/public/assets/sources/logo_sspai.png" width="auto" height="64px" alt="logo_sspai" /></a>
<a href="https://api.swo.moe/stats/steam/401742377"><img src="docs/public/assets/sources/logo_steam.png" width="auto" height="64px" alt="logo_steam" /></a>
<a href="https://api.swo.moe/stats/telegram/realSpencerWoo"><img src="docs/public/assets/sources/logo_tg.png" width="auto" height="64px" alt="logo_tg" /></a>
<a href="https://api.swo.moe/stats/twitter/GenshinImpact"><img src="docs/public/assets/sources/logo_twitter.png" width="auto" height="64px" alt="logo_twitter" /></a>
<a href="https://api.swo.moe/stats/unsplash/adamhoang"><img src="docs/public/assets/sources/logo_unsplash.png" width="auto" height="64px" alt="logo_unsplash" /></a>
<a href="https://api.swo.moe/stats/weibo/5648729445"><img src="docs/public/assets/sources/logo_weibo.png" width="auto" height="64px" alt="logo_weibo" /></a>
<a href="https://api.swo.moe/stats/wikipediazh/ChenSimon"><img src="docs/public/assets/sources/logo_wikipedia.png" width="auto" height="64px" alt="logo_wikipedia" /></a>
<a href="https://api.swo.moe/stats/zhihu/bi-xiao-tian-99"><img src="docs/public/assets/sources/logo_zhihu.png" width="auto" height="64px" alt="logo_zhihu" /></a>

## What's new?

Yes, `substats` is now version `v2.0-beta`! Most of the updates are under-the-hood apart from API formats.

- [x] Refactored in TypeScript.
- [x] Updated to CloudFlare's module workers.
- [x] Worker is built with `esbuild` instead of `webpack`, extra fast!
- [x] Support for Newsblur has been deprecated ~~(seems nobody uses it)~~.
- [x] KV storages are now supported, some routes including `instagram` and `inoreader` depends on this for storing cookies (wip).
- [x] Caching is ported to module workers in 2.0 and supported as always.
- [x] New documentation and query builder.

If you are looking for the multiple source and query functions in 2.0 - it's still under refactor, as `itty-router` does not parse multiple query parameters, blocking this feature here. You can still use the 1.0 route while we wait. [README and documentation for v1.0 (deprecated)](https://github.com/spencerwooo/substats/blob/1becc576f09b09cfa1389312d081f02a25ed0735/README.md).

## Contributing

This is a monorepo managed by `pnpm`. Directory `./worker` holds the Cloudflare Worker module, and `./docs` is a React site for documentation (powered by [Vite](https://vitejs.dev/) and [Chakra UI](https://chakra-ui.com/)). Check the README.md for both packages for details.

## Sponsoring

Open-source is hard! If you happen to like this project and want me to keep going, please consider sponsoring me or providing a single donation! Thanks for all the love and support!

[🧸 Please donate - 微信/支付宝](https://ovi.swo.moe/sponsor) · [Patreon](https://www.patreon.com/spencerwoo) · [爱发电](https://afdian.net/@spencerwoo)

## License

[MIT](LICENSE)

<div align="center">
  <img src="assets/footer.png" />
  <em>made with ❤️ by <a href="https://spencerwoo.com">spencer woo</a></em>
</div>
