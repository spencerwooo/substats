---
title: Home
---

<img src="./assets/substats.svg" alt="substats-logo" width="360px" height="auto" >

> Serverless Function to Count How Many People are Subscribed to You in Your Favorite Services

[![Now on Cloudflare Workers](https://img.shields.io/badge/Now%20on-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=f38020)](https://api.spencerwoo.com/substats/)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m784533782-966fa87a7f1afd93c9cc4e51?label=Status&color=00B0D8&logo=probot&logoColor=white)](https://stats.uptimerobot.com/92yjVTmk63/784533782)
[![Deploy](https://github.com/spencerwooo/Substats/workflows/Deploy/badge.svg)](https://github.com/spencerwooo/Substats/actions?query=workflow%3ADeploy)
[![Netlify](https://img.shields.io/netlify/34dba5ee-8e3f-4c0d-bc4e-1023f4a1c2ae?color=01ad9f&label=Docs&logo=netlify)](https://substats.spencerwoo.com/)

## Why I did this?

I initially wanted to combine the subscriber numbers of Feedly and Inoreader — two of the most popular RSS providers, to calculate how many people are subscribed to my blog's RSS. Then it occured to me: I could actually make this into a "Hub", where you can provide **a service name, a query key**, and out comes the total subscribers of all your services...Hence, I proudly introduce: **Substats**!

### PROs

- 🧊 Serverless deployment, minimum overhead (powered by Cloudflare)
- 🚀 Ultra-fast reachablility for all services (even in mainland China!)
- 🎈 Simple integration, easy-to-use API with nice badges provided by [Shields.io](https://shields.io/)

### Further reading

- [少数派详解：《做一个好看的数据展示「小标签」，在个人网站实时展示你的粉丝数》](https://sspai.com/post/59593)
- [博客简介：《Substats — 快速统计你在各个平台的关注者！》](https://blog.spencerwoo.com/2020/03/substats/)

## Supported services <Badge text="new" />

> List of supported services is ever growing, feel free to contribute.

<a href="/api"><img src="./assets/logo_bilibili.png" alt="bilibili" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_coolapk.png" alt="coolapk" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_feedly.png" alt="feedly" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_github.png" alt="github" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_inoreader.png" alt="inoreader" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_ins.png" alt="instagram" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_medium.png" alt="medium" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_neteasemusic.png" alt="neteaseMusic" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_newsblur.png" alt="newsblur" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_reddit.png" alt="reddit" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_sspai.png" alt="sspai" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_steam.png" alt="steam" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_tg.png" alt="telegram" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_twitter.png" alt="twitter" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_weibo.png" alt="weibo" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_zhihu.png" alt="zhihu" width="auto" height="64px"/></a>

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/spencerwooo/dowww/graphs/contributors"><img src="https://opencollective.com/substats/contributors.svg" /></a>

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

[![爱发电](https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5-@SpencerWoo-946ce6?labelColor=24292e&style=for-the-badge&logo=data:image/png;base64,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)](https://afdian.net/@spencerwoo)

## What's next?

- 📖 For how to **structure your requests** to accommodate the Substats API, please continue on: [Docs | Substats Query Format](/query.md).
- 🎮 For a detailed documentation on the **API request rules of each service**, please continue on: [Docs | Substats API Details](/api.md).
- 💡 To **contribute** a new platform/service/website integration, please continue on: [Docs | Contributing](/dev/).
