import cron from 'cron'
import { ScheduleOptions } from '@shared/protocols'
import { loggerService } from '@shared/services'
import { getCronTime } from '@shared/helpers'

const queues = new Map<string, { state: 'RUNNING' | 'AWAITING'; executions: number }>()

export default ({ name, interval, callback, options }: ScheduleOptions) => {
  const processId = `${name}-${Date.now()}`
  queues.set(processId, { state: 'AWAITING', executions: 0 })
  const { executions = Infinity } = options || {}

  return new cron.CronJob(
    getCronTime(interval),
    () => {
      const eventProcess = queues.get(processId)
      if (!eventProcess) {
        loggerService.error(`${processId} not found in queues`)
        return
      }

      if (eventProcess.state === 'RUNNING' || eventProcess.executions >= executions) {
        return
      }

      callback().finally(() => queues.set(processId, { state: 'AWAITING', executions: eventProcess.executions + 1 }))
      queues.set(processId, { state: 'RUNNING', executions: eventProcess.executions })
    },
    null,
    false,
    'America/Sao_Paulo',
  )
}
