import { Router } from 'express'
import { FeaturesController } from '../controllers/features'
import { FeaturesValidator } from '../validators/features'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new FeaturesController()
const validator = new FeaturesValidator()
const middleware = new Middleware()

router
    .route('/all')
    .get(controller.getAll)
router
    .route('/create')
    .post(middleware.auth(['admin']), validator.create, controller.create)
router
    .route('/:id')
    .get(controller.getOne)
    .patch(middleware.auth(['admin']), validator.update, controller.update)
    .delete(middleware.auth(['admin']), controller.delete)

export default router