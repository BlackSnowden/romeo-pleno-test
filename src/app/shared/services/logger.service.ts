import winston from 'winston'
import config from '@config'

const logsPath = config.get('logs_path')

const winstonService = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: Date.now() },
  transports: [new winston.transports.File({ filename: `${logsPath || ''}/logs.log`, level: 'info' })],
})

if (config.get('node_env') === 'development') {
  winstonService.add(new winston.transports.Console())
}

export default {
  error(message: string, _uniqueKey?: string, data?: any) {
    const uniqueKey = _uniqueKey || '-'
    const source = data || {}

    winstonService.log('info', String(message), { uniqueKey, source, status: 'ERROR' })
  },

  warn(message: string, _uniqueKey?: string, data?: any) {
    const uniqueKey = _uniqueKey || '-'
    const source = data || {}

    winstonService.log('info', message, { uniqueKey, source, status: 'ALERT' })
  },

  success(message: string, _uniqueKey?: string, data?: any) {
    const uniqueKey = _uniqueKey || '-'
    const source = data || {}

    winstonService.log('info', message, { uniqueKey, source, status: 'SUCCESS' })
  },
}
