import { PriceRepo } from '../repo/price'
import Price, { IPrice } from '../../models/Price'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class PriceStorage implements PriceRepo {
    private scope = 'storage.admin'

    async findAll(query: Object): Promise<IPrice[]> {
        try {
            const dbObj = await Price.find({ ...query })
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IPrice): Promise<IPrice> {
        try {
            let dbObj = await Price.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IPrice): Promise<IPrice> {
        try {
            let dbObj = await Price.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'price_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }
}
