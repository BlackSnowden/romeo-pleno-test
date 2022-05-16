import config from '@config'
import { loggerService } from '@shared/services'
import schedules from 'app/schedules'
import server from './app'

const serverPort = config.get('server_port')
if (!serverPort) {
  throw new Error('No server port configured')
}

server
  .start()
  .then((app) => {
    app.listen(serverPort, () => {
      schedules.start()
      loggerService.success(`Server's running at port: ${serverPort}`)
    })
  })
  .catch(loggerService.error)
