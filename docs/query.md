# Query format

## API

> Only 'GET' requests are handled in order to integrate with badges.

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
