import { Request, Response } from 'express'
import { Exception } from '@shared/protocols'
import { goFileService } from '@shared/services'
import { StatusCodes } from 'http-status-codes'
import Folder from './folder.model'

const createFolder = async (request: Request, response: Response) => {
  const params = { ...request.body, ...request.params }

  const folderFound = await Folder.count({ name: params.folderName })
  if (folderFound > 0) {
    throw new Exception('Folder name already exists', StatusCodes.CONFLICT)
  }

  const { success, data } = await goFileService.createFolder(params.folderName)
  if (!success) {
    throw new Exception(data, StatusCodes.BAD_REQUEST)
  }

  const { id, name, parentFolder } = data

  const createdFolder = await Folder.create({ id, name })
  await createdFolder.save()

  response.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      folderId: id,
      folderName: name,
      parentFolderId: parentFolder,
    },
    message: `${params.folderName} folder has been created at GoFile`,
  })
}

const uploadFile = async (request: Request, response: Response) => {
  response.sendStatus(200)
}

const deleteFile = async (request: Request, response: Response) => {
  response.sendStatus(200)
}

export default { createFolder, uploadFile, deleteFile }
