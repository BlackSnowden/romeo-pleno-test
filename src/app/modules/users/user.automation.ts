import { loggerService, dictionaryService } from '@shared/services'
import { parallel, sleep } from '@shared/helpers'
import userController from './user.controller'
import userTransform from './user.body'
import Users from './users.model'

export default async () => {
  const startIn = Date.now()
  const logUniqueKey = 'users-automation'
  loggerService.success('Starting automation', logUniqueKey)

  const users = await userController.getUsers()
  loggerService.success('Get all users from linkapi gateway', logUniqueKey, users)

  await sleep(60000)

  await parallel({
    array: users,
    options: { executions: 8, delay: 60000 },
    callback: async (user: { [key: string]: any }, userId: string) => {
      try {
        const userAlreadyInserted = await dictionaryService.get('users', userId)
        if (userAlreadyInserted) {
          loggerService.warn('User already inserted on database', userId)
          return
        }

        const [[userAddress], [userContact]] = await Promise.all([
          userController.getUserAddresses(`${userId}`),
          userController.getUserContacts(`${userId}`),
        ])

        loggerService.success('Get user address', userId, userAddress)
        loggerService.success('Get user contact', userId, userContact)

        const userContext = userTransform({ ...user, ...userAddress, ...userContact })
        loggerService.success('Transformed user', userId, userContext)

        const createdUser = await Users.create(userContext)
        await createdUser.save()
        loggerService.success('User has been inserted into database', userId, createdUser)

        await dictionaryService.set('users', userId, 'inserted')
      } catch (error) {
        loggerService.error('An exception occurred', logUniqueKey, error)
      }
    },
  })

  loggerService.success(`Automation finished\nDuration: ${Date.now() - startIn}ms`, logUniqueKey)
}
