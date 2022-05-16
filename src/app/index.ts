import 'express-async-errors'
import filesUpload from 'express-fileupload'
import express from 'express'
import { dictionaryService, databaseService } from '@shared/services'
import { errorHandler } from '@shared/middlewares'
import routes from './routes'

const app = express()
app.use(
  filesUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
)
app.use(express.json())
app.use(routes)
app.use(errorHandler)

export default {
  async start() {
    return Promise.all([dictionaryService.connect(), databaseService.connect()]).then(() => app)
  },
}
