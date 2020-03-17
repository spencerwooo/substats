---
title: Home
---

<img src="/img/substats.svg" alt="substats-logo" width="360px" height="auto" >

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

<table>
  <tr align="center">
    <td><img src="./assets/logo_feedly.png" width="auto" height="50px"/><h6>Feedly</h6></td>
    <td><img src="./assets/logo_github.png" width="auto" height="50px"/><h6>GitHub</h6></td>
    <td><img src="./assets/logo_ins.png" width="auto" height="50px"/><h6>Instagram</h6></td>
    <td><img src="./assets/logo_medium.png" width="auto" height="50px"/><h6>Medium</h6></td>
    <td><img src="./assets/logo_sspai.png" width="auto" height="50px"/><h6>少数派</h6></td>
    <td><img src="./assets/logo_twitter.png" width="auto" height="50px"/><h6>Twitter</h6></td>
    <td><img src="./assets/logo_zhihu.png" width="auto" height="50px"/><h6>知乎</h6></td>
  </tr>
  <tr align="center">
    <td><code>feedly</code></td>
    <td><code>github</code></td>
    <td><code>instagram</code></td>
    <td><code>medium</code></td>
    <td><code>sspai</code></td>
    <td><code>twitter</code></td>
    <td><code>zhihu</code></td>
  </tr>
</table>

## Next

- For how to structure your requests to accommodate the Substats API, please continue on: [Substats Query Format](/query.md)
- For a detailed documentation on the API request rules of each service, please see: [Substats API Details](/api.md).
- To contribute a new platform/service/website, please see: [Contributing](/dev.md)
