<img src="../assets/substats.svg" alt="substats-logo" width="360px" height="auto" />

<h5>Substats Service API Documentation</h5>

<h2>Table of contents</h2>

- [API endpoint](#api-endpoint)
- [RSS](#rss)
  - [Feedly](#feedly)
- [Websites](#websites)
  - [少数派](#%e5%b0%91%e6%95%b0%e6%b4%be)
- [Social media](#social-media)
  - [Twitter](#twitter)

## API endpoint

```
https://api.spencerwoo.com/substats/
```

## RSS

### Feedly

[![](https://img.shields.io/badge/dynamic/json?label=Feedly&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dfeedly%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=2bb24c&logo=feedly)](https://api.spencerwoo.com/substats/?source=feedly&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=feedly&queryKey={QUERY}
```

- **Source shorthand:** `feedly`
- **Query key:** Your RSS link

## Websites

### 少数派

[![](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo&color=d71a1b)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo)

```http
GET /?source=sspai&queryKey={QUERY}
```

- **Source shorthand:** `sspai`
- **Query key:** your 少数派 user slug

## Social media

### Twitter

[![](https://img.shields.io/badge/dynamic/json?label=Twitter&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtwitter%26queryKey%3DrealSpencerWoo&color=1da1f2&logo=twitter)](https://api.spencerwoo.com/substats/?source=twitter&queryKey=realSpencerWoo)

```http
GET /?source=twitter&queryKey={QUERY}
```

- **Source shorthand:** `twitter`
- **Query key:** your Twitter username
