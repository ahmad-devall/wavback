import express, { Router } from 'express'
import path from 'path'
import wavRouter from './wav'
import adminRouter from './admin'
import dealerRouter from './dealer'
import reviewRouter from './review'
import contactRouter from './contact'
import paymentRouter from './payment'
import hireRouter from './hire'
import dealerContactRouter from './dealerContact'
import priceRouter from './price'
import featuresRouter from './features'

const router = Router({ mergeParams: true })

router.use('/api/file', express.static(path.join(__dirname, '../../../uploads')))
router.use('/wav', wavRouter)
router.use('/admin', adminRouter)
router.use('/dealer', dealerRouter)
router.use('/review', reviewRouter)
router.use('/contact', contactRouter)
router.use('/payment', paymentRouter)
router.use('/hire', hireRouter)
router.use('/dealer/contact', dealerContactRouter)
router.use('/price', priceRouter)
router.use('/features', featuresRouter)
export default router