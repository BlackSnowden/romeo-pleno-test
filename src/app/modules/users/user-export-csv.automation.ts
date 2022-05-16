import { loggerService, goFileService } from '@shared/services'
import { jsonToCsv } from '@shared/utils'
import config from '@config'
import Folder from '@modules/gofile/folder.model'
import userTransform from './user-export-csv.body'
import User from './user.model'

export default async () => {
  const startIn = Date.now()
  const logUniqueKey = 'users-export-csv-automation'
  loggerService.success('Starting automation', logUniqueKey)

  const users = await User.find()
  if (!users.length) {
    loggerService.warn('No users found', logUniqueKey, [])
    return
  }

  loggerService.success('Get all users from database', logUniqueKey, users)

  const transformedUsers = users.map(userTransform)
  loggerService.success('Users report context', logUniqueKey, transformedUsers)

  const csvContent = Buffer.from(jsonToCsv(transformedUsers, ['id', 'fullName', 'email']))
  loggerService.success('Users report csv has been converted to buffer', logUniqueKey)

  const usersReportsFolderName = config.get('gofile_folderName_users_report')
  if (!usersReportsFolderName) {
    loggerService.error(`No user reports folderName configured`, logUniqueKey)
    return
  }

  const usersReportFolder = await Folder.findOne({ name: usersReportsFolderName })
  if (!usersReportFolder) {
    loggerService.error(`No user reports folder found`, logUniqueKey)
    return
  }

  const { success, data } = await goFileService.uploadFile(csvContent, `users_${Date.now()}.csv`, usersReportFolder.id)
  if (!success) {
    loggerService.error(`Couldn't upload file to GoFile`, logUniqueKey, data)
    return
  }

  loggerService.success('File has been uploaded to GoFile', logUniqueKey, data)
  loggerService.success(`Automation finished\nDuration: ${Date.now() - startIn}ms`, logUniqueKey)
}
