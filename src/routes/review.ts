import { Router } from 'express'
import { ReviewController } from '../controllers/review'
import { ReviewValidator } from '../validators/review'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new ReviewController()
const validator = new ReviewValidator()
const middleware = new Middleware()

router
    .route('/all')
    .get(controller.getAll)
router
    .route('/create')
    .post(validator.create, middleware.auth(['user']), controller.create)
router
    .route('/:id')
    .get(controller.getOne)
    .delete(middleware.auth(['admin', 'user']), controller.delete)

export default router