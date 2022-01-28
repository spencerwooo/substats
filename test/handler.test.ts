import makeServiceWorkerEnv from 'service-worker-mock'

import { handleRequest } from '../src/handler'

declare let global: unknown

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('handle GET', async () => {
    const result = await handleRequest(new Request('/', { method: 'GET' }))
    expect(result.status).toEqual(200)
  })

  test('handle OPTIONS', async () => {
    const result = await handleRequest(new Request('/', { method: 'OPTIONS' }))
    expect(result.status).toEqual(200)
    expect(result.headers.get('access-control-allow-methods')).toEqual(
      'GET, OPTIONS',
    )
  })
})
