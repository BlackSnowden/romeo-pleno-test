import winston from 'winston'
import config from '@config'

const outputPath = config.get('output_path')

const winstonService = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: Date.now() },
  transports: [new winston.transports.File({ filename: `${outputPath || ''}/logs/logs.log`, level: 'info' })],
})

if (config.get('node_env') === 'development') {
  winstonService.add(new winston.transports.Console())
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const _handlerSource = (data: any) => {
  switch (true) {
    case data instanceof Error: {
      return data.message || data.name || String(data).slice(0, 2000)
    }
    case Array.isArray(data): {
      return data.slice(0, 5)
    }
    case typeof data === 'object': {
      return JSON.stringify(data).slice(0, 2000)
    }
    default: {
      return String(data || '{}').slice(0, 2000)
    }
  }
}

export default {
  error(message: string, _uniqueKey?: string, data?: Error | any) {
    const uniqueKey = _uniqueKey || '-'
    const source = _handlerSource(data)

    winstonService.log('info', String(message), { uniqueKey, source, status: 'ERROR' })
  },

  warn(message: string, _uniqueKey?: string, data?: any) {
    const uniqueKey = _uniqueKey || '-'
    const source = _handlerSource(data)

    winstonService.log('info', message, { uniqueKey, source, status: 'ALERT' })
  },

  success(message: string, _uniqueKey?: string, data?: any) {
    const uniqueKey = _uniqueKey || '-'
    const source = _handlerSource(data)

    winstonService.log('info', message, { uniqueKey, source, status: 'SUCCESS' })
  },
}
