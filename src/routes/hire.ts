import { Router } from 'express'
import { HireController } from '../controllers/hire'
import { HireValidator } from '../validators/hire'

const router = Router({ mergeParams: true })
const controller = new HireController()
const validator = new HireValidator()
router
    .route('/create')
    .post(validator.create, controller.hireWav)

export default router