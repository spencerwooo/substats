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
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 14)',
    /**
     * {
     *   "status": 1000,
     *   "error": null,
     *   "message": "请求方式错误"
     * }
     */
    'X-Requested-With': 'XMLHttpRequest',
    /**
     * {
     *   "status": 1001,
     *   "error": null,
     *   "message": "应用未授权"
     * }
     */
    'X-App-Id': 'com.coolapk.market',
    /**
     * {
     *   "status": 1004,
     *   "error": null,
     *   "message": "请求验证错误"
     * }
     */
    'X-App-Device':
      'YTZlhTNxUGNiV2NmVGM4EGI7cDMw4SNwATMzIjLBFDUVByODFUMxITM0AjMyAyOp1GZlJFI7kWbvFWaYByOgsDI7AyOxcGd5NkYwhHRQRDcqVTc0FXW3tGRJVneRhEZuV1XIpHOKVFR',
    /**
     * {
     *   "status": 1004,
     *   "error": null,
     *   "message": "请求验证错误"
     * }
     */
    'X-App-Code': 2408121,
    // 'X-App-Token': getAppToken(),
    /**
     * {
     *   "status": 1001,
     *   "error": null,
     *   "message": "请求方式错误(1)"
     * }
     */
    'X-App-Token':
      'v3JDJ5JDEwJE5qYzRZMkkzWkdNdlpqSTFPV1UzWWVYeDBOZGtKLkVFYXBhZ0R1RFlPRGVrWVlBMTVjVUNt',
    'X-App-Version': '14.4.0',
    'X-Api-Version': 14,
    'X-Sdk-Locale': 'zh-CN',
    Host: 'api.coolapk.com',
    'X-Dark-Mode': '0',
  }
  return commonProviderHandler<CoolapkResponse>({
    providerName: 'coolapk',
    queryKey: key,
    fetchUrl: `https://api.coolapk.com/v6/user/profile?uid=${key}`,
    optionalHeaders: headers,
    countObjPath: 'data.fans',
    errorMessageObjPath: 'message',
    isResponseValid: d => 'data' in d,
  })
}
