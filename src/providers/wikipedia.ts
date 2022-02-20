import type { SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://zh.wikipedia.org/w/api.php?action=query&list=users&ususers=ChenSimon&usprop=editcount&format=json
type WikipediaZhRawResponse = {
  batchcomplete: ''
  query: {
    users: [{ userid?: number; name: string; editcount?: number; missing: '' }]
  }
}
type WikipediaZhResponse =
  | { error: 0; edits: number }
  | { error: 1; message: string }

async function parseResponse(response: Response): Promise<WikipediaZhResponse> {
  const data = await response.json<WikipediaZhRawResponse>()
  if ('missing' in data.query.users) {
    return { error: 1, message: 'Wikipedia user not found' }
  }
  return { error: 0, edits: data.query.users[0].editcount ?? 0 }
}

export default async function wikipediaZhProvider(
  key: string,
): Promise<SubstatsResponse> {
  return commonProviderHandler<WikipediaZhResponse>({
    providerName: 'wikipediazh',
    queryKey: key,
    fetchUrl: `https://zh.wikipedia.org/w/api.php?action=query&list=users&ususers=${key}&usprop=editcount&format=json`,
    countObjPath: 'edits',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error !== 0 && 'edits' in d,
    parseResponse: parseResponse,
  })
}
