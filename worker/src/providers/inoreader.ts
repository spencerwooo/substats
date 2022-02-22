import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

// https%3A%2F%2Fnnw.ranchero.com%2Ffeed.xml
type InoreaderRawResponseOnSuccess = { xjxobj: Array<Record<string, string>> }

async function getInoreaderCookie(env: Env): Promise<string> {
  const { INOREADER_EMAIL, INOREADER_PASSWORD } = env
  const { KV_COOKIES } = env

  const cookie = await KV_COOKIES.get('inoreader')
  if (cookie) {
    return cookie
  }

  // If Inoreader's cookie is not set, we need to login and set it with an
  // expiration inside the worker's KV storage.
  const body = new URLSearchParams({
    warp_action: 'login',
    username: INOREADER_EMAIL,
    password: INOREADER_PASSWORD,
    remember_me: 'on',
  })

  // TODO: this is not working yet, fetch here does not return the required
  // 'Set-Cookie' header, it somehow stores the cookie somewhere and returns a
  // header without any one of the required cookies. (We at least require the
  // ssid)
  const resp = await fetch('https://www.inoreader.com/', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
    method: 'POST',
  })

  const freshCookie = resp.headers.get('set-cookie')
  console.log(freshCookie)

  if (freshCookie) {
    // const expires = freshCookie.match(/expires=([^;]+);/)?.[1] ?? ''
    await KV_COOKIES.put('inoreader', freshCookie)
    return freshCookie
  }
  return ''
}

export default async function inoreaderProvider(
  key: string,
  env: Env,
): Promise<SubstatsResponse> {
  // This route uses Inoreader's search API, which is a POST request with an
  // x-www-form-urlencoded body containing the search query. It returns a JSON
  // object with an 'xjxobj' key, which contains raw HTML. We can extract the
  // feed's follower count from this raw HTML.
  const requestBody = new URLSearchParams()
  requestBody.append('xjxfun', 'build_searcher_content')
  requestBody.append('xjxr', '1645356116453')
  requestBody.append(
    'xjxargs[]',
    `{"tab":"feeds","term":"${decodeURIComponent(key)}","offset":0}`,
  )

  // Attempt to get the Inoreader cookie from either env or KV storage.
  const inoreaderCookie =
    env.INOREADER_COOKIE ?? (await getInoreaderCookie(env))

  try {
    const resp = await fetch('https://www.inoreader.com/', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: inoreaderCookie ?? '',
      },
      body: requestBody,
      method: 'POST',
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
