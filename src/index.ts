import { handleRequest } from './handler'

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request))
// })
const worker: ExportedHandler = { fetch: handleRequest }
export default worker
