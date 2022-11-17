import { join } from 'node:path'

export * from 'oicq'
export const CWD = process.cwd()
export const OicqDataDir = join(CWD, 'data/oicq')
export const LogDir = join(CWD, 'logs')
export const PluginDir = join(CWD, 'plugins')
export const PluginDataDir = join(CWD, 'data/plugins')

export * from './start'
