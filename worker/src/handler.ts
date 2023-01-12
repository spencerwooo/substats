import type { SupportedProviders } from './types'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import getProviders from './providers'

const providers = getProviders()

const corsHeaders = {
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['GET', 'OPTIONS'],
}

const app = new Hono<{ Bindings: Env }>()
app.use('/stats/*', cors(corsHeaders))

// Prefix all requests with /stats as production points to api.swo.moe/stats*
app.get('/stats', c => {
  const resp = Object.keys(providers)
  return c.json(resp)
})

// The 'common' route, would look for endpoint and dataPath in the query. If
// found, direct to the generalProviderHandler
app.get('/stats/common', async c => {
  const { endpoint, datapath } = c.req.query()
  if (!endpoint || !datapath) {
    return c.json({ message: 'Invalid request' }, 400)
  }

  const resp = await providers.common('', c.env, endpoint, datapath)
  return c.json(resp)
})

// A simpler route in the format of /:source/:key, returning only single sources
app.get('/stats/:source/:key', async c => {
  const { source, key } = c.req.param()

  // If 'source' is somehow 'common', return 501 error
  if (source === 'common') {
    return c.json(
      { message: 'Use /stats/common?endpoint={a}&datapath={b} please' },
      501,
    )
  }

  // If 'source' is not one of the available providers, return 501 error
  if (!(source in providers)) {
    return c.json({ message: `'${source}' is not supported yet` }, 501)
  }

  const resp = await providers[source as SupportedProviders](key, c.env)
  return c.json(resp)
})

// // TODO: A full 1.0 version route with multiple sources and keys
// router.get('/', (req: SubstatsRequest) => {
//   const source = req.query.source
//   const key = req.query.key

//   const resp = { source: source, key: key }
//   return createResponse(resp, corsHeaders)
// })

// Fallback 404 route
app.all('*', c => c.notFound())

export default function handler(
  request: Request,
  env: Env,
  context: FetchEvent,
): Response | Promise<Response> {
  return app.fetch(request, env, context)
}
