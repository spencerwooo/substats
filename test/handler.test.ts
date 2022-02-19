import { handleRequest } from '../src/handler'

describe('handle', () => {
  test('handle GET', async () => {
    const result = await handleRequest(new Request('http://localhost', { method: 'GET' }))
    expect(result.status).toEqual(200)
  })

  test('handle OPTIONS', async () => {
    const result = await handleRequest(new Request('http://localhost', { method: 'OPTIONS' }))
    expect(result.status).toEqual(200)
    expect(result.headers.get('access-control-allow-methods')).toEqual(
      'GET, OPTIONS',
    )
  })
})
