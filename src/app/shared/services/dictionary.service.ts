import Redis from 'ioredis'
import config from '@config'
import loggerService from './logger.service'

class RedisService {
  public static _instance: Redis | null

  public static getInstance() {
    if (!RedisService._instance) {
      RedisService._instance = new Redis({
        port: Number(config.get('redis_port')),
        host: String(config.get('redis_host')),
        password: String(config.get('redis_password')),
        lazyConnect: true,
      })
    }

    return RedisService._instance
  }

  public static disconnect() {
    if (!RedisService._instance) {
      loggerService.error('Server already is disconnected with Redis')
      return
    }

    RedisService._instance.disconnect()
    RedisService._instance = null

    loggerService.success('Redis service has been disconnected')
  }

  public static async connect() {
    if (RedisService._instance) {
      loggerService.error('Server already is connected with Redis')
      return
    }

    await RedisService.getInstance().connect()
    loggerService.success('Server has been connected with Redis')
  }

  public static get(group: string, key: string) {
    return RedisService.getInstance().get(`${group}:${key}`)
  }

  public static async set(group: string, key: string, value: any, expireAt?: number) {
    if (expireAt) {
      await RedisService.getInstance().set(`${group}:${key}`, value, 'PX', expireAt)
      return
    }

    await RedisService.getInstance().set(`${group}:${key}`, value)
  }

  public static async delete(group: string, key: string) {
    await RedisService.getInstance().del(`${group}:${key}`)
  }
}

export default RedisService
