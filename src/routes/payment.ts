import { Router } from 'express'
import { PaymentController } from '../controllers/payment'
import { PaymentValidator } from '../validators/payment'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new PaymentController()
const validator = new PaymentValidator()
const middleware = new Middleware()
router
    .route('/all')
    .get(middleware.auth(['dealer', 'user', 'admin',]), controller.getAll)
router
    .route('/pay')
    .post(middleware.auth(['dealer', 'user',]), controller.pay)

export default router