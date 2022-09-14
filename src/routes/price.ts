import { Router } from 'express'
import { PriceController } from '../controllers/price'
import { PriceValidator } from '../validators/price'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new PriceController()
const validator = new PriceValidator()
const middleware = new Middleware()

router
    .route('/get')
    .get(controller.getAll)
router
    .route('/create')
    .post(middleware.auth(['admin']), controller.create)
router
    .route('/:id')
    .patch(middleware.auth(['admin',]), validator.update, controller.update)

export default router