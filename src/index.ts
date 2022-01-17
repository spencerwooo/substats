import { Router } from 'itty-router'
// import { handleRequest } from './handler'

const router = Router()
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
}

router.get(
  '/',
  (req: { query: { source: string | string[]; key: string | string[] } }) => {
    const { source, key } = req.query
    const resp = { source: source, key: key }
    return new Response(JSON.stringify(resp), { headers })
  },
)
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', (event) => {
  // event.respondWith(handleRequest(event.request))
  event.respondWith(router.handle(event.request))
})
