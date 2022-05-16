import config from '@config'
import FormData from 'form-data'
import requestService from './request.service'

const token = config.get('gofile_token') || ''

const getServer = async () => {
  const { success, data } = await requestService.get({
    url: 'https://api.gofile.io/getServer',
  })

  if (!success) {
    if (data.status) {
      return { success: false, data: data.status }
    }

    return { success: false, data }
  }

  if (data.status !== 'ok') {
    return { success: false, data: `No server available: ${data.status || 'N/A'}` }
  }

  return { success: true, data: data.data.server }
}

const createFolder = async (folderName: string) => {
  const rootFolderId = config.get('gofile_folderId_root')
  if (!rootFolderId) {
    return { success: false, data: 'No root folderId configured' }
  }

  const { success, data } = await requestService.put({
    url: 'https://api.gofile.io/createFolder',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    body: new URLSearchParams({
      parentFolderId: rootFolderId,
      folderName,
      token,
    }),
  })

  if (!success) {
    if (data.status) {
      return { success: false, data: data.status }
    }

    return { success: false, data }
  }

  if (data.status !== 'ok') {
    return { success: false, data: `Couldn't create folder at GoFile: ${data.status || 'N/A'}` }
  }
  return { success: true, data: data.data }
}

const uploadFile = async (fileContent: Buffer, filename: string, folderId: string) => {
  const server = await getServer()
  if (!server.success) {
    return server
  }

  const formData = new FormData()
  formData.append('file', fileContent, filename)
  formData.append('folderId', folderId)
  formData.append('token', token)

  const { success, data } = await requestService.post({
    url: `https://${server.data}.gofile.io/uploadFile`,
    options: {
      headers: { ...formData.getHeaders() },
    },
    body: formData,
  })

  if (!success) {
    if (data.status) {
      return { success: false, data: data.status }
    }

    return { success: false, data }
  }

  if (data.status !== 'ok') {
    return { success: false, data: `Couldn't upload file to GoFile: ${data.status || 'N/A'}` }
  }

  return { success: true, data: data.data }
}

const deleteFile = async (fileId: string) => {
  const { success, data } = await requestService.put({
    url: 'https://api.gofile.io/deleteContent',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    body: new URLSearchParams({
      contentsId: fileId,
      token,
    }),
  })

  if (!success) {
    if (data.status) {
      return { success: false, data: data.status }
    }

    return { success: false, data }
  }

  if (data.status !== 'ok') {
    return { success: false, data: `Couldn't delete file at GoFile: ${data.status || 'N/A'}` }
  }
  return { success: true, data: data.data }
}

export default { getServer, createFolder, uploadFile, deleteFile }
