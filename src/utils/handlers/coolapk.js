import CryptoJS from 'crypto-js'
import hex from 'crypto-js/enc-hex'
import utf8 from 'crypto-js/enc-utf8'
import base64 from 'crypto-js/enc-base64'

/**
 * Fetch follower stats from Coolapk
 *
 * @param {string} uid Coolapk user uid
 */
const fetchCoolapkStat = uid => {
  // Coolapk api module takes user uid as query parameter
  const url = `https://api.coolapk.com/v6/user/profile?uid=${uid}`

  // generate token with crypto algorithm
  const token = getAppToken()

  // Yes of course we are a Xiaomi 8 SE user!
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
    'X-App-Token': token,
  }
  return fetch(url, { headers })
}

/**
 * Get Coolapk secret token.
 *
 * !Method: https://github.com/ZCKun/CoolapkTokenCrack/blob/master/coolapk.py
 * !Blog: https://zhuanlan.zhihu.com/p/69195418
 */
const getAppToken = () => {
  //* Stage 1/3: get current timestamp in seconds
  const timestamp = Math.floor(Date.now() / 1000)
  const hexTime = '0x' + timestamp.toString(16)

  //* Stage 2/3: get a valid device ID (Device specific)
  const deviceID = '8513efac-09ea-3709-b214-95b366f1a185'

  //* Stage 3/3: get leading base64 encoded string
  const md5Timestamp = CryptoJS.MD5(utf8.parse(timestamp.toString())).toString(hex)
  const coolapkStr = `token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?${md5Timestamp}$${deviceID}&com.coolapk.market`
  const md5CoolapkStr = CryptoJS.MD5(base64.stringify(utf8.parse(coolapkStr))).toString(hex)

  //* Finally: finalize token generation
  const token = `${md5CoolapkStr}${deviceID}${hexTime}`
  return token
}

/**
 * Coolapk API response handler
 *
 * @param {string} uid Coolapk user uid
 */
export const coolapkHandler = async uid => {
  const res = {
    source: 'coolapk',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  const response = await fetchCoolapkStat(uid)
  const stats = await response.json()
  if (stats.status) {
    // Coolapk API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.message
  } else {
    // Coolapk user found
    res.subs = stats.data.fans
  }

  return res
}
