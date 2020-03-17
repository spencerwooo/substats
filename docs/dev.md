---
sidebar: auto
---

# How to contribute

This is a serverless function deployed on Cloudflare Workers. You should use `wrangler` to build, debug and preview the project.

## Setting up the project

Install `wrangler`

Install dependencies:

```bash
npm install
```

## Familiarizing the structure

Structure

## Building, preview and debugging

Preview with [cloudflareworkers.com](https://cloudflareworkers.com):

```bash
npm run dev
```

Lint JavaScript, Markdown and JSON files with `prettier`:

```bash
npm run lint
```

## Publishing <Badge text="admin" />

Publish to Cloudflare Workers:

```bash
npm run publish
```
