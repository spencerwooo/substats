# API details

:::tip 🍌 Detailed API reference
API docs by services: detailed API documentation for each service.
:::

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

### NewsBlur <Badge text="new" />

[![](https://img.shields.io/badge/dynamic/json?label=NewsBlur%20RSS%20Subscribers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dnewsblur%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=de922e&logo=data:image/png;charset=utf-8;base64,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)](https://api.spencerwoo.com/substats/?source=newsblur&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=feedly&queryKey={QUERY}
```

- **Source shorthand:** `newsblur`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

## Social media

### Bilibili <Badge text="new" />

[![](https://img.shields.io/badge/dynamic/json?color=FE7398&label=bilibili%20fans&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D208259&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc/pXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx+bCQD8/S9tmgVqeDr1lLigDgZvDhXso+K9TyTBQRwRJ8AHjntl0Flh5QRAQK/mKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR/RwkRKPizBN8CgEcuESj4Lwm+BwBjahEk+H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l+72BSs8d7w8U+JDAnZERQMcV+CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T+5aVk6+2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I/wcSbXU5jQBUkRtdf4Rar90v8kSv3+I3ffCCSpk8I/w+lgDkdI/v2rEp2CaiWm1AsDQLlDAD+dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3/BBMHEyBmDXlFfA8IzeHb+Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC/A8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu/ZaEcCUxFvgz2zO+BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U/H50Pq4JNP7Qiw8UFnJwcK+tXy+Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC+OIx5TDqo5nDT+F/SS/9CYzwb+No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd+I0HPXslLKnT0N+wnkrTKi9JZL/L9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td/Tvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC/osSYvjRQz4cJ6n7KO3rYQL7M+L6nVtfDVRAEQRAEQRAEQRAEIZ5/SAXmdfXaoQsAAAAASUVORK5CYII=)](https://api.spencerwoo.com/substats/?source=bilibili&queryKey=208259)

```http
GET /?source=bilibili&queryKey={QUERY}
```

- **Source shorthand:** `bilibili`
- **Query key:** Bilibili UID - the UID after `space.bilibili.com/` in your Bilibili user profile URL. For instance: a valid Bilibili UID is the `208259` part in the user profile URL `https://space.bilibili.com/208259`.

### Instagram

[![](https://img.shields.io/badge/dynamic/json?color=E4405F&label=Instagram%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dinstagram%26queryKey%3Dvertigo_woo98&logo=instagram&logoColor=white)](https://api.spencerwoo.com/substats/?source=instagram&queryKey=vertigo_woo98)

```http
GET /?source=instagram&queryKey={QUERY}
```

- **Source shorthand:** `instagram`
- **Query key:** Instagram username - the username after `instagram.com/` in your Instagram user profile URL. For instance: a valid Instagram username is the `vertigo_woo98` part in the user profile URL `https://www.instagram.com/vertigo_woo98`.

### Telegram <Badge text="new" />

:::tip 🪐 Note
This API is capable of getting both **Telegram Channel subscribers** and **Telegram Group Chat members** if you provide the valid `chat_id` for each service.
:::

[![](https://img.shields.io/badge/dynamic/json?label=t.me%2FrealSpencerWoo&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtelegram%26queryKey%3DrealSpencerWoo&logo=telegram&color=2CA5E0)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo)

```http
GET /?source=telegram&queryKey={QUERY}
```

- **Source shorthand:** `telegram`
- **Query key:** Telegram chat/channel `chat_id` - the `chat_id` after `t.me/` in your Telegram chat/channel URL. For instance: a valid Telegram chat/channel `chat_id` is the `realSpencerWoo` part in the chat/channel URL `https://t.me/realSpencerWoo`.

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

:::tip 🚥 Note
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

### Medium

[![](https://img.shields.io/badge/dynamic/json?label=Medium%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dmedium%26queryKey%3D%40SpencerWooo&logo=medium&color=12100E)](https://api.spencerwoo.com/substats/?source=medium&queryKey=@SpencerWooo)

```http
GET /?source=medium&queryKey={QUERY}
```

- **Source shorthand:** `medium`
- **Query key:** Medium `username` - the username after `medium.com/` in your Medium user profile URL. For instance: a valid `username` is the `@SpencerWooo` part in the user profile URL `https://medium.com/@SpencerWooo`.

### 少数派

[![](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo&color=d71a1b&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAF0klEQVR4nO1dvW7jOBD2I7gkh426pHS127pIeiN5AdsvsH4CIw8gwL1dpHaV0mWqu1aNLCrAAkbWwAKBYTiCcTBwgMEr/HN7e5aoH5JDS/qAAVIEtvV9nBlySI4ajRo1atSoIYPnOM05Y605Y60AoBMAdDhhXU5Y9/A3aXNC2nPGWti/9erhOU4zAOiElI04pa8hBS+ksOEURAZbhBReQspGnLCu5zhN7OeyFp7jNDkh7TmBp5CCl5HojKKwUQDQwX5mK8AJaYeUjXKMbiV28A7SxubBKE6jXfNIzygEeJywLjY3WvFvXLeH+MoIYduITyNEKfKE5zjNw0wGn9RcBvDMCXGwecyF46hHSa6q7eq8IaB0UBbyzyJQOsDmVYqrDzkSCym8YHMciwP58IJNkgERPOtW1XPGWpzCApscgyJsrKk5Hef2pYr3qQ17FT1nrFVZ8o+G5gme4zR5hcJOnIUUNsbXClVJuBlE8IwKUOapZgERzExRA0oH2A9rq2lfrFV6xpNWBF1li2Pcr8mXmLakXMf9TCKozQeckDb2Q+m0t5tbsbi7F8teX6xcV3xOp+Lnt0Ghz1QWig7zffqKTZJqoj+GQ7EeT8TO98U+isQlFBEhpLBRIgAnrItNnG6i47CdzYr9FhXbmzZvJaoiWpcAhb0gAOhgk2yC6DjsfL/47y/iBaZjPxbRcViPJ4WfKbcXHGv8lSD6EvZRJN4fHtU8c56y9ZzAk0rS3x8excp1rSP6Ena+L5a9vrpBB/CciXzVpebtbIbNaSz2USR2vi8+p1PxMRyKxd29co/PHIZUJt9lr4/N8f9wGuGLu3vxdnOrnPDLYShDMuYAz6q++HM6NUruPorE3z9+JP6PiuSawwvSlyeuIfz8GjpWriveHx7PI3pxd2+jAOnCECfEUfnFqgTY+f5/iE76ThsF4BREqiqp6sXXejxRIkAW0mwVINWGjcr4f4mMU+jYzmZi5brnZKiStO9fvlopQKo8oGuz/URy3KxDJWmyz1q5LooAnNJXuQcgHTWpggCpEjHOyKiGAJyCSDxXqrP+Y5MAH8MhmgCJdSHMrUeVAsgSei1ApQVIKElgbj+qFOD94dFaARLXArUAtQDVFgBzD7gqAiTmgLIIINuDQPWApANbZZkFyQTAXIjJBFBairZVgM/pFE2AxHXAcS+49AIUPvFWTAAnVoBGoxzFuLebWysFSFmMwzmIq7qGn3T0RcmJt3wCyO+SYd0DUC3AzvdjP2sfRSgCpDofhLUYUy2AbCtUx/kfmc0JPEkFwErEqgX4+W2Q+Hkoa4G0V5c4QiJWLYAsEZsOQ5lOx2HkAR0b6bIjMUWvIWUUIP3BLIyShA4BZGHIpBdkvjNm+kqqDgFkYciUF4QUNpl7DJkOQ7rO8sjOpprwglzXVk1v0OsSII0X6C7O5b6yyg3OhmQCFLkwsXJdqQjfv3zV9WyLXOQ3GmYXZUkC7KOoEEFvN7fSI+u6KqSpFl82eEFSqFARImQV0qIix43+wg3+THlBnADb2UzZLRbZukD16rjw6DftBb/OWPZRJNbjifIrRH/98WesAIqnpMVH/1kAg1uVy15fLHt9rXe3lr2+WI8nYjubie1sJtbjiborqUdT3jeo7hGX3rS0L8Pcrrwm09rUtex9g5SY7hdA1E374i2kbKSV/BPqfHDBAJ6NNvW2uY+QaUPpqF53UTyTj9dJHfNKkw0WUtigv96kqjOjQ39QS155VbU29laM/N9xzAmlT8yHl71Z/Gqrck9R6at174+5BNXtzmywkLLRVZB/QlmSs1XJNis8x2mq7r5i1uir1fE+LY7esMAnNLUtrnbUJ+FYyLNWiJDCJqB0cFWxPg8sFGJRCeJ/RwDQwcoRIYVNSOFlzlircsRfwkkMnSvqE+mcsG5NegI4IU5A6eDgHfnurB3J9kIKL3MCT9a8+/GawQlpBwCdAKDDCesGlA7OBtDhhLTrkFKjRo0aqfEPTet8XSy2Km4AAAAASUVORK5CYII=)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo)

```http
GET /?source=sspai&queryKey={QUERY}
```

- **Source shorthand:** `sspai`
- **Query key:** 少数派 `user_slug` - the slug between `sspai.com/` and `posts` in your 少数派 user profile URL. For instance: a valid `user_slug` is the `spencerwoo` part in the user profile URL `https://sspai.com/u/spencerwoo/posts`.

### 知乎

[![](https://img.shields.io/badge/dynamic/json?color=0084ff&label=%E7%9F%A5%E4%B9%8E%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dzhihu%26queryKey%3Dspencer-woo-64&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgOTEiIHdpZHRoPSI2NCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzBmODhlYiI+PHBhdGggZD0iTTUzLjI5IDgwLjAzNWw3LjMyLjAwMiAyLjQxIDguMjQgMTMuMTI4LTguMjRoMTUuNDc3di02Ny45OEg1My4yOXY2Ny45Nzh6bTcuNzktNjAuNTk4aDIyLjc1NnY1My4yMmgtOC43M2wtOC43MTggNS40NzMtMS41ODctNS40Ni0zLjcyLS4wMTJ2LTUzLjIyek00Ni44MTggNDMuMTYyaC0xNi4zNWMuNTQ1LTguNDY3LjY4Ny0xNi4xMi42ODctMjIuOTU1aDE1Ljk4N3MuNjE1LTcuMDUtMi42OC02Ljk3SDE2LjgwN2MxLjA5LTQuMSAyLjQ2LTguMzMyIDQuMS0xMi43MDggMCAwLTcuNTIzIDAtMTAuMDg1IDYuNzQtMS4wNiAyLjc4LTQuMTI4IDEzLjQ4LTkuNTkyIDI0LjQxIDEuODQtLjIgNy45MjctLjM3IDExLjUxMi02Ljk0LjY2LTEuODQuNzg1LTIuMDggMS42MDUtNC41NGg5LjAyYzAgMy4yOC0uMzc0IDIwLjktLjUyNiAyMi45NUg2LjUxYy0zLjY3IDAtNC44NjMgNy4zOC00Ljg2MyA3LjM4SDIyLjE0QzIwLjc2NSA2Ni4xMSAxMy4zODUgNzkuMjQgMCA4OS42MmM2LjQwMyAxLjgyOCAxMi43ODQtLjI5IDE1LjkzNy0zLjA5NCAwIDAgNy4xODItNi41MyAxMS4xMi0yMS42NEw0My45MiA4NS4xOHMyLjQ3My04LjQwMi0uMzg4LTEyLjQ5NmMtMi4zNy0yLjc4OC04Ljc2OC0xMC4zMy0xMS40OTYtMTMuMDY0bC00LjU3IDMuNjI3YzEuMzYzLTQuMzY4IDIuMTgzLTguNjEgMi40Ni0xMi43MUg0OS4xOXMtLjAyNy03LjM4LTIuMzcyLTcuMzh6bTEyOC43NTItLjUwMmM2LjUxLTguMDEzIDE0LjA1NC0xOC4zMDIgMTQuMDU0LTE4LjMwMnMtNS44MjctNC42MjUtOC41NTYtMS4yN2MtMS44NzQgMi41NDgtMTEuNTEgMTUuMDYzLTExLjUxIDE1LjA2M2w2LjAxMiA0LjUxem0tNDYuOTAzLTE4LjQ2MmMtMi44MTQtMi41NzctOC4wOTYuNjY3LTguMDk2LjY2N3MxMi4zNSAxNy4yIDEyLjg1IDE3Ljk1M2w2LjA4LTQuMjlzLTguMDItMTEuNzUyLTEwLjgzLTE0LjMzek0xOTkuOTkgNDYuNWMtNi4xOCAwLTQwLjkwOC4yOTItNDAuOTUzLjI5MnYtMzEuNTZjMS41MDMgMCAzLjg4Mi0uMTI0IDcuMTQtLjM3NiAxMi43NzMtLjc1MyAyMS45MTQtMS4yNSAyNy40MjctMS41MDQgMCAwIDMuODE3LTguNDk2LS4xODUtMTAuNDUtLjk2LS4zNy03LjI0IDEuNDMtNy4yNCAxLjQzcy01MS42MyA1LjE1My03Mi42MSA1LjY0Yy41IDIuNzU2IDIuMzggNS4zMzYgNC45MyA2LjExIDQuMTYgMS4wODcgNy4wOS41MyAxNS4zNi4yNzcgNy43Ni0uNSAxMy42NS0uNzYgMTcuNjYtLjc2djMxLjE5aC00MS43MXMuODggNi45NyA3Ljk3IDcuMTRoMzMuNzN2MjIuMTZjMCA0LjM2NC0zLjQ5OCA2Ljg3LTcuNjUgNi42LTQuNC4wMzQtOC4xNS0uMzYtMTMuMDI3LS41NjYuNjIzIDEuMjQgMS45NzcgNC40OTYgNi4wMzUgNi44MjQgMy4wODcgMS41MDIgNS4wNTQgMi4wNTMgOC4xMyAyLjA1MyA5LjIzNyAwIDE0LjI3LTUuNCAxNC4wMjctMTQuMTZWNTMuOTNoMzguMjM1YzMuMDI2IDAgMi43Mi03LjQzMiAyLjcyLTcuNDMyeiIvPjwvc3ZnPg==&logoWidth=32)](https://api.spencerwoo.com/substats/?source=zhihu&queryKey=spencer-woo-64)

```http
GET /?source=zhihu&queryKey={QUERY}
```

- **Source shorthand:** `zhihu`
- **Query key:** 知乎 `url_token` - the username after `zhihu.com/people/` in your 知乎 user profile URL. For instance: a valid `url_token` is the `spencer-woo-64` part in the user profile URL `https://www.zhihu.com/people/spencer-woo-64`.
