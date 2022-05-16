import { scheduleService } from '@shared/services'
import automation from '@modules/users/user.automation'

export default scheduleService({
  name: 'users',
  interval: { time: 10, unit: 'seconds' },
  callback: automation,
})
