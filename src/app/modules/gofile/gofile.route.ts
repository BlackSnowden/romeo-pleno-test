import { Router } from 'express'
import { validate } from '@shared/middlewares'
import gofileValidator from './gofile.validator'
import gofileController from './gofile.controller'

const router = Router()

const path = '/gofile'

router.post(`${path}/folder`, validate(gofileValidator.createFolder), gofileController.createFolder)
router.post(`${path}/:folderName/file`, validate(gofileValidator.uploadFile), gofileController.uploadFile)
router.delete(`${path}/:folderName/:filename`, validate(gofileValidator.deleteFile), gofileController.deleteFile)

export default router
