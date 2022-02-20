import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml
type InoreaderRawResponseOnSuccess = {
  xjxobj: Array<Record<string, string>>
}

export default async function inoreaderProvider(
  key: string,
): Promise<SubstatsResponse> {
  // This route uses Inoreader's search API, which is a POST request with the
  // query as the body.
  const requestBody = new FormData()
  requestBody.append('xjxfun', 'build_searcher_content')
  requestBody.append('xjxr', '1645356116453')
  requestBody.append(
    'xjxargs[]',
    `{"tab":"feeds","term":"${decodeURIComponent(key)}","offset":0}`,
  )

  try {
    const resp = await fetch('https://www.inoreader.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
      cf: { cacheEverything: true },
    })

    const data = await resp.json<InoreaderRawResponseOnSuccess>()

    // We are looking for the returned element with the 'search_content' prop as
    // 'id' and 'innerHTML' prop as 'prop', this object should contain 'data' as
    // an HTML string for us to parse. A sample response:
    // {
    //   xjxobj: [
    //     { cmd: 'js', data: '...'},
    //     { cmd: 'jc', func: 'xxx', data: '...'},
    //     { cmd: 'as', id: 'search_content', prop: 'innerHTML', data: '...' },
    //     { /* ... */ },
    //   ]
    // }
    const predicate = (x: Record<string, string>) =>
      'id' in x && x?.id === 'search_content' && 'data' in x
    const followerHTML = data.xjxobj.find(predicate)?.data
    console.log(followerHTML)

    if (!followerHTML) {
      throw new Error('Feed not found on Inoreader')
    }

    // Match against the regexp to get the number of followers - we are
    // specifically looking for strings like '123 followers' or '1k followers'
    const result = followerHTML.match(/\d+[kK]? follower[s]?/)?.[0]
    if (!result) {
      throw new Error('Could not find number of subscribers of feed')
    }

    // Extract the actual number from the matched string
    const value = result.match(/\d+[kK]?/)?.[0]
    if (!value) {
      throw new Error('Failed to parse number of subscribers')
    }

    // For strings like '1k', we need to replace 'k' with '000'
    const followers = parseInt(value.replace(/[kk]/, '000'))
    return {
      source: 'inoreader',
      key,
      failed: false,
      count: followers,
    }
  } catch (error) {
    return providerErrorHandler(error, 'inoreader', key)
  }
}
