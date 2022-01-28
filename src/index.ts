import { Router } from 'itty-router'
// import { withParams } from 'itty-router-extras'

import { createError, createResponse } from './response'
import { SubstatsRequest } from './types'

const router = Router()
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

router.options('*', () => new Response(null, { headers: corsHeaders }))

// A simpler route in the format of /:source/:key, returning only single sources
router.get('/:source/:key', (req: SubstatsRequest) => {
  const { source, key } = req.params
  const resp = { source: source, key: key }

  return createResponse(resp, corsHeaders)
})

// A full 1.0 version route with multiple sources and keys
router.get('/', (req: SubstatsRequest) => {
  const source = req.query.source
  const key = req.query.key || req.query.queryKey
  // 'queryKey' is an alias for 'key' and is evaluated here for backwards compatibility
  const queryKey = req.query.queryKey

  const resp = { source: source, key: key }
  return createResponse(resp, corsHeaders)
})

// Fallback 404 route
router.all('*', () => createError('Not Found'))

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request))
})
