import { scheduleService } from '@shared/services'
import automation from '@modules/users/user-export-csv.automation'

export default scheduleService({
  name: 'users-export-csv',
  interval: { time: 10, unit: 'seconds' },
  callback: automation,
  options: {
    executions: 1,
  },
})
