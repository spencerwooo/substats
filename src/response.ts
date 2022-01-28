export function createResponse(
  data: unknown,
  headers?: Record<string, string>,
  status?: number,
): Response {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
  })
}

export function createError(
  message: string,
  headers?: Record<string, string>,
  status?: number,
): Response {
  return createResponse({ message }, headers, status || 404)
}
