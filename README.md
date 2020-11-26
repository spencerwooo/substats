<img src="./docs/assets/substats.svg" alt="substats-logo" width="360px" height="auto" />

<h6>Serverless Function to Count How Many People are Subscribed to You in Your Favorite Services</h6>

[![Now on Cloudflare Workers](https://img.shields.io/badge/Now%20on-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=f38020)](https://api.spencerwoo.com/substats/)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m784533782-966fa87a7f1afd93c9cc4e51?label=Status&color=00B0D8&logo=probot&logoColor=white)](https://stats.uptimerobot.com/92yjVTmk63/784533782)
[![Deploy](https://github.com/spencerwooo/Substats/workflows/Deploy/badge.svg)](https://github.com/spencerwooo/Substats/actions?query=workflow%3ADeploy)
[![Vercel](https://badgen.net/https/now.swoo.workers.dev/dpl_FiMBkC6zs1o9eb36Hzd1fgnstM1D?labelColor=black&label=Vercel&icon=zeit)](https://substats.spencerwoo.com/)

[🚩 API endpoint](https://api.spencerwoo.com/substats) · [🚦 Status monitor](https://stats.uptimerobot.com/92yjVTmk63/784533782) · [📖 Documentation](https://substats.spencerwoo.com)

**🚀 NEW**: Substats now takes advantage of Cloudflare Workers' caching mechanism, thereby making itself faster than ever. You should see huge performance gains in terms of load time and responsiveness. Huge shout out to @chawyehsu who made this possible!

<h2>Table of contents</h2>

- [Why I did this?](#why-i-did-this)
  - [PROs](#pros)
  - [Further reading](#further-reading)
- [Examples](#examples)
  - [API endpoint](#api-endpoint)
  - [Single query](#single-query)
  - [Multiple sources with a single query string](#multiple-sources-with-a-single-query-string)
  - [Multiple queries](#multiple-queries)
- [Supported services](#supported-services)
- [Contributing](#contributing)
  - [Development](#development)
  - [Contributors](#contributors)
- [Sponsoring](#sponsoring)
- [Disclaimer](#disclaimer)

## Why I did this?

I initially wanted to combine the subscriber numbers of Feedly and Inoreader — two of the most popular RSS providers, to calculate how many people are subscribed to my blog's RSS. Then it occured to me: I could actually make this into a "Hub", where you can provide **a service name, a query key**, and out comes the total subscribers of all your services...Hence, I proudly introduce: **Substats**!

### PROs

- 🧊 Serverless deployment, minimum overhead (powered by Cloudflare)
- 🚀 Ultra-fast reachablility for all services (even in mainland China!)
- 🎈 Simple integration, easy-to-use API with nice badges provided by [Shields.io](https://shields.io/)

### Further reading

- [少数派详解：《做一个好看的数据展示「小标签」，在个人网站实时展示你的粉丝数》](https://sspai.com/post/59593)
- [博客简介：《Substats — 快速统计你在各个平台的关注者！》](https://blog.spencerwoo.com/2020/03/substats/)

## Examples

> 📖 For a detailed documentation on the query format, please see: [Docs | Substats Query format](https://substats.spencerwoo.com/query.html).

### API endpoint

<h6>🚦 Only 'GET' requests are handled in order to integrate with badges. </h6>

```
https://api.spencerwoo.com/substats/
```

### Single query

You can make a single query to request your RSS subscribers on Feedly.

```http
GET /?source=feedly&queryKey=https://blog.spencerwoo.com/posts/index.xml
```

Which returns:

```json
{ "status": 200, "data": { "totalSubs": 13, "subsInEachSource": { "feedly": 13 }, "failedSources": {} } }
```

You can then use the numbers in `data.totalSubs` in a dynamic badge:

[![](https://img.shields.io/badge/dynamic/json?label=Feedly&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dfeedly%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=2bb24c&logo=feedly&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=feedly&queryKey=https://blog.spencerwoo.com/posts/index.xml)

### Multiple sources with a single query string

```http
GET /?source=feedly|inoreader|newsblur&queryKey=https://blog.spencerwoo.com/posts/index.xml
```

Which returns:

```json
{
  "status": 200,
  "data": {
    "totalSubs": 49,
    "subsInEachSource": {
      "feedly": 17,
      "inoreader": 29,
      "newsblur": 3
    },
    "failedSources": {}
  }
}
```

Enter the badge! _(NewsBlur is too slow to load, below is a static badge for demo purposes.)_

[![](https://img.shields.io/badge/RSS%20Subscribers-49-ffa500?logo=rss&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=feedly|inoreader|newsblur&queryKey=https://blog.spencerwoo.com/posts/index.xml)

### Multiple queries

```http
GET /?source=telegram&queryKey=realSpencerWoo&source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo
```

Which returns:

```json
{
  "status": 200,
  "data": {
    "totalSubs": 1552,
    "subsInEachSource": {
      "telegram": 786,
      "sspai": 638,
      "twitter": 128
    },
    "failedSources": {}
  }
}
```

And of course, our badges!

[![](https://img.shields.io/badge/dynamic/json?label=Social%20media&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo%26source%3Dtwitter%26queryKey%3DrealSpencerWoo%26source%3Dtelegram%26queryKey%3DrealSpencerWoo&color=brightgreen&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo&source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)
[![](https://img.shields.io/badge/dynamic/json?label=realSpencerWoo&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtelegram%26queryKey%3DrealSpencerWoo&logo=telegram&color=2CA5E0&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo&source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)
[![](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE&query=%24.data.subsInEachSource.sspai&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo&color=d71a1b&style=for-the-badge&logo=data:image/png;base64,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)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo&source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)
[![](https://img.shields.io/badge/dynamic/json?label=Twitter&query=%24.data.subsInEachSource.twitter&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtwitter%26queryKey%3DrealSpencerWoo&color=1da1f2&logo=twitter&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo&source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)

## Supported services

> 📖 For a detailed documentation on the API request rules of each service, please see: [Docs | Substats API Details](https://substats.spencerwoo.com/api.html).

<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_afdian.png" alt="afdian" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_bilibili.png" alt="bilibili" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_coolapk.png" alt="coolapk" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_feedly.png" alt="feedly" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_feedspub.png" alt="Feeds Pub" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_github.png" alt="github" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_inoreader.png" alt="inoreader" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_ins.png" alt="instagram" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_jike.png" alt="jike" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_medium.png" alt="medium" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_neteasemusic.png" alt="neteaseMusic" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_newsblur.png" alt="newsblur" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_reddit.png" alt="reddit" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_sspai.png" alt="sspai" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_steam.png" alt="steam" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_tg.png" alt="telegram" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_twitter.png" alt="twitter" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_unsplash.png" alt="unsplash" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_weibo.png" alt="weibo" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_wikipedia.png" alt="Wikipedia (zh)" width="auto" height="64px"/></a>
<a href="https://substats.spencerwoo.com/api.html"><img src="./docs/assets/logo_zhihu.png" alt="zhihu" width="auto" height="64px"/></a>

## Contributing

### Development

This is a serverless function deployed on Cloudflare Workers. Please check: [Docs | How to contribute](https://substats.spencerwoo.com/dev/) if you want to contribute.

### Contributors

This project exists thanks to all the people who contribute.

<!-- <a href="https://github.com/spencerwooo/Substats/graphs/contributors"><img src="https://opencollective.com/substats/contributors.svg" /></a> -->

[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/0)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/0)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/1)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/1)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/2)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/2)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/3)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/3)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/4)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/4)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/5)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/5)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/6)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/6)[![](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/images/7)](https://sourcerer.io/fame/spencerwooo/spencerwooo/Substats/links/7)

## Sponsoring

Thank you for considering donations and sponoring our project. We currently support sponsoring via Open Collective.

|                                                                          Backers                                                                           |                                                                                 Sponsors                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        Support this project by becoming a backer. Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/substats#backer)]         | Support this project by becoming a sponsor. Your logo will show up here with a link to your website. 🌏 [[Become a sponsor](https://opencollective.com/substats#sponsor)] |
| <a href="https://opencollective.com/substats#backers" target="_blank"><img src="https://opencollective.com/substats/tiers/backer.svg?avatarHeight=50"></a> |   <a href="https://opencollective.com/substats/sponsor/0/website" target="_blank"><img src="https://opencollective.com/substats/tiers/sponsor.svg?avatarHeight=50"></a>   |

对于国内用户，我们支持直接通过微信和支付宝进行小额赞助！

|                                         微信支付                                         |                                          支付宝支付                                          |
| :--------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| <img src="https://i.loli.net/2018/03/13/5aa7ae214b63f.jpg" alt="微信支付" width="200px"> | <img src="https://i.loli.net/2020/03/26/f2GT6StAchgqea4.png" alt="支付宝支付" width="200px"> |

您也可以利用「爱发电」来对我进行支持！

[![爱发电](https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5-@SpencerWoo-946ce6?labelColor=24292e&style=for-the-badge)](https://afdian.net/@spencerwoo)

## Disclaimer

All APIs used in this project are by no means in any relationship with the original content provider. APIs are subject to change. Your mileage may vary, so use this at your own risk.

---

**📈📉 Substats** ©Spencer Woo. Released under the [MIT License](./LICENSE).

Authored and maintained by Spencer Woo.

[@Portfolio](https://spencerwoo.com/) · [@Blog](https://blog.spencerwoo.com/) · [@GitHub](https://github.com/spencerwooo)
