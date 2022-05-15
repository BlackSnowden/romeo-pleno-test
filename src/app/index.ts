import 'express-async-errors'
import express from 'express'
import { dictionaryService, databaseService } from '@shared/services'
import { errorHandler } from '@shared/middlewares'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(routes)
app.use(errorHandler)

export default {
  async start() {
    return Promise.all([dictionaryService.connect(), databaseService.connect()]).then(() => app)
  },
}
