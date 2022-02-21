import { handleRequest } from './handler'
const worker: ExportedHandler<Env> = { fetch: handleRequest }
export default worker
