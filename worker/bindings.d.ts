interface Env {
  // Unencrypted variables
  ENVIRONMENT: 'production' | 'dev'

  // Environment variables and worker secrets
  STEAM_API_KEY: string
  TG_BOT_TOKEN: string
  UNSPLASH_ACCESS_TOKEN: string
  INSTAGRAM_COOKIE: string

  // Worker KV namespaces
  KV_COOKIES: KVNamespace
}
