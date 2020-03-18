# API details

> 🍌 **API docs by services:** detailed API documentation for each service.

## API endpoint

```
https://api.spencerwoo.com/substats/
```

## RSS

### Feedly

[![](https://img.shields.io/badge/dynamic/json?label=Feedly%20RSS%20Subscribers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dfeedly%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=2bb24c&logo=feedly)](https://api.spencerwoo.com/substats/?source=feedly&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=feedly&queryKey={QUERY}
```

- **Source shorthand:** `feedly`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

## Social media

### Bilibili <Badge text="new" />

[![](https://img.shields.io/badge/Bilibili%20Fans-2333-FE7398)](https://api.spencerwoo.com/substats/?source=bilibili&queryKey=208259)

```http
GET /?source=bilibili&queryKey={QUERY}
```

- **Source shorthand:** `bilibili`
- **Query key:** Bilibili UID - the UID after `space.bilibili.com/` in your Bilibili user profile URL. For instance: a valid Bilibili UID is the `208259` part in the user profile URL `https://space.bilibili.com/208259`.

### Instagram <Badge text="new" />

[![](https://img.shields.io/badge/dynamic/json?color=E4405F&label=Instagram%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dinstagram%26queryKey%3Dvertigo_woo98&logo=instagram&logoColor=white)](https://api.spencerwoo.com/substats/?source=instagram&queryKey=vertigo_woo98)

```http
GET /?source=instagram&queryKey={QUERY}
```

- **Source shorthand:** `instagram`
- **Query key:** Instagram username - the username after `instagram.com/` in your Instagram user profile URL. For instance: a valid Instagram username is the `vertigo_woo98` part in the user profile URL `https://www.instagram.com/vertigo_woo98`.

### Twitter

[![](https://img.shields.io/badge/dynamic/json?label=Twitter%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtwitter%26queryKey%3DrealSpencerWoo&color=1da1f2&logo=twitter)](https://api.spencerwoo.com/substats/?source=twitter&queryKey=realSpencerWoo)

```http
GET /?source=twitter&queryKey={QUERY}
```

- **Source shorthand:** `twitter`
- **Query key:** Twitter username - the username after `twitter.com/` in your Twitter user profile URL. For instance: a valid Twitter username is the `realSpencerWoo` part in the user profile URL `https://twitter.com/realSpencerWoo`.

### 微博 <Badge text="new" />

[![](https://img.shields.io/badge/dynamic/json?label=%E5%BE%AE%E5%8D%9A%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dweibo%26queryKey%3D2867502440&color=E6162D&logo=sina-weibo)](https://api.spencerwoo.com/substats/?source=weibo&queryKey=2867502440)

```http
GET /?source=weibo&queryKey={QUERY}
```

- **Source shorthand:** `weibo`
- **Query key:** Weibo `uid` - the user ID after `weibo.com/u/` in your Weibo user profile URL. For instance: a valid Weibo `uid` is the `2867502440` part in the user profile URL `https://weibo.com/u/2867502440`.

:::warning 🚥 Note
For users who have custom `uid`s for your Weibo account, you can find your `uid` using this method: [什么是微博 uid？怎么查看微博 uid？](http://blog.sina.com.cn/s/blog_9a773e3601010zz9.html)
:::

## Dev

### GitHub

[![](https://img.shields.io/badge/dynamic/json?label=GitHub%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dgithub%26queryKey%3Dspencerwooo&color=181717&logo=github)](https://api.spencerwoo.com/substats/?source=github&queryKey=spencerwooo)

```http
GET /?source=github&queryKey={QUERY}
```

- **Source shorthand:** `github`
- **Query key:** GitHub `user_login` (username) - the username after `github.com/` in your user profile URL. For instance: a valid `user_login` is the `spencerwooo` part in the user profile page URL `https://github.com/spencerwooo`.

## Websites

### Medium <Badge text="new" />

[![](https://img.shields.io/badge/dynamic/json?label=Medium%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dmedium%26queryKey%3D%40SpencerWooo&logo=medium&color=12100E)](https://api.spencerwoo.com/substats/?source=medium&queryKey=@SpencerWooo)

```http
GET /?source=medium&queryKey={QUERY}
```

- **Source shorthand:** `medium`
- **Query key:** Medium `username` - the username after `medium.com/` in your Medium user profile URL. For instance: a valid `username` is the `@SpencerWooo` part in the user profile URL `https://medium.com/@SpencerWooo`.

### 少数派

[![](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo&color=d71a1b)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo)

```http
GET /?source=sspai&queryKey={QUERY}
```

- **Source shorthand:** `sspai`
- **Query key:** 少数派 `user_slug` - the slug between `sspai.com/` and `posts` in your 少数派 user profile URL. For instance: a valid `user_slug` is the `spencerwoo` part in the user profile URL `https://sspai.com/u/spencerwoo/posts`.

### 知乎

[![](https://img.shields.io/badge/dynamic/json?color=0084ff&label=%E7%9F%A5%E4%B9%8E%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dzhihu%26queryKey%3Dspencer-woo-64)](https://api.spencerwoo.com/substats/?source=zhihu&queryKey=spencer-woo-64)

```http
GET /?source=zhihu&queryKey={QUERY}
```

- **Source shorthand:** `zhihu`
- **Query key:** 知乎 `url_token` - the username after `zhihu.com/people/` in your 知乎 user profile URL. For instance: a valid `url_token` is the `spencer-woo-64` part in the user profile URL `https://www.zhihu.com/people/spencer-woo-64`.
