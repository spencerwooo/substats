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

[![爱发电](https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5-@SpencerWoo-946ce6?labelColor=24292e&style=for-the-badge)](https://afdian.net/@spencerwoo)

## What's next?

- 📖 For how to **structure your requests** to accommodate the Substats API, please continue on: [Docs | Substats Query Format](/query.md).
- 🎮 For a detailed documentation on the **API request rules of each service**, please continue on: [Docs | Substats API Details](/api.md).
- 💡 To **contribute** a new platform/service/website integration, please continue on: [Docs | Contributing](/dev/).
