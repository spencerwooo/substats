import type { SubstatsResponse } from '@/types'
import { providerErrorHandler } from '.'

export default async function inoreaderProvider(
  key: string,
): Promise<SubstatsResponse> {
  try {
    const resp = await fetch(`https://www.innoreader.com/feed/${encodeURIComponent(key)}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      },
      cf: { cacheEverything: true },
    })

    const followerHTML = await resp.text()

    if (!followerHTML || /Page not found/.test(followerHTML)) {
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
