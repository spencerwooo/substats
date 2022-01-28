import type { SubstatsRequest } from './types'

import { Router } from 'itty-router'
// import { withParams } from 'itty-router-extras'

import getProviders from './providers'
import { createError, createResponse } from './response'

const providers = getProviders()

const router = Router()
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

router.options('*', () => new Response(null, { headers: corsHeaders }))

// A simpler route in the format of /:source/:key, returning only single sources
router.get('/:source/:key', async (req: SubstatsRequest) => {
  const { source, key } = req.params

  // If one of the required params is missing, return an 400 error
  if (!source || !key) {
    return createError('Invalid request', 400)
  }
  // If 'source' is not one of the available providers, return an unimplemented error
  if (!(source in providers)) {
    return createError(`'${source} is not supported yet`, 501)
  }

  const resp = await providers[source](key)

  return createResponse(resp, corsHeaders)
})

// A full 1.0 version route with multiple sources and keys
router.get('/', (req: SubstatsRequest) => {
  const source = req.query.source
  const key = req.query.key

  const resp = { source: source, key: key }
  return createResponse(resp, corsHeaders)
})

// Fallback 404 route
router.all('*', () => createError('Not Found'))

export function handleRequest(request: Request): Promise<Response> {
  return router.handle(request)
}
