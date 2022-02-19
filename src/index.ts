import { handleRequest } from './handler'

const worker: ExportedHandler = { fetch: handleRequest }
export default worker
