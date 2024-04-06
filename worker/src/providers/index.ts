import type {
  ProviderFunctions,
  SubstatsResponse,
  SupportedProviders,
} from '@/types'

import objectPath from 'object-path'

import commonEndpointProvider from './common'
import afdianProvider from './afdian'
import bilibiliProvider from './bilibili'
import coolapkProvider from './coolapk'
import feedlyProvider from './feedly'
import feedsPubProvider from './feedsPub'
import githubProvider from './github'
import inoreaderProvider from './inoreader'
import jikeProvider from './jike'
import mastodonProvider from './mastodon'
import mediumProvider from './medium'
import neteaseMusicProvider from './neteaseMusic'
import redditProvider from './reddit'
import sspaiProvider from './sspai'
import { steamFriendsProvider, steamGamesProvider } from './steam'
import telegramProvider from './telegram'
import twitterProvider from './twitter'
import unsplashProvider from './unsplash'
import weiboProvider from './weibo'
import wikipediaZhProvider from './wikipedia'
import zhihuProvider from './zhihu'
import instagramProvider from './instagram'
import juejinProvider from './juejin'
import yuqueProvider from './yuque'
import qqMusicProvider from "./qqMusic";

type FailedSubstatsResponse = Extract<SubstatsResponse, { failed: true }>

/**
 * A common provider handler which fetches JSON data from fetchUrl and extracts
 * the count value (a number) from the path specified by countObjPath, returning
 * the data as a SubstatsResponse. If the response is not valid, it returns a
 * FailedSubstatsResponse.
 * @param {object} CommonProviderHandler
 * @property {SupportedProviders} providerName - The name of the provider
 * @property {string} fetchUrl - The URL to fetch JSON data from
 * @property {Record<string, string>} optionalHeaders - Optional headers to
 *  add when requesting the fetchUrl (mostly used for authentication)
 * @property {string} countObjPath - The path to the count value in the JSON
 * @property {string} errorMessageObjPath - The path to the error message
 * @property {(data: T) => boolean} isResponseValid - Checks if the
 * response is valid against a specific requirement (differs per provider)
 * @property {(res: Response) => Promise<T>} parseResponse - Parses the
 * response, where if not provided, falls back to res.json<T>() and returns a
 * JSON response
 * @returns {Promise<SubstatsResponse>} The data as a SubstatsResponse
 */
export async function commonProviderHandler<T>({
  providerName,
  queryKey,
  fetchUrl,
  optionalHeaders,
  countObjPath,
  errorMessageObjPath,
  isResponseValid,
  parseResponse,
}: {
  providerName: SupportedProviders
  queryKey: string
  fetchUrl: string
  optionalHeaders?: Record<string, string>
  countObjPath: string
  errorMessageObjPath: string
  isResponseValid: (d: T) => boolean
  parseResponse?: (res: Response) => Promise<T>
}): Promise<SubstatsResponse> {
  try {
    const resp = await fetch(fetchUrl, {
      headers: optionalHeaders ?? {
        'User-Agent': 'Mozilla/5.0 (compatible; Substatsbot/2.0)',
      },
      cf: { cacheEverything: true },
    })
    const d = parseResponse ? await parseResponse(resp) : await resp.json<T>()

    // If responded data is not null or undefined, and is valid by checking the
    // data against the callback isResponseValid()
    if (isResponseValid(d)) {
      const count = objectPath.get(
        d as unknown as Record<string, unknown>,
        countObjPath,
        0,
      )
      return {
        source: providerName,
        key: queryKey,
        failed: false,
        count: count,
      }
    }

    throw new Error(
      objectPath.get<string>(
        d as unknown as Record<string, unknown>,
        errorMessageObjPath,
        `An error occured with the ${providerName} API`,
      ),
    )
  } catch (error) {
    return providerErrorHandler(error, providerName, queryKey)
  }
}

/**
 * A function for handling and gracefully responsing errors thrown from the
 * commonProviderHandler().
 * @param error - The error thrown by the provider
 * @param provider - The name of the provider
 * @returns {FailedSubstatsResponse} The error as a FailedSubstatsResponse
 */
export function providerErrorHandler(
  error: unknown,
  provider: SupportedProviders,
  key: string,
): FailedSubstatsResponse {
  return {
    source: provider,
    key: key,
    failed: true,
    message:
      // Failing and throwing the error gracefully
      error instanceof Error
        ? error.message
        : `An error occured with the ${provider} API`,
  }
}

/**
 * Returns a mapping of provider names to provider functions.
 */
export default function getProviders(): Record<
  SupportedProviders,
  ProviderFunctions
> {
  return {
    common: commonEndpointProvider,
    afdian: afdianProvider,
    bilibili: bilibiliProvider,
    coolapk: coolapkProvider,
    feedly: feedlyProvider,
    feedspub: feedsPubProvider,
    github: githubProvider,
    inoreader: inoreaderProvider,
    instagram: instagramProvider,
    jike: jikeProvider,
    mastodon: mastodonProvider,
    medium: mediumProvider,
    neteasemusic: neteaseMusicProvider,
    qqmusic: qqMusicProvider,
    reddit: redditProvider,
    sspai: sspaiProvider,
    steamgames: steamGamesProvider,
    steamfriends: steamFriendsProvider,
    telegram: telegramProvider,
    twitter: twitterProvider,
    unsplash: unsplashProvider,
    weibo: weiboProvider,
    wikipediazh: wikipediaZhProvider,
    zhihu: zhihuProvider,
    juejin: juejinProvider,
    yuque: yuqueProvider,
  }
}
