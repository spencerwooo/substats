<img src="./assets/substats.svg" alt="substats-logo" width="360px" height="auto" />

<h6>Serverless Function to Count How Many People are Subscribed to You in Your Favorite Services</h6>

[![Deployed to cloudflare](https://img.shields.io/badge/deployed%20on-Cloudflare%20Workers-f38020?logo=cloudflare)](https://api.spencerwoo.com/substats/)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m784533782-966fa87a7f1afd93c9cc4e51?label=status)](https://stats.uptimerobot.com/92yjVTmk63/784533782)

<h2>Table of contents</h2>

- [Why I did this?](#why-i-did-this)
- [API](#api)
  - [API endpoint](#api-endpoint)
  - [Query string](#query-string)
- [Examples](#examples)
  - [Single query](#single-query)
  - [Multiple sources with a single query string](#multiple-sources-with-a-single-query-string)
  - [Multiple queries](#multiple-queries)
- [Supported services](#supported-services)
- [Development](#development)
- [Disclaimer](#disclaimer)

## Why I did this?

I initially wanted to combine the subscriber numbers of Feedly and Inoreader — two of the most popular RSS providers, to calculate how many people are subscribed to my blog's RSS. Then it occured to me: I could actually make this into a "Hub", where you can provide **a service name, a query key**, and out comes the total subscribers of all your services...Hence, I proudly introduce: **Substats**!

**PROs:**

- 🧊 Serverless deployment, minimum overhead (powered by Cloudflare)
- 🚀 Ultra-fast reachablility for all services (even in mainland China!)
- 🎈 Simple integration, easy-to-use API with nice badges provided by [Shields.io](https://shields.io/)

## API

<h6>Only 'GET' requests are handled in order to integrate with badges.</h6>

### API endpoint

```
https://api.spencerwoo.com/substats/
```

### Query string

Simple query string:

```http
GET /?source={SOURCE}&queryKey={QUERY}
```

Query string shorthand with multiple services and single query (Good for RSS links):

```http
GET /?source={SOURCE_1}|{SOURCE_2}|{SOURCE_3}&queryKey={QUERY}
```

Multiple `{ source: queryKey }` combination:

```http
GET /?source={SOURCE}&queryKey={QUERY}&source={SOURCE}&queryKey={QUERY}&source={SOURCE}&queryKey={QUERY} ....
```

_List sequence is preserved!_

## Examples

### Single query

You can make a single query to request your RSS subscribers on Feedly. (Inoreader support is coming!)

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
GET /?source=feedly|inoreader|rsshub&queryKey=https://blog.spencerwoo.com/posts/index.xml
```

Which returns:

```json
{
  "status": 200,
  "data": {
    "totalSubs": 13,
    "subsInEachSource": { "feedly": 13, "inoreader": 0, "rsshub": 0 },
    "failedSources": {
      "inoreader": "Not implemented",
      "rsshub": "Not implemented"
    }
  }
}
```

Enter the badge!

[![](https://img.shields.io/badge/dynamic/json?label=RSS%20subs&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dfeedly%257Cinoreader%257Crsshub%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=ffa500&logo=rss&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=feedly|inoreader|rsshub&queryKey=https://blog.spencerwoo.com/posts/index.xml)

### Multiple queries

```http
GET /?source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo
```

Which returns:

```json
{
  "status": 200,
  "data": {
    "totalSubs": 755,
    "subsInEachSource": { "sspai": 636, "twitter": 119 },
    "failedSources": {}
  }
}
```

And of course, our badges!

[![](https://img.shields.io/badge/dynamic/json?label=Social%20media&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo%26source%3Dtwitter%26queryKey%3DrealSpencerWoo&color=brightgreen&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)
[![](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE&query=%24.data.subsInEachSource.sspai&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo%26source%3Dtwitter%26queryKey%3DrealSpencerWoo&color=d71a1b&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)
[![](https://img.shields.io/badge/dynamic/json?label=Twitter&query=%24.data.subsInEachSource.twitter&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo%26source%3Dtwitter%26queryKey%3DrealSpencerWoo&color=1da1f2&logo=twitter&style=for-the-badge)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo&source=twitter&queryKey=realSpencerWoo)

## Supported services

<h6>For a detailed documentation on the API request rules of each service, please see: <a href="./doc/api.md">Substats Service API Documentation.</a></h6>

<table>
  <tr align="center">
    <td><img src="./assets/logo_feedly.png" width="auto" height="50px"/><h6>Feedly</h6></td>
    <td><img src="./assets/logo_github.png" width="auto" height="50px"/><h6>GitHub</h6></td>
    <td><img src="./assets/logo_sspai.png" width="auto" height="50px"/><h6>少数派</h6></td>
    <td><img src="./assets/logo_twitter.png" width="auto" height="50px"/><h6>Twitter</h6></td>
    <td><img src="./assets/logo_zhihu.png" width="auto" height="50px"/><h6>知乎</h6></td>
  </tr>
  <tr align="center">
    <td><code>feedly</code></td>
    <td><code>github</code></td>
    <td><code>sspai</code></td>
    <td><code>twitter</code></td>
    <td><code>zhihu</code></td>
  </tr>
</table>

## Development

This is a serverless function deployed on Cloudflare Workers. You should use `wrangler` to build, debug and preview the project.

Install dependencies:

```bash
npm install
```

Preview with [cloudflareworkers.com](https://cloudflareworkers.com):

```bash
wrangler preview --watch
```

**You can also contribute and help to implement more services that Substats can handle.**

## Disclaimer

All APIs used in this project are by no means in any relationship with the original content provider. APIs are subject to change. Your mileage may vary, so use this at your own risk.

---

**📈📉 Substats** ©Spencer Woo. Released under the [MIT License](./LICENSE).

Authored and maintained by Spencer Woo.

[@Portfolio](https://spencerwoo.com/) · [@Blog](https://blog.spencerwoo.com/) · [@GitHub](https://github.com/spencerwooo)
