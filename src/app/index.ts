import express from 'express'
import { dictionaryService, databaseService } from '@shared/services'

const app = express()
app.use(express.json())

export default {
  async start() {
    return Promise.all([dictionaryService.connect(), databaseService.connect()]).then(() => app)
  },
}
