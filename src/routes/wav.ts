import { Router } from 'express'
import { WavController } from '../controllers/wav'
import { WavValidator } from '../validators/wav'
import { Middleware } from '../middleware/auth'
import multer from '../middleware/multer'

const router = Router({ mergeParams: true })
const controller = new WavController()
const validator = new WavValidator()
const middleware = new Middleware()
const upload = multer(['image/png', 'image/jpg', 'image/jpeg'], 400).array('images', 20)

router
    .route('/')
    .get(controller.getHome)
router
    .route('/details')
    .get(controller.getDetails)
router
    .route('/all')
    .post(controller.getAll)
router
    .route('/create')
    .post(upload, middleware.auth(['dealer', 'user', 'admin']), validator.create, controller.create)
router
    .route('/:id')
    .get(controller.getOne)
    .patch(upload, middleware.auth(['dealer', 'admin', 'user']), validator.update, controller.update)
    .delete(middleware.auth(['admin', 'dealer', 'user']), controller.delete)

export default router