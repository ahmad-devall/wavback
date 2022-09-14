import { Router } from 'express'
import { DealerController } from '../controllers/dealer'
import { DealerValidator } from '../validators/dealer'
import { Middleware } from '../middleware/auth'
import multer from '../middleware/multer'

const router = Router({ mergeParams: true })
const controller = new DealerController()
const validator = new DealerValidator()
const middleware = new Middleware()
const upload = multer(['image/png', 'image/jpg', 'image/jpeg'], 20).single('logo')

router
    .route('/all')
    .get(controller.getAll)
router
    .route('/create')
    .post(upload, validator.create, controller.create)
router
    .route('/login')
    .post(validator.login, controller.login)
router
    .route('/:id')
    .get(controller.getOne)
    .patch(upload, middleware.auth(['admin', 'dealer', 'user']), validator.update, controller.update)
    .delete(middleware.auth(['admin', 'dealer', 'user']), controller.delete)

export default router