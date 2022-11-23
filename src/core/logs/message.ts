import { colors } from '@src/utils'
import { KiviLogger } from '@/log'

import type { AllMessageEvent } from '@/plugin'

const MessageTypeMap = {
  private: '私聊',
  discuss: '讨论组',
  group: '群'
} as const

/** 消息监听函数，打印框架日志 */
export async function messageHandler(e: AllMessageEvent) {
  const { sender, message_type, seq } = e

  const type = MessageTypeMap[e.message_type]
  const nick = `${sender.nickname}(${sender.user_id})`

  let message = ''

  if (message_type === 'private') {
    // 私聊消息
    message = `↓ [${type}:${nick}]`
    await e.friend.markRead()
  } else if (message_type === 'discuss') {
    // 讨论组消息
    const discuss = `${e.discuss_name}(${e.discuss_id})`
    message = `↓ [${type}:${discuss}:${nick}]`
  } else {
    // 群聊消息
    const group = `${e.group_name}(${e.group_id})`
    message = `↓ [${type}:${group}-${nick}]`
    await e.group.markRead(seq)
  }

  KiviLogger.info(`${colors.gray(message)} ${e.toString()}`)
}
