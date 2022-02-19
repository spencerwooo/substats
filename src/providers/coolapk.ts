import type { SubstatsResponse } from '@/types'
import CryptoJS from 'crypto-js'
import { commonProviderHandler } from '.'

// https://www.coolapk.com/u/466253
type CoolapkResponse =
  | { data: { fans: number } }
  | { status: -1; error: -1; message: string; messageStatus: -1 }

/**
 * A function for generating a valid Coolapk API token based on current time.
 * - Derived from https://github.com/ZCKun/CoolapkTokenCrack/blob/master/coolapk.py
 * - Docs at https://zhuanlan.zhihu.com/p/69195418
 * @returns {string} The token used to access the Coolapk API
 */
function getAppToken(): string {
  // First - get current timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000)
  const hexTime = '0x' + timestamp.toString(16)

  // Next - get a valid device ID (Device specific)
  const deviceID = '8513efac-09ea-3709-b214-95b366f1a185'

  // Third - get leading base64 encoded string
  const md5Timestamp = CryptoJS.MD5(
    CryptoJS.enc.Utf8.parse(timestamp.toString()),
  ).toString(CryptoJS.enc.Hex)
  const coolapkStr = `token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?${md5Timestamp}$${deviceID}&com.coolapk.market`
  const md5CoolapkStr = CryptoJS.MD5(
    CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(coolapkStr)),
  ).toString(CryptoJS.enc.Hex)

  // Finally - finalise token generation
  return `${md5CoolapkStr}${deviceID}${hexTime}`
}

export default async function coolapkProvider(
  key: string,
): Promise<SubstatsResponse> {
  const headers = {
    'User-Agent':
      'Dalvik/2.1.0 (Linux; U; Android 9; MI 8 SE MIUI/9.5.9) (#Build; Xiaomi; MI 8 SE; PKQ1.181121.001; 9) +CoolMarket/9.2.2-1905301',
    'X-App-Id': 'com.coolapk.market',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Sdk-Int': '28',
    'X-Sdk-Locale': 'zh-CN',
    'X-Api-Version': '9',
    'X-App-Version': '9.2.2',
    'X-App-Code': '1903501',
    'X-App-Device':
      'QRTBCOgkUTgsTat9WYphFI7kWbvFWaYByO1YjOCdjOxAjOxEkOFJjODlDI7ATNxMjM5MTOxcjMwAjN0AyOxEjNwgDNxITM2kDMzcTOgsTZzkTZlJ2MwUDNhJ2MyYzM',
    Host: 'api.coolapk.com',
    'X-Dark-Mode': '0',
    'X-App-Token': getAppToken(),
  }
  return commonProviderHandler<CoolapkResponse>({
    providerName: 'coolapk',
    fetchUrl: `https://api.coolapk.com/v6/user/profile?uid=${key}`,
    optionalHeaders: headers,
    countObjPath: 'data.fans',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'data' in d,
  })
}
