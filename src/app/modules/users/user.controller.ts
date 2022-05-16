/* eslint-disable no-await-in-loop */
import { requestService, loggerService } from '@shared/services'
import { getBasicToken } from '@shared/helpers'
import { parseXmlToJson } from '@shared/utils'
import config from '@config'

const [username, password] = [config.get('linkapi_gateway_username'), config.get('linkapi_gateway_password')]
if (!username || !password) {
  throw new Error('No credentials configured')
}

const baseUrl = 'https://linkapi-desafio-tech.gateway.linkapi.solutions/v1'
const basicToken = `basic ${getBasicToken(username, password)}`

const getUsers = async () => {
  let page = 1
  let continueRequest = true

  const users = []
  while (continueRequest) {
    const { success, data } = await requestService.get({
      url: `${baseUrl}/users?limit=10&page=${page}`,
      options: {
        headers: {
          Authorization: basicToken,
        },
      },
    })

    if (!success) {
      loggerService.error(data.message || JSON.stringify(data))
      continueRequest = false
      break
    }

    const {
      data: { usersList },
    } = parseXmlToJson(data)
    if (!usersList.item?.length) {
      continueRequest = false
      break
    }

    users.push(...usersList.item)
    page += 1
  }

  return users
}

const getUserAddresses = async (userId: string) => {
  const { success, data } = await requestService.get({
    url: `${baseUrl}/users/${userId}/address`,
    options: {
      headers: {
        Authorization: basicToken,
      },
    },
  })

  if (!success) {
    loggerService.error(data.message || JSON.stringify(data))
    return []
  }

  const { data: address } = parseXmlToJson(data)
  if (!address.item) {
    return []
  }
  return Array.isArray(address.item) ? address.item : [address.item]
}

const getUserContacts = async (userId: string) => {
  const { success, data } = await requestService.get({
    url: `${baseUrl}/users/${userId}/contacts`,
    options: {
      headers: {
        Authorization: basicToken,
      },
    },
  })

  if (!success) {
    loggerService.error(data.message || JSON.stringify(data))
    return []
  }

  const { data: contacts } = parseXmlToJson(data)
  if (!contacts.item) {
    return []
  }
  return Array.isArray(contacts.item) ? contacts.item : [contacts.item]
}

export default { getUsers, getUserAddresses, getUserContacts }
