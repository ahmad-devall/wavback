import { Router } from 'express'
import { AdminController } from '../controllers/admin'
import { AdminValidator } from '../validators/admin'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new AdminController()
const validator = new AdminValidator()
const middleware = new Middleware()

router
    .route('/all')
    .get(middleware.auth(['admin']), controller.getAll)
router
    .route('/create')
    .post(validator.create, controller.create)
router
    .route('/login')
    .post(validator.login, controller.login)
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.getOne)
    .delete(middleware.auth(['admin']), controller.delete)

export default router