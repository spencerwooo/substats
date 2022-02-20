import type { Env, SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=0689766DB370FBA076B0CFC78917BB06&steamid=76561198336249957&format=json
type SteamGamesRawResponseOnSuccess = {
  response: { game_count: number; games: Array<Record<string, number>> }
}
// https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=0689766DB370FBA076B0CFC78917BB06&steamid=76561198336249957&format=json
type SteamFriendsRawResponseOnSuccess = {
  friendslist: { friends: Array<Record<string, number | string>> }
}
type SteamGamesResponse =
  | { error: 0; games: number }
  | { error: 1; message: string }
type SteamFriendsResponse =
  | { error: 0; friends: number }
  | { error: 1; message: string }

// TODO: change this 'any' to the correct type
async function handleInvalidResponse(response: Response): Promise<any> {
  // The steam API returns HTML on error, and normal JSON on success, we need to
  // handle both cases based on Content-Type
  if (response.headers.get('Content-Type')?.includes('text/html')) {
    const text = await response.text()
    return { error: 1, message: text }
  }
  return { error: 1, message: 'Failed to parse Steam API response' }
}

async function parseSteamGamesResponse(
  response: Response,
): Promise<SteamGamesResponse> {
  if (response.headers.get('Content-Type')?.includes('application/json')) {
    const json = await response.json<SteamGamesRawResponseOnSuccess>()
    return { error: 0, games: json.response.game_count }
  }
  return handleInvalidResponse(response)
}

async function parseSteamFriendsResponse(
  response: Response,
): Promise<SteamFriendsResponse> {
  if (response.headers.get('Content-Type')?.includes('application/json')) {
    const json = await response.json<SteamFriendsRawResponseOnSuccess>()
    return { error: 0, friends: json.friendslist.friends.length }
  }
  return handleInvalidResponse(response)
}

export async function steamGamesProvider(
  key: string,
  env?: Env,
): Promise<SubstatsResponse> {
  return commonProviderHandler<SteamGamesResponse>({
    providerName: 'steamgames',
    queryKey: key,
    fetchUrl: `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${env?.STEAM_API_KEY}&steamid=${key}&format=json`,
    countObjPath: 'games',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'games' in d,
    parseResponse: parseSteamGamesResponse,
  })
}

export async function steamFriendsProvider(
  key: string,
  env?: Env,
): Promise<SubstatsResponse> {
  return commonProviderHandler<SteamFriendsResponse>({
    providerName: 'steamfriends',
    queryKey: key,
    fetchUrl: `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${env?.STEAM_API_KEY}&steamid=${key}&format=json`,
    countObjPath: 'friends',
    errorMessageObjPath: 'message',
    isResponseValid: d => d.error === 0 && 'friends' in d,
    parseResponse: parseSteamFriendsResponse,
  })
}
