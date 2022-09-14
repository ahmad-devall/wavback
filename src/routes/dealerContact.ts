import { Router } from 'express'
import { DealerContactController } from '../controllers/dealerContact'
import { DealerContactValidator } from '../validators/dealerContact'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new DealerContactController()
const validator = new DealerContactValidator()
router
    .route('/create')
    .post(validator.create, controller.sendMessage)

export default router