import { Router } from 'express'
import gofileRouter from '@modules/gofile/gofile.route'

const router = Router()

router.use(gofileRouter)

export default router
