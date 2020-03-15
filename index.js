addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Parse request parameters
 * @param {Request} req
 */
function parseRequest(req) {
  try {
    let params = {
      // RSS service providers (currently Feedly is supported)
      providers: [],
      // RSS subscription link (URL)
      rssLink: '',
    }
    params.rssLink = req
    return params
  } catch (error) {
    return null
  }
}

/**
 * Respond
 * @param {Request} request
 */
async function handleRequest(request) {
  const respInit = {
    ok: { status: 200, headers: { 'content-type': 'application/json' } },
    ban: { status: 403, headers: { 'content-type': 'application/json' } },
  }
  let response = null

  // Ban all requests other than GET
  if (request.method !== 'GET') {
    const errorResp = {
      errorMsg: '[RSS stats] Sorry, only GET requests are allowed.',
      requestMethod: request.method,
    }
    return new Response(JSON.stringify(errorResp), respInit.ban)
  }

  const greetingResp = {
    greeting:
      '[RSS stats] Begin with a request to see your RSS subscriber count.',
    request: request.url,
  }

  const resp = parseRequest(request.url)

  response = new Response(JSON.stringify(resp), respInit.ok)
  return response
}
