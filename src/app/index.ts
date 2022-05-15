import express from 'express'
import { redisService, databaseService } from '@shared/services'

const app = express()
app.use(express.json())

export default {
  async start() {
    return Promise.all([redisService.connect(), databaseService.connect()]).then(() => app)
  },
}
