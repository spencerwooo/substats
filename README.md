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

### Advanced - New!

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

<a href="https://api.swo.moe/stats/afdian/afdian"><img src="assets/sources/logo_afdian.png" width="auto" height="64px" alt="logo_afdian" /></a>
<a href="https://api.swo.moe/stats/bilibili/401742377"><img src="assets/sources/logo_bilibili.png" width="auto" height="64px" alt="logo_bilibili" /></a>
<a href="https://api.swo.moe/stats/coolapk/466253"><img src="assets/sources/logo_coolapk.png" width="auto" height="64px" alt="logo_coolapk" /></a>
<a href="https://api.swo.moe/stats/feedly/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="assets/sources/logo_feedly.png" width="auto" height="64px" alt="logo_feedly" /></a>
<a href="https://api.swo.moe/stats/feedspub/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="assets/sources/logo_feedspub.png" width="auto" height="64px" alt="logo_feedspub" /></a>
<a href="https://api.swo.moe/stats/github/spencerwooo"><img src="assets/sources/logo_github.png" width="auto" height="64px" alt="logo_github" /></a>
<a href="https://api.swo.moe/stats/inoreader/https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml"><img src="assets/sources/logo_inoreader.png" width="auto" height="64px" alt="logo_inoreader" /></a>
<a href="https://api.swo.moe/stats/instagram/9gag"><img src="assets/sources/logo_ins.png" width="auto" height="64px" alt="logo_ins" /></a>
<a href="https://api.swo.moe/stats/jike/2204A477-38C8-4D9D-9705-9C9B990BE042"><img src="assets/sources/logo_jike.png" width="auto" height="64px" alt="logo_jike" /></a>
<a href="https://api.swo.moe/stats/medium/SpencerWooo"><img src="assets/sources/logo_medium.png" width="auto" height="64px" alt="logo_medium" /></a>
<a href="https://api.swo.moe/stats/neteasemusic/416608258"><img src="assets/sources/logo_neteasemusic.png" width="auto" height="64px" alt="logo_neteasemusic" /></a>
<a href="https://api.swo.moe/stats/reddit/jushoro"><img src="assets/sources/logo_reddit.png" width="auto" height="64px" alt="logo_reddit" /></a>
<a href="https://api.swo.moe/stats/sspai/spencerwoo"><img src="assets/sources/logo_sspai.png" width="auto" height="64px" alt="logo_sspai" /></a>
<a href="https://api.swo.moe/stats/steam/401742377"><img src="assets/sources/logo_steam.png" width="auto" height="64px" alt="logo_steam" /></a>
<a href="https://api.swo.moe/stats/telegram/realSpencerWoo"><img src="assets/sources/logo_tg.png" width="auto" height="64px" alt="logo_tg" /></a>
<a href="https://api.swo.moe/stats/twitter/GenshinImpact"><img src="assets/sources/logo_twitter.png" width="auto" height="64px" alt="logo_twitter" /></a>
<a href="https://api.swo.moe/stats/unsplash/adamhoang"><img src="assets/sources/logo_unsplash.png" width="auto" height="64px" alt="logo_unsplash" /></a>
<a href="https://api.swo.moe/stats/weibo/5648729445"><img src="assets/sources/logo_weibo.png" width="auto" height="64px" alt="logo_weibo" /></a>
<a href="https://api.swo.moe/stats/wikipediazh/ChenSimon"><img src="assets/sources/logo_wikipedia.png" width="auto" height="64px" alt="logo_wikipedia" /></a>
<a href="https://api.swo.moe/stats/zhihu/bi-xiao-tian-99"><img src="assets/sources/logo_zhihu.png" width="auto" height="64px" alt="logo_zhihu" /></a>

## What's new?

Yes, `substats` is now version `v2.0-beta`! Most of the updates are under-the-hood apart from API formats.

- [x] Refactored in TypeScript.
- [x] Updated to CloudFlare's module workers.
- [x] Worker is built with `esbuild` instead of `webpack`, extra fast!
- [x] Support for Newsblur has been deprecated ~~(seems nobody uses it)~~.
- [x] KV storages are now supported, some routes including `instagram` and `inoreader` depends on this for storing cookies (wip).
- [x] Caching is ported to module workers in 2.0 and supported as always.
- [ ] New documentation and query builder (wip).

If you are looking for the multiple source and query functions in 2.0 - it's still under refactor, as `itty-router` does not parse multiple query parameters, blocking this feature here. You can still use the 1.0 route while we wait. [README and documentation for v1.0 (deprecated)](https://github.com/spencerwooo/substats/blob/1becc576f09b09cfa1389312d081f02a25ed0735/README.md).

## Sponsoring

Open-source is hard! If you happen to like this project and want me to keep going, please consider sponsoring me or providing a single donation! Thanks for all the love and support!

[🧸 Please donate - 微信/支付宝](https://ovi.swo.moe/sponsor) · [Patreon](https://www.patreon.com/spencerwoo) · [爱发电](https://afdian.net/@spencerwoo)

## License

[MIT](LICENSE)

<div align="center">
  <img src="assets/footer.png" />
  <em>made with ❤️ by <a href="https://spencerwoo.com">spencer woo</a></em>
</div>
