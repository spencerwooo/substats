interface Env {
  // Environment variables and worker secrets
  STEAM_API_KEY: string
  TG_BOT_TOKEN: string
  UNSPLASH_ACCESS_TOKEN: string
  INOREADER_EMAIL: string
  INOREADER_PASSWORD: string
  INOREADER_COOKIE: string
  INSTAGRAM_COOKIE: string

  // Worker KV namespaces
  KV_COOKIES: KVNamespace
}
