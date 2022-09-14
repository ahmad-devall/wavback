import { PaymentRepo } from '../repo/payment'
import Payment, { IPayment } from '../../models/Payment'
import { logger } from '../../config/logger'

export class PaymentStorage implements PaymentRepo {
    private scope = 'storage.admin'

    async findAll(query: Object): Promise<IPayment[]> {
        try {
            const dbObj = await Payment.find({ ...query })
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IPayment | Object): Promise<IPayment> {
        try {
            let dbObj = await Payment.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
}
