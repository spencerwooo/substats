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

**PROs:**

- 🧊 Serverless deployment, minimum overhead (powered by Cloudflare)
- 🚀 Ultra-fast reachablility for all services (even in mainland China!)
- 🎈 Simple integration, easy-to-use API with nice badges provided by [Shields.io](https://shields.io/)

See here for my blog post: [「Substats — 快速统计你在各个平台的关注者！」](https://blog.spencerwoo.com/2020/03/substats/).

## Supported services <Badge text="new" />

> List of supported services is ever growing, feel free to contribute.

<a href="/api"><img src="./assets/logo_bilibili.png" alt="bilibili" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_coolapk.png" alt="coolapk" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_feedly.png" alt="feedly" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_github.png" alt="github" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_ins.png" alt="instagram" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_medium.png" alt="medium" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_neteasemusic.png" alt="neteaseMusic" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_newsblur.png" alt="newsblur" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_reddit.png" alt="reddit" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_sspai.png" alt="sspai" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_tg.png" alt="telegram" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_twitter.png" alt="twitter" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_weibo.png" alt="weibo" width="auto" height="64px"/></a>
<a href="/api"><img src="./assets/logo_zhihu.png" alt="zhihu" width="auto" height="64px"/></a>

## What's next?

- 📖 For how to **structure your requests** to accommodate the Substats API, please continue on: [Docs | Substats Query Format](/query.md).
- 🎮 For a detailed documentation on the **API request rules of each service**, please continue on: [Docs | Substats API Details](/api.md).
- 💡 To **contribute** a new platform/service/website integration, please continue on: [Docs | Contributing](/dev/).
