import type { Env, SubstatsRequest, SupportedProviders } from './types'

import { Router } from 'itty-router'
// import { withParams } from 'itty-router-extras'

import getProviders from './providers'
import { createError, createResponse } from './response'

const providers = getProviders()

// Prefix all requests with /stats as we deploy on api.swo.moe/stats*
const router = Router({ base: '/stats' })
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

router.options('*', () => new Response(null, { headers: corsHeaders }))

router.get('/', async () => {
  const resp = Object.keys(providers)
  return createResponse(resp, corsHeaders)
})

// A simpler route in the format of /:source/:key, returning only single sources
router.get('/:source/:key', async (req: SubstatsRequest, env: Env) => {
  const { source, key } = req.params

  // If one of the required params is missing, return an 400 error
  if (!source || !key) {
    return createError('Invalid request', 400)
  }
  // If 'source' is not one of the available providers, return 501 error
  if (!(source in providers)) {
    return createError(`'${source}' is not supported yet`, 501)
  }

  const resp = await providers[source as SupportedProviders](key, env)
  return createResponse(resp, corsHeaders)
})

// // TODO: A full 1.0 version route with multiple sources and keys (itty-router is
// // blocking this as it does not handle multiple query params of the same name)
// router.get('/', (req: SubstatsRequest) => {
//   const source = req.query.source
//   const key = req.query.key

//   const resp = { source: source, key: key }
//   return createResponse(resp, corsHeaders)
// })

// Fallback 404 route
router.all('*', () => createError('Not Found'))

export function handleRequest(request: Request, env?: Env): Promise<Response> {
  return router.handle(request, env)
}
