import mongoose from 'mongoose'
import config from '@config'
import loggerService from './logger.service'

class MongoService {
  public static async connect() {
    const uri =
      `${String(config.get('mongo_protocol'))}://` +
      `${String(config.get('mongo_host'))}:` +
      `${String(config.get('mongo_port'))}/` +
      `${String(config.get('mongo_collection'))}`

    await mongoose.connect(uri, {
      authSource: 'admin',
      user: String(config.get('mongo_username')),
      pass: String(config.get('mongo_password')),
      retryWrites: true,
      w: 'majority',
    })
    loggerService.success('Server has been connected with MongoDB Service')
  }

  public static async disconnect() {
    await mongoose.disconnect()
    loggerService.success('MongoDB Service has been disconnected')
  }
}

export default MongoService
