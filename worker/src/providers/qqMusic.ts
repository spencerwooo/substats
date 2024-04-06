import type {SubstatsResponse} from '@/types'
import CryptoJS from 'crypto-js'
import {providerErrorHandler} from '.'

// https://y.qq.com/n3/other/pages/share/profile_v2/index.html?ADTAG=musicapp&channelId=10036163&encrypt_uin=oi6qoivlowCq7c%2A%2A&mmkey=&openinqqmusic=1
// https://u6.y.qq.com/cgi-bin/musics.fcg?_webcgikey=GetHomepageHeader&_=1712389266922&sign=zzb0abd81d9z6dxxsgjpcuato71apjrka9ad8328e
// {"comm":{"g_tk":160765734,"uin":3193472696,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"mesh_devops":"DevopsBase","ct":23},"req_0":{"module":"music.UnifiedHomepage.UnifiedHomepageSrv","method":"GetHomepageHeader","param":{"Uin":"oi6qoivlowCq7c**","SingerMid":"","IsQueryTabDetail":1,"TabID":"about","Order":1,"NodeToken":"1712389266919","HomepageType":1}}}:
type QQMusicResponse =
  | { code: 0; req_0: { code:0, data: { Info: { FansNum: { Num: number } } } } }
  | { code: 500001 }

function qqMusicSign(data: string): string {
  const k1: { [key: string]: number } = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};
  const l1: number[] = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
  const t: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const md5: string = CryptoJS.MD5(data).toString().toUpperCase();

  const t1: string = md5[21] + md5[4] + md5[9] + md5[26] + md5[16] + md5[20] + md5[27] + md5[30];
  const t3: string = md5[18] + md5[11] + md5[3] + md5[2] + md5[1] + md5[7] + md5[6] + md5[25];

  const ls2: number[] = [];

  for (let i = 0; i < 16; i++) {
    const x1: number = k1[md5.charAt(i * 2)];
    const x2: number = k1[md5.charAt(i * 2 + 1)];
    const x3: number = ((x1 * 16) ^ x2) ^ l1[i];
    ls2.push(x3);
  }

  const ls3: string[] = [];
  for (let i = 0; i < 6; i++) {
    if (i === 5) {
      ls3.push(t[ls2[ls2.length - 1] >> 2]);
      ls3.push(t[(ls2[ls2.length - 1] & 3) << 4]);
    } else {
      const x4: number = ls2[i * 3] >> 2;
      const x5: number = (ls2[i * 3 + 1] >> 4) ^ ((ls2[i * 3] & 3) << 4);
      const x6: number = (ls2[i * 3 + 2] >> 6) ^ ((ls2[i * 3 + 1] & 15) << 2);
      const x7: number = 63 & ls2[i * 3 + 2];
      ls3.push(t[x4], t[x5], t[x6], t[x7]);
    }
  }
  const t2: string = ls3.join('').replace(/[\\/+]/g, '');
  return 'zzb' + (t1 + t2 + t3).toLowerCase();
}


export default async function qqMusicProvider(
  key: string,
): Promise<SubstatsResponse> {
  try {
    const uin = key.startsWith('00') ? '' : key;
    const mid = key.startsWith('00') ? key : '';
    const param: string = `{"comm":{"g_tk":0,"uin":300000,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"mesh_devops":"DevopsBase","ct":23},"req_0":{"module":"music.UnifiedHomepage.UnifiedHomepageSrv","method":"GetHomepageHeader","param":{"Uin":"${uin}","SingerMid":"${mid}","IsQueryTabDetail":1,"TabID":"about","Order":1,"NodeToken":"${Date.now()}","HomepageType":1}}}`
    const sign: string = qqMusicSign(param);

    const resp = await fetch(`https://u6.y.qq.com/cgi-bin/musics.fcg?sign=${sign}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: param,
      cf: { cacheEverything: true },
    })

    const data: QQMusicResponse = await resp.json()
    if (data.code !== 0) {
      throw new Error('Failed to fetch data from QQ Music. Error code: ' + data.code)
    }

    const followers = data.req_0.data.Info.FansNum.Num

    return {
      source: 'qqmusic',
      key,
      failed: false,
      count: followers,
    }
  } catch (error) {
    return providerErrorHandler(error, 'qqmusic', key)
  }
}
