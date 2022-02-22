import { handleRequest } from '../src/handler'

test('handle GET', async () => {
  const env = getMiniflareBindings()
  const result = await handleRequest(
    new Request('http://localhost', { method: 'GET' }),
    env,
  )
  expect(result.status).toEqual(200)
})

test('handle OPTIONS', async () => {
  const env = getMiniflareBindings()
  const result = await handleRequest(
    new Request('http://localhost', { method: 'OPTIONS' }),
    env,
  )
  expect(result.status).toEqual(200)
  expect(result.headers.get('access-control-allow-methods')).toEqual(
    'GET, OPTIONS',
  )
})
