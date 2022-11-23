import { writeJsonSync } from 'fs-extra'

import { ConfigPath } from './path'

import type { Config } from 'oicq'

export type MainAdmin = number
export type AdminArray = [MainAdmin, ...number[]]

export const ActionMap: Record<'ignore' | 'accept' | 'refuse', string> = {
  ignore: '自动忽略',
  accept: '自动同意',
  refuse: '自动拒绝'
} as const

export const ModeMap: Record<'qrcode' | 'sms' | 'password', string> = {
  password: '使用密码',
  qrcode: '二维码',
  sms: '短信验证码'
} as const

/** 通知配置 */
export interface NoticeConf {
  /** 是否启用通知功能 */
  enable: boolean
  /** 好友相关 */
  friend: {
    /** 添加好友请求 */
    request: {
      /** 是否开启通知 */
      enable: boolean
      /** 如何处理好友请求，可选：ignore 忽略消息，accept 自动接受，refuse 自动拒绝 */
      action: 'ignore' | 'accept' | 'refuse'
    }
    /** 好友增加（不仅仅是正常的添加好友，还有好友克隆、好友恢复等） */
    increase: boolean
    /** 好友减少，主动或被动删除好友 */
    decrease: boolean
    /** 私聊消息 */
    message: boolean
    /** 私聊撤回消息 */
    recall: boolean
    /** 私聊闪照 */
    flash: boolean
  }
  /** 群聊、讨论组相关（所有群） */
  group: {
    /** 邀请机器人进群请求 */
    request: {
      /** 是否开启通知 */
      enable: boolean
      /** 如何处理邀请机器人进群请求，可选：ignore 忽略消息，accept 自动接受，refuse 自动拒绝 */
      action: 'ignore' | 'accept' | 'refuse'
    }
    /** 群聊增加 */
    increase: boolean
    /** 群聊减少，主动或被动退出群聊 */
    decrease: boolean
    /** 群员被禁言 */
    ban: boolean
    /** 群管理员变动 */
    admin: boolean
    /** 群转让 */
    transfer: boolean
    /** 群聊撤回消息 */
    recall: boolean
    /** 群聊闪照 */
    flash: boolean
  }
}

/** KiviBot 配置文件 */
export interface KiviConf {
  /** 登录账号 */
  account: number
  /** 登录模式，可选 password，qrcode */
  login_mode: 'password' | 'qrcode'
  /** 设备锁验证模式，可选 qrcode，sms */
  device_mode: 'qrcode' | 'sms'
  /** 消息模式（日志里是否显示 cq 码等复杂消息的详细参数），可选：short 或 detail */
  message_mode: 'short' | 'detail'
  /** 账号登录密码，会经过 base64 编码 */
  password: string
  /** 管理员列表，第一个为主管理员 */
  admins: AdminArray
  /** 通知设置 */
  notice: NoticeConf
  /** 启用插件列表 */
  plugins: string[]
  /** KiviBot 日志显示等级 */
  log_level: Config['log_level']
  /** oicq 相关配置 */
  oicq_config: Config
}

export const kiviConf = {} as KiviConf

/** 保存 KiviBot 框架配置到配置文件`kivi.json` */
export const saveKiviConf = () => {
  try {
    writeJsonSync(ConfigPath, kiviConf, { encoding: 'utf-8', spaces: 2 })
    return true
  } catch (e) {
    return false
  }
}
