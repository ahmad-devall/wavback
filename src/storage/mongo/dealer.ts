import { DealerRepo } from '../repo/dealer'
import Dealer, { IDealer } from '../../models/Dealer'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class DealerStorage implements DealerRepo {
    private scope = 'storage.dealer'

    async findAll(query: Object): Promise<IDealer[] | any> {
        try {
            const dbObj = await Dealer.find({ ...query })
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IDealer | any> {
        try {
            let dbObj = await Dealer.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'dealer_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IDealer): Promise<IDealer> {
        try {
            let dbObj = await Dealer.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IDealer | Object): Promise<IDealer> {
        try {
            let dbObj = await Dealer.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'dealer_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async updateMany(query: Object, payload: IDealer): Promise<Object> {
        try {
            const db_res = await Dealer.updateMany(query, payload)

            return db_res
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }
    async delete(id: string): Promise<any> {
        try {
            let dbObj = await Dealer.findByIdAndDelete(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'dealer_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
