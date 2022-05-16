import { Request, Response } from 'express'
import { Exception } from '@shared/protocols'
import { goFileService } from '@shared/services'
import { StatusCodes } from 'http-status-codes'
import gofileService from '@shared/services/gofile.service'
import Folder from './folder.model'
import File from './file.model'

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
  const params = { ...request.body, ...request.params }

  const { file: files = [] } = request.files || {}
  const file = Array.isArray(files) ? files[0] : files

  const folderFound = await Folder.findOne({ name: params.folderName })
  if (!folderFound) {
    throw new Exception(`No folders found with name: ${params.folderName}`, StatusCodes.NOT_FOUND)
  }

  const { success, data } = await gofileService.uploadFile(file.data, file.name, folderFound.id)
  if (!success) {
    throw new Exception(data, StatusCodes.BAD_REQUEST)
  }

  const createdFile = await File.create({
    id: data.fileId,
    name: data.fileName,
    folderId: data.parentFolder,
  })
  await createdFile.save()

  response.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      fileId: createdFile.id,
      folderId: createdFile.folderId,
      filename: createdFile.name,
    },
    message: 'File has been uploaded at GoFile',
  })
}

const deleteFile = async (request: Request, response: Response) => {
  const params = { ...request.body, ...request.params }

  const folderFound = await Folder.findOne({ name: params.folderName })
  if (!folderFound) {
    throw new Exception(`No folders found with name: ${params.folderName}`, StatusCodes.NOT_FOUND)
  }

  const fileFound = await File.findOne({ name: params.filename })
  if (!fileFound) {
    throw new Exception(`No files found with filename: ${params.filename}`, StatusCodes.NOT_FOUND)
  }

  const { success, data } = await goFileService.deleteFile(fileFound.id)
  if (!success) {
    throw new Exception(data, StatusCodes.BAD_REQUEST)
  }

  response.status(StatusCodes.OK).json({
    success: true,
    data: null,
    message: 'File has been deleted from GoFile',
  })
}

export default { createFolder, uploadFile, deleteFile }
