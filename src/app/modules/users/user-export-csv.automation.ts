import { loggerService } from '@shared/services'
import { jsonToCsv, saveFile } from '@shared/utils'
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

  await saveFile(`/${config.get('output_path')}/Users Report/users.csv`, csvContent)
    .then(() => loggerService.success(`Users report has been exported`, logUniqueKey))
    .catch((error) => loggerService.error(`Error to save csv file`, logUniqueKey, error))

  loggerService.success(`Automation finished\nDuration: ${Date.now() - startIn}ms`, logUniqueKey)
}
