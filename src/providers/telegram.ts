import type { Env, SubstatsResponse } from '@/types'
import { commonProviderHandler } from '.'

// https://api.telegram.org/botxx:xxx/getChatMembersCount?chat_id=@realSpencerWoo
type TelegramResponse =
  | { ok: true; result: number }
  | { ok: false; error_code: number; description: string }

export default async function telegramProvider(
  key: string,
  env?: Env,
): Promise<SubstatsResponse> {
  return commonProviderHandler<TelegramResponse>({
    providerName: 'telegram',
    queryKey: key,
    fetchUrl: `https://api.telegram.org/bot${env?.TG_BOT_TOKEN}/getChatMembersCount?chat_id=@${key}`,
    countObjPath: 'result',
    errorMessageObjPath: 'description',
    isResponseValid: d => d.ok && 'result' in d,
  })
}
