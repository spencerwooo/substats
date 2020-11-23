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

[![Spencer's Blog - Feedly RSS subscribers](https://img.shields.io/badge/dynamic/json?label=Feedly%20RSS&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dfeedly%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&labelColor=2bb24c&logoColor=white&color=282c34&logo=feedly&suffix=%20subscribers&longCache=true)](https://api.spencerwoo.com/substats/?source=feedly&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=feedly&queryKey={QUERY}
```

- **Source shorthand:** `feedly`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

### Inoreader

:::tip 🌋 Limitations
Due to Inoreader API limitations, if your feed's total subscribers is larger than 1000, for instance: 6k subs, the Inoreader API will only return `6k`. **In order to compensate for this issue, our API will return the number `6000`.**
:::

[![Spencer's Blog - Inoreader RSS subscribers](https://img.shields.io/badge/dynamic/json?label=Inoreader%20RSS&suffix=%20subscribers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dinoreader%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=282c34&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM2IDBjMTkuODgyIDAgMzYgMTYuMTE4IDM2IDM2UzU1Ljg4MiA3MiAzNiA3MiAwIDU1Ljg4MiAwIDM2IDE2LjExOCAwIDM2IDB6bS03Ljk5IDMwLjk4QzIwLjgyNSAzMC45OCAxNSAzNi44MDQgMTUgNDMuOTkgMTUgNTEuMTc1IDIwLjgyNSA1NyAyOC4wMSA1N2M3LjE4MyAwIDEzLjAwOS01LjgyNSAxMy4wMDktMTMuMDExIDAtNy4xODUtNS44MjYtMTMuMDA5LTEzLjAwOS0xMy4wMDl6bTMuNjcgNS41NjVhMy43MjcgMy43MjcgMCAxMS0uMDA1IDcuNDU0IDMuNzI3IDMuNzI3IDAgMDEuMDA0LTcuNDU0em0tMy42Ny0xNC43NTh2NC42ODdjOS42NTYgMCAxNy41MTYgNy44NTggMTcuNTE2IDE3LjUxNWg0LjY4OWMwLTEyLjI0Mi05Ljk2MS0yMi4yMDItMjIuMjA1LTIyLjIwMnptMC05Ljc4N3Y0LjY4N2M3LjI5MiAwIDE0LjE0OCAyLjg0IDE5LjMwNiA3Ljk5OCA1LjE1OCA1LjE1NyA3Ljk5NSAxMi4wMTQgNy45OTUgMTkuMzA0SDYwYzAtOC41NDQtMy4zMjgtMTYuNTc3LTkuMzctMjIuNjJDNDQuNTg1IDE1LjMyNiAzNi41NTQgMTIgMjguMDEgMTJ6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=&labelColor=007bc7&longCache=true)](https://api.spencerwoo.com/substats/?source=inoreader&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=inoreader&queryKey={QUERY}
```

- **Source shorthand:** `inoreader`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

### NewsBlur <Badge text="slow" type="warning" />

:::tip 🐢 Slow API
**Substat's NewsBlur route sometimes suffer from frequent latencies** because: ① NewsBlur API itself is not so fast and, ② the API requires authentication. So each time you send a request to Substat, **Substat need to log itself in first**. As my Cloudflare Worker account is a free account, **I don't have access to KV storage** and **Cloudflare Workers itself doesn't provide CRON jobs**, thus I cannot persist the token and have to request for it each time instead.
:::

[![Spencer's Blog - NewsBlur RSS subscribers](https://img.shields.io/badge/dynamic/json?label=NewsBlur%20RSS&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dnewsblur%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&color=de922e&logo=data:image/png;charset=utf-8;base64,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&suffix=%20subscribers&labelColor=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=newsblur&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=newsblur&queryKey={QUERY}
```

- **Source shorthand:** `newsblur`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

### Feeds Pub <Badge text="new" />

[![Spencer's Blog - Feeds Pub RSS subscribers](https://img.shields.io/badge/dynamic/json?label=Feeds%20Pub&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DfeedsPub%26queryKey%3Dhttps%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml&labelColor=282c34&color=61b04b&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iOTYiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iOTYiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI5NiIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249Ijk2IgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDgt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&suffix=%20subscribers&longCache=true)](https://api.spencerwoo.com/substats/?source=feedsPub&queryKey=https://blog.spencerwoo.com/posts/index.xml)

```http
GET /?source=feedsPub&queryKey={QUERY}
```

- **Source shorthand:** `feedsPub`
- **Query key:** the target RSS link, like `https://blog.spencerwoo.com/posts/index.xml` for example. If the feed is not found, 0 subscribers will be returned.

## Social media

### 即刻 / Jike APP <Badge text="new" />

:::tip 🚅 Note
**💛 Welcome back, Jike.** This API is capable of fetching your current number of followers, highlighted personal updates, and liked count inside Jike APP. All three API queryKeys are all your user `UUID` in Jike APP. For instance: a valid Jike user `UUID` is the `4DDA0425-FB41-4188-89E4-952CA15E3C5E` part in your Jike user profile URL `https://m.okjike.com/users/4DDA0425-FB41-4188-89E4-952CA15E3C5E`.
:::

#### Followers

[![即刻 APP 被关注数量 - SpencerWoo](https://img.shields.io/badge/dynamic/json?color=f7cf07&labelColor=282c34&label=%E5%8D%B3%E5%88%BB%20%E8%A2%AB%E5%85%B3%E6%B3%A8&query=data.subsInEachSource.jikeFollower&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DjikeFollower%26queryKey%3D4DDA0425-FB41-4188-89E4-952CA15E3C5E&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PgLfemYAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHPxM1opGIWliIBIlWKjFC0MYi4gvUIongq0kuLyGP4y5Bgq1gKyiINr4K/Qu0FawFQVEEsbKwVrTRcM4lQoKYWWbn29/uDLuzYAkmlZRe64ZUOqv5J33OhcUlp+2Feuy00EVrSNHV2cBEkKr2eU+NGW/7zVrVz/1rTZGorkBNg/CoompZ4SnhmbWsavKOcLuSCEWEz4T7NLmg8J2ph0v8anK8xN8ma0H/GFhahJ3xCg5XsJLQUsLyclypZE75vY/5Ens0PR+Q2C3eiY6fSXw4mWacMbwMMiKzl348DMiKKvnuYv4cGclVZFbJo7FKnARZ+kTNSfWoxJjoURlJ8mb///ZVjw15StXtPqh7Noz3HrBtQ2HLML6ODKNwDNYnuEyX8zOHMPwh+lZZcx2AYwPOr8paeBcuNqHjUQ1poaJkFbfEYvB2Cs2L0HYDjculnv3uc/IAwXX5qmvY24deOe9Y+QFEC2fWKEm0kwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdZJREFUOI2llLFrU1EUh7/zXmLSFpIsUrDgYiFbBsGhTsFR6qjimsVd+s90KYib4uxasDgILnXJowrWYHEQadLaoeSdn8NLX26S9zTogwv3Xn5897vnPK4B6GujiVkP7CmwiVnMMp+UAp9Au0h7dnM0tAlsH4s6QLQUaAGMIz8EdSPMev8JAxGhqIOsZxq0+pi1/xGUjXytxDRojf9as/o2VG8BcPrzFa34pASqtLJUA1YfwsoDAPaSuzxbf7xoByCLK8tdLc2Xv9LGrFkAlaAcGIbxfNvQdDnJKJgvAjUbntnLVaZ7mstVwlw5zALDAFJwaGWxsEXBad9KYTPAMjMBVoX4OgCXqZPKshqWiFSCes8W2+pQ68DqfajdBuDgW8qanU4hc83JDEvMFK9jG2+Y9JWTc+flkbPdfFd+5dww/JeuApfHnF8M+HJxg/ffnY8/xmzVX3Bv5Xmh2dXc9Lk1RhZr7iSAg7NHvD17wka1z9baazZrHzCp2A6QlJqOWn1h7SJ9YbjHxIwLG7BQJimJsscRR0y7l+srg4WAuUwwHLRrShpNl+0bUSd718rr8wc7d/mhS93I2qNhZOoi35ErkSvFA5PQaM5OrlSuRPiOS91rd0bD31iIPlmy3nObAAAAAElFTkSuQmCC&longCache=true)](https://api.spencerwoo.com/substats/?source=jikeFollower&queryKey=4DDA0425-FB41-4188-89E4-952CA15E3C5E)

```http
GET /?source=jikeFollower&queryKey={QUERY}
```

- **Source shorthand:** `jikeFollower`

#### Highlighted personal updates

[![即刻 APP 精选数量 - SpencerWoo](https://img.shields.io/badge/dynamic/json?color=f7cf07&labelColor=282c34&label=%E5%8D%B3%E5%88%BB%20%E7%B2%BE%E9%80%89&query=data.subsInEachSource.jikeHighlights&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DjikeHighlights%26queryKey%3D4DDA0425-FB41-4188-89E4-952CA15E3C5E&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PgLfemYAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHPxM1opGIWliIBIlWKjFC0MYi4gvUIongq0kuLyGP4y5Bgq1gKyiINr4K/Qu0FawFQVEEsbKwVrTRcM4lQoKYWWbn29/uDLuzYAkmlZRe64ZUOqv5J33OhcUlp+2Feuy00EVrSNHV2cBEkKr2eU+NGW/7zVrVz/1rTZGorkBNg/CoompZ4SnhmbWsavKOcLuSCEWEz4T7NLmg8J2ph0v8anK8xN8ma0H/GFhahJ3xCg5XsJLQUsLyclypZE75vY/5Ens0PR+Q2C3eiY6fSXw4mWacMbwMMiKzl348DMiKKvnuYv4cGclVZFbJo7FKnARZ+kTNSfWoxJjoURlJ8mb///ZVjw15StXtPqh7Noz3HrBtQ2HLML6ODKNwDNYnuEyX8zOHMPwh+lZZcx2AYwPOr8paeBcuNqHjUQ1poaJkFbfEYvB2Cs2L0HYDjculnv3uc/IAwXX5qmvY24deOe9Y+QFEC2fWKEm0kwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdZJREFUOI2llLFrU1EUh7/zXmLSFpIsUrDgYiFbBsGhTsFR6qjimsVd+s90KYib4uxasDgILnXJowrWYHEQadLaoeSdn8NLX26S9zTogwv3Xn5897vnPK4B6GujiVkP7CmwiVnMMp+UAp9Au0h7dnM0tAlsH4s6QLQUaAGMIz8EdSPMev8JAxGhqIOsZxq0+pi1/xGUjXytxDRojf9as/o2VG8BcPrzFa34pASqtLJUA1YfwsoDAPaSuzxbf7xoByCLK8tdLc2Xv9LGrFkAlaAcGIbxfNvQdDnJKJgvAjUbntnLVaZ7mstVwlw5zALDAFJwaGWxsEXBad9KYTPAMjMBVoX4OgCXqZPKshqWiFSCes8W2+pQ68DqfajdBuDgW8qanU4hc83JDEvMFK9jG2+Y9JWTc+flkbPdfFd+5dww/JeuApfHnF8M+HJxg/ffnY8/xmzVX3Bv5Xmh2dXc9Lk1RhZr7iSAg7NHvD17wka1z9baazZrHzCp2A6QlJqOWn1h7SJ9YbjHxIwLG7BQJimJsscRR0y7l+srg4WAuUwwHLRrShpNl+0bUSd718rr8wc7d/mhS93I2qNhZOoi35ErkSvFA5PQaM5OrlSuRPiOS91rd0bD31iIPlmy3nObAAAAAElFTkSuQmCC&longCache=true)](https://api.spencerwoo.com/substats/?source=jikeHighlights&queryKey=4DDA0425-FB41-4188-89E4-952CA15E3C5E)

```http
GET /?source=jikeHighlights&queryKey={QUERY}
```

- **Source shorthand:** `jikeHighlights`

#### Liked count

[![即刻 APP 获得点赞数量 - SpencerWoo](https://img.shields.io/badge/dynamic/json?color=f7cf07&labelColor=282c34&label=%E5%8D%B3%E5%88%BB%20%E8%8E%B7%E8%B5%9E&query=data.subsInEachSource.jikeLiked&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DjikeLiked%26queryKey%3D4DDA0425-FB41-4188-89E4-952CA15E3C5E&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PgLfemYAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHPxM1opGIWliIBIlWKjFC0MYi4gvUIongq0kuLyGP4y5Bgq1gKyiINr4K/Qu0FawFQVEEsbKwVrTRcM4lQoKYWWbn29/uDLuzYAkmlZRe64ZUOqv5J33OhcUlp+2Feuy00EVrSNHV2cBEkKr2eU+NGW/7zVrVz/1rTZGorkBNg/CoompZ4SnhmbWsavKOcLuSCEWEz4T7NLmg8J2ph0v8anK8xN8ma0H/GFhahJ3xCg5XsJLQUsLyclypZE75vY/5Ens0PR+Q2C3eiY6fSXw4mWacMbwMMiKzl348DMiKKvnuYv4cGclVZFbJo7FKnARZ+kTNSfWoxJjoURlJ8mb///ZVjw15StXtPqh7Noz3HrBtQ2HLML6ODKNwDNYnuEyX8zOHMPwh+lZZcx2AYwPOr8paeBcuNqHjUQ1poaJkFbfEYvB2Cs2L0HYDjculnv3uc/IAwXX5qmvY24deOe9Y+QFEC2fWKEm0kwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdZJREFUOI2llLFrU1EUh7/zXmLSFpIsUrDgYiFbBsGhTsFR6qjimsVd+s90KYib4uxasDgILnXJowrWYHEQadLaoeSdn8NLX26S9zTogwv3Xn5897vnPK4B6GujiVkP7CmwiVnMMp+UAp9Au0h7dnM0tAlsH4s6QLQUaAGMIz8EdSPMev8JAxGhqIOsZxq0+pi1/xGUjXytxDRojf9as/o2VG8BcPrzFa34pASqtLJUA1YfwsoDAPaSuzxbf7xoByCLK8tdLc2Xv9LGrFkAlaAcGIbxfNvQdDnJKJgvAjUbntnLVaZ7mstVwlw5zALDAFJwaGWxsEXBad9KYTPAMjMBVoX4OgCXqZPKshqWiFSCes8W2+pQ68DqfajdBuDgW8qanU4hc83JDEvMFK9jG2+Y9JWTc+flkbPdfFd+5dww/JeuApfHnF8M+HJxg/ffnY8/xmzVX3Bv5Xmh2dXc9Lk1RhZr7iSAg7NHvD17wka1z9baazZrHzCp2A6QlJqOWn1h7SJ9YbjHxIwLG7BQJimJsscRR0y7l+srg4WAuUwwHLRrShpNl+0bUSd718rr8wc7d/mhS93I2qNhZOoi35ErkSvFA5PQaM5OrlSuRPiOS91rd0bD31iIPlmy3nObAAAAAElFTkSuQmCC)](https://api.spencerwoo.com/substats/?source=jikeLiked&queryKey=4DDA0425-FB41-4188-89E4-952CA15E3C5E)

```http
GET /?source=jikeLiked&queryKey={QUERY}
```

- **Source shorthand:** `jikeLiked`

### Bilibili

[![Bilibili CEO - 陈睿](https://img.shields.io/badge/dynamic/json?labelColor=FE7398&label=bilibili%20fans&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D208259&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc/pXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx+bCQD8/S9tmgVqeDr1lLigDgZvDhXso+K9TyTBQRwRJ8AHjntl0Flh5QRAQK/mKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR/RwkRKPizBN8CgEcuESj4Lwm+BwBjahEk+H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l+72BSs8d7w8U+JDAnZERQMcV+CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T+5aVk6+2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I/wcSbXU5jQBUkRtdf4Rar90v8kSv3+I3ffCCSpk8I/w+lgDkdI/v2rEp2CaiWm1AsDQLlDAD+dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3/BBMHEyBmDXlFfA8IzeHb+Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC/A8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu/ZaEcCUxFvgz2zO+BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U/H50Pq4JNP7Qiw8UFnJwcK+tXy+Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC+OIx5TDqo5nDT+F/SS/9CYzwb+No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd+I0HPXslLKnT0N+wnkrTKi9JZL/L9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td/Tvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC/osSYvjRQz4cJ6n7KO3rYQL7M+L6nVtfDVRAEQRAEQRAEQRAEIZ5/SAXmdfXaoQsAAAAASUVORK5CYII=&color=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=bilibili&queryKey=208259)

```http
GET /?source=bilibili&queryKey={QUERY}
```

- **Source shorthand:** `bilibili`
- **Query key:** Bilibili UID - the UID after `space.bilibili.com/` in your Bilibili user profile URL. For instance: a valid Bilibili UID is the `208259` part in the user profile URL `https://space.bilibili.com/208259`.

### 酷安

[![酷安 - fairyex](https://img.shields.io/badge/dynamic/json?labelColor=11ab60&color=282c34&label=酷安%20Coolapk&suffix=%20fans&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dcoolapk%26queryKey%3D466253&logo=data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik0xMjcuODkzIDQyNi42NjdjMjkuOTItNjYuOTg3IDk0LjUwNy0xMTYuNjk0IDE2Ni40LTEzMC4zNDcgNTUuNzg3LTkuNiAxMTIuOTYgNS4wNjcgMTYxLjkyIDMxLjk0N0M0OTcuNzYgMzQ5LjQ0IDUzNC40IDM3OC44OCA1NjcuOTQ3IDQxMS4wNGMtMTYuMTYgMTguNC0zOS4wOTQgMjguODUzLTU3LjQ5NCA0NC43NDctNDYuMTMzLTM4Ljg4LTk2LjY0LTc3LjcwNy0xNTcuOTczLTg3LjA5NC03OC45MzMtMTMuMTczLTE1OC41NiA0OS4yMjctMTcwLjUwNyAxMjcuMTQ3LTguNjkzIDQ1LjkyIDEwLjEzNCA5NC42NjcgNDUuMTc0IDEyNC45MDcgMzkuNjggMzQuOTg2IDk3LjIyNiA0NC41ODYgMTQ3LjYyNiAzMS4yNTMgNTcuNi0xMy45MiAxMDEuOTc0LTU3LjA2NyAxMzYuODU0LTEwMi43NzMgNTQuMDgtNzIuMTA3IDk5LjItMTUwLjQgMTQ3Ljg0LTIyNi4xMzQgMTMuOTItMTkuMTQ2IDQ3LjQxMy0xNy4yMjYgNTguNzIgMy44NCA2My42MjYgMTA5LjAxNCAxMjYuMDggMjE4LjcyIDE4OS42IDMyNy43ODcgNy41NzMgMTUuMDkzIDQuNDI2IDM1Ljc4Ny05LjYgNDYuMTMzLTEzLjA2NyAxMC42MTQtMzMuMzM0IDEwLjI0LTQ2LjEzNC0uNjkzYTk3MDY2LjU1OCA5NzA2Ni41NTggMCAwMS0yMjYuMTg2LTE2Mi43MmMxOC44OC0xNS4wNCAzOC40LTI5LjMzMyA1Ny45NzMtNDMuNDY3IDIzLjczMyAxMi45MDcgNDMuNzg3IDMzLjE3NCA2OS42IDQxLjY1NC0yMC4zNzMtMzkuNTc0LTQzLjYyNy03Ny43MDctNjYuMzQ3LTExNS45NDctNDIuNjY2IDU5LjE0Ny03Ny4wNjYgMTI0LjIxMy0xMjMuMTQ2IDE4MS4wNjdDNTE2IDY2My40NjcgNDQ4LjggNzE2Ljk2IDM2OC42NCA3MjguNDhjLTM4Ljg4IDMuNDEzLTc5LjMwNyA0LjIxMy0xMTYuMzczLTkuOTczLTUzLjQ5NC0xOS4xNDctMTAwLjMyLTU4LjcyLTEyNC41ODctMTEwLjU2LTI4LjIxMy01Ni4xMDctMjYuNzczLTEyNS4wMTQuMjEzLTE4MS4yOHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=&longCache=true)](https://api.spencerwoo.com/substats/?source=coolapk&queryKey=466253)

```http
GET /?source=coolapk&queryKey={QUERY}
```

- **Source shorthand:** `coolapk`
- **Query key:** Coolapk UID - the UID after `coolapk.com/u/` in your Coolapk user profile URL. For instance: a valid Coolapk UID is the `466253` part in the user profile URL `http://www.coolapk.com/u/466253`.

:::tip 🥦 Note
You can get your Coolapk's `uid` by **sharing your user profile page inside Coolapk's Android APP** (I believe Coolapk didn't implement this feature on iOS yet.). **Choose: "share » copy link", the link is what we need, i.e, your user profile URL.**
:::

### Instagram

[![Instagram - spencer_wooo](https://img.shields.io/badge/dynamic/json?labelColor=d7417b&label=Instagram&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dinstagram%26queryKey%3Dspencer_wooo&suffix=%20followers&logo=instagram&logoColor=white&color=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=instagram&queryKey=spencer_wooo)

```http
GET /?source=instagram&queryKey={QUERY}
```

- **Source shorthand:** `instagram`
- **Query key:** Instagram username - the username after `instagram.com/` in your Instagram user profile URL. For instance: a valid Instagram username is the `spencer_wooo` part in the user profile URL `https://www.instagram.com/spencer_wooo`.

### Telegram

:::tip 🪐 Note
This API is capable of getting both **Telegram Channel subscribers** and **Telegram Group Chat members** if you provide the valid `chat_id` for each service.
:::

[![@realSpencerWoo - Telegram Channel](https://img.shields.io/badge/dynamic/json?label=@realSpencerWoo&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtelegram%26queryKey%3DrealSpencerWoo&logo=telegram&color=2CA5E0&labelColor=282c34&suffix=%20members&longCache=true)](https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo)

```http
GET /?source=telegram&queryKey={QUERY}
```

- **Source shorthand:** `telegram`
- **Query key:** Telegram chat/channel `chat_id` - the `chat_id` after `t.me/` in your Telegram chat/channel URL. For instance: a valid Telegram chat/channel `chat_id` is the `realSpencerWoo` part in the chat/channel URL `https://t.me/realSpencerWoo`.

### Twitter

[![Twitter - @realSpencerWoo](https://img.shields.io/badge/dynamic/json?label=Twitter&labelColor=282c34&suffix=%20followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dtwitter%26queryKey%3DrealSpencerWoo&color=1da1f2&logo=twitter&longCache=true)](https://api.spencerwoo.com/substats/?source=twitter&queryKey=realSpencerWoo)

```http
GET /?source=twitter&queryKey={QUERY}
```

- **Source shorthand:** `twitter`
- **Query key:** Twitter username - the username after `twitter.com/` in your Twitter user profile URL. For instance: a valid Twitter username is the `realSpencerWoo` part in the user profile URL `https://twitter.com/realSpencerWoo`.

### 微博

[![微博 - @TenkeySeven](https://img.shields.io/badge/dynamic/json?label=%E5%BE%AE%E5%8D%9A%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dweibo%26queryKey%3D2867502440&labelColor=e71f19&color=040000&logo=sina-weibo&longCache=true)](https://api.spencerwoo.com/substats/?source=weibo&queryKey=2867502440)

```http
GET /?source=weibo&queryKey={QUERY}
```

- **Source shorthand:** `weibo`
- **Query key:** Weibo `uid` - the user ID after `weibo.com/u/` in your Weibo user profile URL. For instance: a valid Weibo `uid` is the `2867502440` part in the user profile URL `https://weibo.com/u/2867502440`.

:::tip 🚥 Note
For users who have custom `uid`s for your Weibo account, you can find your `uid` using this method: [什么是微博 uid？怎么查看微博 uid？](http://blog.sina.com.cn/s/blog_9a773e3601010zz9.html)
:::

## Developers

### GitHub

[![GitHub - @spencerwooo](https://img.shields.io/badge/dynamic/json?label=GitHub%20Followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dgithub%26queryKey%3Dspencerwooo&labelColor=282c34&color=181717&logo=github&longCache=true)](https://api.spencerwoo.com/substats/?source=github&queryKey=spencerwooo)

```http
GET /?source=github&queryKey={QUERY}
```

- **Source shorthand:** `github`
- **Query key:** GitHub `user_login` (username) - the username after `github.com/` in your user profile URL. For instance: a valid `user_login` is the `spencerwooo` part in the user profile page URL `https://github.com/spencerwooo`.

## Music

### 网易云音乐

[![Netease Music - EdSheeran](https://img.shields.io/badge/dynamic/json?label=%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E7%B2%89%E4%B8%9D&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DneteaseMusic%26queryKey%3D416608258&color=282c34&labelColor=e72d2c&logo=data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik02MjcuMDg2IDUuMTE1YzI4LjEzMi03LjY3MiA1OC44MjItNy42NzIgODYuOTUzIDAgMzMuMjQ3IDcuNjcyIDYzLjkzNyAyMy4wMTcgODkuNTEyIDQzLjQ3NyAxMC4yMyA3LjY3MyAxNy45MDIgMTUuMzQ0IDIzLjAxNyAyOC4xMzEgNy42NzIgMTcuOTAzIDUuMTE0IDM4LjM2My01LjExNSA1My43MDgtNy42NzIgMTIuNzg3LTIzLjAxNyAyMy4wMTctNDAuOTIgMjUuNTc0LTEyLjc4NyAyLjU1OC0yNS41NzQgMC0zOC4zNjItNy42NzItNS4xMTUtMi41NTgtMTAuMjMtMTAuMjMtMTcuOTAyLTEyLjc4Ny0xNy45MDItMTAuMjMtMzUuODA0LTIwLjQ2LTU2LjI2NC0xNy45MDMtMTUuMzQ1IDAtMjguMTMyIDcuNjczLTM1LjgwNCAxNy45MDMtMTAuMjMgMTAuMjMtMTIuNzg4IDIzLjAxNy0xMC4yMyAzNS44MDQgNy42NzIgMjUuNTc0IDEyLjc4NyA1My43MDYgMjAuNDYgNzkuMjgxIDUxLjE1IDIuNTU4IDk5Ljc0IDE1LjM0NSAxNDMuMjE4IDQwLjkyIDQwLjkyIDI1LjU3NSA3OS4yOCA1OC44MjEgMTA5Ljk3IDk3LjE4MyAyNS41NzUgMzMuMjQ3IDQ2LjAzNSA3MS42MSA1Ni4yNjUgMTEyLjUzIDEyLjc4NiA0My40NzYgMTcuOTAxIDg5LjUxIDEyLjc4NiAxMzIuOTg2LTIuNTU3IDM4LjM2My0xMC4yMyA3NC4xNjYtMjMuMDE2IDEwOS45NzEtMzMuMjQ3IDg0LjM5Ni05Mi4wNyAxNjEuMTItMTcxLjM1IDIwOS43MTMtNTYuMjY1IDM1LjgwMy0xMjIuNzYgNTguODIxLTE4OS4yNTMgNjYuNDkzLTQ2LjAzNCA1LjExNS05Mi4wNjkgNS4xMTUtMTM4LjEwMi0yLjU1Ny05NC42MjctMTUuMzQ1LTE4MS41OC02MS4zOC0yNTAuNjMxLTEzMC40MzEtNjYuNDk1LTY2LjQ5My0xMTIuNTMtMTUzLjQ0OC0xMzIuOTktMjQ1LjUxNi03LjY3MS02OS4wNTItNy42NzEtMTM4LjEwMyA3LjY3My0yMDcuMTU0IDE3LjkwMy04MS44NCA2MS4zOC0xNjEuMTIgMTE3LjY0NC0yMjIuNSA0OC41OTItNTEuMTUgMTA3LjQxNC04OS41MTEgMTcxLjM1LTExNy42NDMgNy42NzItMi41NTggMTIuNzg3LTUuMTE1IDIwLjQ2LTcuNjczIDE1LjM0NC0yLjU1NyAzMC42OSAwIDQzLjQ3NyAxMC4yMyAxNy45MDIgMTIuNzg4IDI1LjU3NCAzMy4yNDggMjMuMDE3IDUzLjcwNy0yLjU1NyAyMC40Ni0xNy45MDIgMzguMzYzLTM1LjgwNSA0Ni4wMzQtNjMuOTM3IDI1LjU3NS0xMjIuNzU4IDY5LjA1Mi0xNjMuNjc4IDEyMi43Ni0zOC4zNjIgNTMuNzA1LTYzLjkzNiAxMTIuNTI3LTcxLjYwOCAxNzMuOTA2LTcuNjcyIDYxLjM4IDAgMTIyLjc1OCAyMC40NiAxODEuNTggMzAuNjkgODQuMzk2IDk0LjYyNiAxNTYuMDA0IDE3My45MDcgMTk2LjkyNCA0OC41OTIgMjUuNTc1IDEwMi4yOTggMzguMzYyIDE1Ni4wMDUgMzguMzYyIDQzLjQ3NyAwIDg5LjUxMS03LjY3MiAxMzAuNDMtMjMuMDE3IDM1LjgwNS0xMi43ODcgNzEuNjEtMzMuMjQ3IDk5Ljc0MS01OC44MjIgMjguMTMzLTIzLjAxNiA1MS4xNS01My43MDYgNjYuNDk1LTg0LjM5NiA3LjY3Mi0xNS4zNDUgMTcuOTAxLTMzLjI0NyAyMC40Ni01MS4xNSAxNS4zNDQtNTEuMTQ5IDE3LjkwMS0xMDcuNDEzIDIuNTU2LTE1OC41NjEtMTIuNzg2LTQzLjQ3OC0zOC4zNjEtODEuODQtNzEuNjA5LTEwOS45NzEtMTUuMzQ0LTEyLjc4Ny0zMC42OS0yNS41NzUtNDguNTkyLTM1LjgwNS0xNS4zNDQtNy42NzItMzAuNjktMTUuMzQ1LTQ4LjU5MS0xNy45MDIgMTIuNzg4IDQ2LjAzNCAyMy4wMTggOTIuMDcgMzUuODA0IDEzNS41NDUgMi41NTggMTAuMjMgNS4xMTUgMjMuMDE4IDUuMTE1IDMzLjI0OCAyLjU1OCA0Ni4wMzMtMTUuMzQ0IDk0LjYyNS00Ni4wMzQgMTMwLjQzLTI4LjEzMiAzMy4yNDYtNjkuMDUyIDU4LjgyMS0xMTIuNTI4IDY2LjQ5NC00Ni4wMzQgMTAuMjMtOTcuMTg0IDAtMTM4LjEwMy0yNS41NzUtMzguMzYyLTI1LjU3NC02Ni40OTQtNjMuOTM2LTgxLjg0LTEwNC44NTYtNy42NzItMjMuMDE3LTEyLjc4Ny00OC41OTEtMTIuNzg3LTc0LjE2Ni0yLjU1Ni01Ni4yNjQgMTIuNzg4LTEwOS45NzEgNDMuNDc4LTE1Ni4wMDUgMzUuODA0LTUzLjcwNyA5NC42MjUtOTIuMDcgMTU4LjU2Mi0xMDkuOTcxLTUuMTE1LTE3LjkwMi0xMC4yMy0zNS44MDUtMTIuNzg3LTUzLjcwNy0xMi43ODctMzguMzYxLTEwLjIzLTgxLjgzOSA3LjY3Mi0xMTUuMDg2IDEwLjIzLTIwLjQ2IDIzLjAxOC0zOC4zNjEgNDAuOTItNTEuMTUgMjMuMDE2LTIwLjQ2IDQzLjQ3Ni0zMy4yNDYgNjYuNDk0LTQwLjkxOE00NzguNzUzIDQxOS40MjRjLTE3LjkwMyAxNy45MDItMjguMTMzIDQwLjkyLTMzLjI0NyA2My45MzYtNS4xMTQgMjAuNDYtNS4xMTQgNDMuNDc3IDAgNjYuNDk1IDUuMTE0IDIzLjAxNiAxNy45MDIgNDYuMDMzIDM4LjM2MiA2MS4zOCAxNS4zNDUgMTAuMjI4IDM1LjgwNCAxNS4zNDMgNTYuMjY0IDEwLjIyOCAzNS44MDQtNS4xMTUgNjMuOTM2LTM4LjM2MiA2My45MzYtNzQuMTY2LTIuNTU3LTcuNjcyLTIuNTU3LTE3LjkwMi01LjExNS0yNS41NzUtMTIuNzg3LTQ4LjU5Mi0yNS41NzMtOTkuNzQxLTM4LjM2MS0xNDguMzMzLTMwLjY5IDcuNjczLTU4LjgyMiAyMy4wMTgtODEuODQgNDYuMDM1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==&longCache=true)](https://api.spencerwoo.com/substats/?source=neteaseMusic&queryKey=416608258)

```http
GET /?source=neteaseMusic&queryKey={QUERY}
```

- **Source shorthand:** `neteaseMusic`
- **Query key:** Netease Music `uid` - the `uid` after `/home?id=` in your Netease Music user profile URL. For instance: a valid `uid` is the `416608258` part in the user profile URL `https://music.163.com/#/user/home?id=416608258`.

## Games

### Steam

**The Substats' API** for Steam accepts requests for your total number of games in your Steam library: `steamGames`, and the number of your friends: `steamFriends`. **Both API's queryKey is your 16-digit unique steam ID.**

:::tip 🌎 Note
**Your steam ID is not your Steam user name!** You'll need to look up your steam ID here using either your Steam username or your profile URL first: [Steam ID Finder](https://steamidfinder.com/), and get the specific `steamID64` to pass on to Substats for further requests. For instance: `76561198336249957`.
:::

#### Owned Games on Steam

[![Games - Firebear.LLC](https://img.shields.io/badge/dynamic/json?label=Steam&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DsteamGames%26queryKey%3D76561198336249957&suffix=%20Games&logo=steam&labelColor=134375&color=0b1a37&longCache=true)](https://api.spencerwoo.com/substats/?source=steamGames&queryKey=76561198336249957)

```http
GET /?source=steamGames&queryKey={QUERY}
```

- **Source shorthand:** `steamGames`

#### Friends on Steam

[![Friends - Firebear.LLC](https://img.shields.io/badge/dynamic/json?label=Steam%20Friends&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DsteamFriends%26queryKey%3D76561198336249957&logo=steam&color=0b1a37&labelColor=134375&longCache=true)](https://api.spencerwoo.com/substats/?source=steamFriends&queryKey=76561198336249957)

```http
GET /?source=steamFriends&queryKey={QUERY}
```

- **Source shorthand:** `steamFriends`

## Photography

### Unsplash

[![Unsplash - @yiukuenchu](https://img.shields.io/badge/dynamic/json?color=282c34&labelColor=000000&label=Unsplash&suffix=%20followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dunsplash%26queryKey%3Dyiukuenchu&logo=unsplash&longCache=true)](https://api.spencerwoo.com/substats/?source=unsplash&queryKey=yiukuenchu)

```http
GET /?source=unsplash&queryKey={QUERY}
```

- **Source shorthand:** `unsplash`
- **Query key:** Unsplash `username` - the username after `unsplash.com/@` in your Unsplash user profile URL. For instance: a valid `username` is the `yiukuenchu` part in the user profile URL `https://unsplash.com/@yiukuenchu`.

## Websites

### Wikipedia (zh) <Badge text="new" />

[![Wikipedia (zh) - Scvoet](https://img.shields.io/badge/dynamic/json?logo=wikipedia&color=282c34&labelColor=000000&label=%e7%bb%b4%e5%9f%ba%e7%99%be%e7%a7%91&query=%24.data.totalSubs&url=https%3a%2f%2fapi.spencerwoo.com%2fsubstats%2f%3fsource%3dwikipediaZh%26queryKey%3dscvoet%26longCache%3dtrue)](https://api.spencerwoo.com/substats/?source=wikipediaZh&queryKey=scvoet&longCache=true)

```http
GET /?source=wikipediaZh&queryKey={QUERY}
```

- **Source shorthand:** `wikipediaZh`
- **Query key:** Wikipedia (zh) `username` - the username after `zh.wikipedia.org/wiki/User:` in your Wikipedia-zh user page URL. For instance: a valid `username` is the `scvoet` part in the user page URL `https://zh.wikipedia.org/wiki/User:scvoet`.

> Tip: `username` ignores initial case.

### 爱发电

**The Substats' API** for 爱发电 accepts both requests for your fans in 爱发电: `afdianFans`, and the total income each month in 爱发电: `afdianIncome`. **Both API's queryKey is your 爱发电's `slug`.** For instance: a valid `slug` is the `spencerwoo` part in the user profile URL `https://afdian.net/@spencerwoo`.

#### 发电人次

[![爱发电发电人次 - SpencerWoo](https://img.shields.io/badge/dynamic/json?label=%E7%88%B1%E5%8F%91%E7%94%B5&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DafdianFans%26queryKey%3Dspencerwoo&suffix=%20%E5%8F%91%E7%94%B5%E4%BA%BA%E6%AC%A1%20%2F%20%E6%9C%88&labelColor=946ce6&color=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=afdianFans&queryKey=spencerwoo)

```http
GET /?source=afdianFans&queryKey={QUERY}
```

- **Source shorthand:** `afdianFans`

#### 每月收入

:::tip ⚡ Note
The 爱发电 Income API returns a `String`, not a `Number`, so we won't accept multiple chaining requests when requesting `afdianIncome`. Requests like: `/?source=afdianFans|afdianIncome&queryKey=xx` and `/?source=afdianFans&queryKey=xx&source=afdianIncome&queryKey=xxx` will be considered as invalid.
:::

[![爱发电每月收入 - SpencerWoo](https://img.shields.io/badge/dynamic/json?label=%E7%88%B1%E5%8F%91%E7%94%B5%E6%94%B6%E5%85%A5&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DafdianIncome%26queryKey%3Dspencerwoo&prefix=%EF%BF%A5%20&suffix=%20%E6%AF%8F%E6%9C%88&labelColor=946ce6&color=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=afdianIncome&queryKey=spencerwoo)

```http
GET /?source=afdianIncome&queryKey={QUERY}
```

- **Source shorthand:** `afdianIncome`

### Medium

[![Medium - SpencerWoo](https://img.shields.io/badge/dynamic/json?label=Medium&suffix=%20followers&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dmedium%26queryKey%3D%40SpencerWooo&logo=medium&color=12100E&labelColor=03a87c&longCache=true)](https://api.spencerwoo.com/substats/?source=medium&queryKey=@SpencerWooo)

```http
GET /?source=medium&queryKey={QUERY}
```

- **Source shorthand:** `medium`
- **Query key:** Medium `username` - the username after `medium.com/` in your Medium user profile URL. For instance: a valid `username` is the `@SpencerWooo` part in the user profile URL `https://medium.com/@SpencerWooo`.

### Reddit

:::tip 🛹 Note
This API fetches the user's **Reddit Karma: the scoreboard of Reddit.** Further reading: [What is Reddit karma, and how do people benefit from having more of it?](https://www.quora.com/What-is-Reddit-karma-and-how-do-people-benefit-from-having-more-of-it)
:::

[![Reddit - u/Acidtwist](https://img.shields.io/badge/dynamic/json?label=Reddit%20Karma&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dreddit%26queryKey%3DAcidtwist&logo=reddit&color=282c34&logoColor=white&labelColor=FF4500&longCache=true)](https://api.spencerwoo.com/substats/?source=reddit&queryKey=Acidtwist)

```http
GET /?source=reddit&queryKey={QUERY}
```

- **Source shorthand:** `reddit`
- **Query key:** Reddit `username` - the username after `reddit.com/user/` in your Reddit user profile URL. For instance: a valid `username` is the `Acidtwist` part in the user profile URL `https://www.reddit.com/user/Acidtwist`.

### 少数派

[![少数派 - SpencerWoo](https://img.shields.io/badge/dynamic/json?label=%E5%B0%91%E6%95%B0%E6%B4%BE%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dsspai%26queryKey%3Dspencerwoo&color=d71a1b&logo=data:image/png;base64,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&labelColor=282c34&longCache=true)](https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo)

```http
GET /?source=sspai&queryKey={QUERY}
```

- **Source shorthand:** `sspai`
- **Query key:** 少数派 `user_slug` - the slug between `sspai.com/` and `posts` in your 少数派 user profile URL. For instance: a valid `user_slug` is the `spencerwoo` part in the user profile URL `https://sspai.com/u/spencerwoo/posts`.

### 知乎

[![知乎 - 纽太普](https://img.shields.io/badge/dynamic/json?color=282c34&labelColor=0084ff&label=%E7%9F%A5%E4%B9%8E%E5%85%B3%E6%B3%A8&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dzhihu%26queryKey%3Dneotype&longCache=true)](https://api.spencerwoo.com/substats/?source=zhihu&queryKey=neotype)

```http
GET /?source=zhihu&queryKey={QUERY}
```

- **Source shorthand:** `zhihu`
- **Query key:** 知乎 `url_token` - the username after `zhihu.com/people/` in your 知乎 user profile URL. For instance: a valid `url_token` is the `neotype` part in the user profile URL `https://www.zhihu.com/people/neotype`.
