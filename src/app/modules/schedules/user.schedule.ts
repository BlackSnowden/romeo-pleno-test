import { scheduleService } from '@shared/services'
import userAutomation from '@modules/users/user.automation'

export default scheduleService({
  interval: { time: 5, unit: 'seconds' },
  callback: userAutomation,
  options: {
    executions: 1,
  },
})
