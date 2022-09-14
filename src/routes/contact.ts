import { Router } from 'express'
import { ContactController } from '../controllers/contact'
import { ContactValidator } from '../validators/contact'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new ContactController()
const validator = new ContactValidator()
router
    .route('/create')
    .post(validator.create, controller.sendMessage)

export default router