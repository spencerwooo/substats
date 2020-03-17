---
sidebar: auto
---

# How to contribute

**Substats** is a serverless function deployed on Cloudflare Workers. You should use `wrangler` to build, debug and preview the project. More information: [Cloudflare Workers | Quick Start](https://developers.cloudflare.com/workers/quickstart).

## Setting up the project

Install `wrangler` globally:

```bash
yarn global add wrangler
```

Install dependencies:

```bash
yarn
```

## Familiarizing the structure

The core API backend and the documentations share the same mono-repo. The structure of the project is shown below.

::: vue

.
📖 _Documentation section_
├── `docs` _(Documentation, built with VuePress)_
│   └── ……
│
🚡 _API backend_
├── index.js _(API starting point)_
├── `utils` _(Utility scripts folder)_
│   ├── feedly.js _(Feedly API integration)_
│   ├── github.js _(GitHub API integration)_
│   └── …… _(You get the idea...)_
│
🚀 _Deployment_
└── wrangler.toml _(Cloudflare worker deployment config)_

:::

## Building, preview and debugging

Preview with [cloudflareworkers.com](https://cloudflareworkers.com):

```bash
yarn dev
```

Lint JavaScript, Markdown and JSON files with `prettier` (Currently not available on Windows as a CLI option):

```bash
yarn lint
```

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
