---
sidebar: auto
---

# How to contribute

**Substats** is a serverless function deployed on Cloudflare Workers. You should use `wrangler` to build, debug and preview the project. More information: [Cloudflare Workers | Quick Start](https://developers.cloudflare.com/workers/quickstart).

## Setting up the project

:::tip 🚥 Note
You'll need global access to CLI tools installed by `yarn`, so you should add `yarn`'s global binary installation path to your `$PATH`.

```bash
yarn global bin
```

You can run the command directly to find the `/bin`'s path.
:::

Install `wrangler` globally:

```bash
yarn global add @cloudflare/wrangler
```

Install dependencies:

```bash
yarn
```

## Familiarizing the structure

The core API backend and the documentations share the same mono-repo. The structure of the project is shown below.

<!-- prettier-ignore-start -->
::: vue

.
📖 _Documentation section_
├── `docs`  _(Documentation, built with VuePress)_
│   └── ……
│
🚡 _API backend_
├── index.js _(API starting point)_
├── `utils` _(Utility scripts folder)_
│   ├── handlerImporter.js _(Imports all API handlers from below)_
│   🔑 _API handlers_
│   └── `handlers` _(API integration handlers folder)_
│       ├── feedly.js _(Feedly API integration)_
│       ├── github.js _(GitHub API integration)_
│       └── ……        _(You get the idea...)_
│
🚀 _Deployment_
└── wrangler.toml _(Cloudflare worker deployment config)_

:::
<!-- prettier-ignore-end -->

## Building, preview and debugging

Preview with [cloudflareworkers.com](https://cloudflareworkers.com):

```bash
yarn dev
```

Lint and automatically fix all fixable JavaScript files with `eslint`:

```bash
yarn lint
```

Prettify all JavaScript files with `prettier`:

```bash
yarn pretty
```

## Storing secrets and authenticating

If an API/Service requires authentication, you can store the required token/password/cookie etc., with Cloudflare Worker's secret, i.e., environment variables.

You can create a mock account for your desired service, and authenticate with this account. **I strongly discourage you using your personal account for this task.** After you implement an auth-required service, you can make a PR and [email me](mailto:spencerwoo98@gmail.com) the token/password/cookie etc., along with the name of the secret you used. For instance:

<!-- prettier-ignore-start -->
::: vue

<p style="margin-bottom: 0.01rem;">Please upload this secret and token! Thanks.</p>

`Secret name`: YOUR_SERVICE_TOKEN _(Actual variable name used inside the worker)_
`Secret token`: VGhpcyBpcyBhIHNlY3JldCB0b2tlbiE= _(The secret token itself)_
:::
<!-- prettier-ignore-end -->

I will upload and store this value onto Cloudflare Worker before merging the PR. **DO NOT SEND ME YOUR ACTUAL USER ACCOUNT - PASSWORD COMBINATION!**

An example is the [authentication-required Telegram Bot API](https://github.com/spencerwooo/Substats/blob/master/utils/telegram.js#L1-L14) that I used when implementing the Telegram Channel/Chat group member API. For details on how to use this secret global variable, see: [Environment Variables - Secrets](https://developers.cloudflare.com/workers/reference/apis/environment-variables/).

## Publishing <Badge text="admin" />

Publish to Cloudflare Workers:

```bash
yarn publish
```

## Documentations

To contribute on documentations (i.e., [this website](https://substats.spencerwoo.com)), you'll need to build using `vuepress`.

### Live preview docs

```bash
yarn docs:dev
```

### Building the docs

```bash
yarn docs:build
```
