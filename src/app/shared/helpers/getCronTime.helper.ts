import { ScheduleOptions } from '@shared/protocols'

export default ({ time, unit }: ScheduleOptions['interval']) => {
  const templateCronTime = ['seconds', 'minutes', 'hours', '*', '*', '*']

  return templateCronTime
    .reduce((cronTime, currentUnit) => {
      let cronUnit = '*'

      if (currentUnit === unit) cronUnit = `*/${time}`
      if (cronUnit === 'hours' && unit === 'days') cronUnit = `*/${time * 24}`

      cronTime.push(cronUnit)

      return cronTime
    }, <string[]>[])
    .join(' ')
}
