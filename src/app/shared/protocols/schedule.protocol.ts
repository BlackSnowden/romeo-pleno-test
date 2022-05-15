type ScheduleOptions = {
  interval: {
    time: number
    unit: 'seconds' | 'minutes' | 'hours' | 'days'
  }
  callback: () => Promise<unknown>
  options?: {
    executions?: number
  }
}

export default ScheduleOptions
