<div align="center">
  <img src="./assets/header.png" alt="substats" />
  <h3><a href="https://api.swo.moe/stats">substats</a></h3>
  <p><a href="#get-started">Get started</a> · <a href="whats-new">What's new?</a> · <a href="sponsoring">Sponsoring</a></p>
  <p>•᷄ࡇ•᷅ <em>how many followers do i have? how many!</em></p>

  <img src="https://img.shields.io/badge/Cloudflare-F69652?style=flat&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/Version-2.0*-F69652?style=flat&labelColor=2B3137" alt="Version 2.0/substats" />
  <a href="https://github.com/spencerwooo/substats/actions?query=workflow%3ADeploy"><img src="https://github.com/spencerwooo/substats/workflows/Deploy/badge.svg" alt="Vercel" /></a>
</div>

## Get started

> sub · stats /səb ˈ stats/
> - a serverless api for getting the number of followers of you in your favourite services

_*Version 2.0 is still in `beta`, not all features are ported from 1.0. Check below for details 👇_

### Basic

You request:

```http
GET https://api.swo.moe/stats/:source/:key
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
GET https://api.swo.moe/stats/common/?endpoint=https://api.genshin.dev/domains/cecilia-garden&datapath=rewards.0.details.2.mora
```

In this case, the `endpoint` is an API url:

```http
GET https://api.genshin.dev/domains/cecilia-garden
```

The response this URL returns looks like:

```json
{
  "name": "Cecilia Garden",
  "type": "Forgery",
  // ...
  "rewards": [
    {
      "details": [
        {
          "mora": 1125,
        },
      ]
    }
  ]
}
```

Hence, we provide the `datapath` as `rewards.0.detals.2.mora`. (I specifically chose this data as it contains an array to demonstrate how to reference the value `mora` inside the array by index.)

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

<img src="assets/sources/logo_afdian.png" height="64px" alt="logo_afdian" />
<img src="assets/sources/logo_bilibili.png" height="64px" alt="logo_bilibili" />
<img src="assets/sources/logo_coolapk.png" height="64px" alt="logo_coolapk" />
<img src="assets/sources/logo_feedly.png" height="64px" alt="logo_feedly" />
<img src="assets/sources/logo_feedspub.png" height="64px" alt="logo_feedspub" />
<img src="assets/sources/logo_github.png" height="64px" alt="logo_github" />
<img src="assets/sources/logo_inoreader.png" height="64px" alt="logo_inoreader" />
<img src="assets/sources/logo_ins.png" height="64px" alt="logo_ins" />
<img src="assets/sources/logo_jike.png" height="64px" alt="logo_jike" />
<img src="assets/sources/logo_medium.png" height="64px" alt="logo_medium" />
<img src="assets/sources/logo_neteasemusic.png" height="64px" alt="logo_neteasemusic" />
<img src="assets/sources/logo_reddit.png" height="64px" alt="logo_reddit" />
<img src="assets/sources/logo_sspai.png" height="64px" alt="logo_sspai" />
<img src="assets/sources/logo_steam.png" height="64px" alt="logo_steam" />
<img src="assets/sources/logo_tg.png" height="64px" alt="logo_tg" />
<img src="assets/sources/logo_twitter.png" height="64px" alt="logo_twitter" />
<img src="assets/sources/logo_unsplash.png" height="64px" alt="logo_unsplash" />
<img src="assets/sources/logo_weibo.png" height="64px" alt="logo_weibo" />
<img src="assets/sources/logo_wikipedia.png" height="64px" alt="logo_wikipedia" />
<img src="assets/sources/logo_zhihu.png" height="64px" alt="logo_zhihu" />

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
