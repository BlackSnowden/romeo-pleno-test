import { loggerService } from '@shared/services'
import { jsonToCsv } from '@shared/utils'
import { writeFile } from 'fs'
import config from '@config'
import userTransform from './user-export-csv.body'
import Users from './users.model'

export default async () => {
  const startIn = Date.now()
  const logUniqueKey = 'users-export-csv-automation'
  loggerService.success('Starting automation', logUniqueKey)

  const users = await Users.find()
  loggerService.success('Get all users from database', logUniqueKey, users)

  const transformedUsers = users.map(userTransform)
  loggerService.success('Users report context', logUniqueKey, transformedUsers)

  const csvContent = jsonToCsv(transformedUsers, ['id', 'fullName', 'email'])
  loggerService.success('Users report converted to csv', logUniqueKey, csvContent)

  const filename = `${config.get('output_path')}/Users Report/users.csv`
  await writeFile(filename, csvContent, { encoding: 'utf-8' }, (error) => {
    if (error) {
      loggerService.error(`Error to save csv file`, logUniqueKey, error)
      return
    }

    loggerService.success(`Users report has been exported to ${filename}`, logUniqueKey)
  })

  loggerService.success(`Automation finished\nDuration: ${Date.now() - startIn}ms`, logUniqueKey)
}
