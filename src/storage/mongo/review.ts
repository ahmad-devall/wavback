import { ReviewRepo } from '../repo/review'
import Review, { IReview } from '../../models/Review'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ReviewStorage implements ReviewRepo {
    private scope = 'storage.review'

    async findAll(query: Object): Promise<IReview[] | any> {
        try {
            const dbObj = await Review.find({ ...query })
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IReview> {
        try {
            let dbObj = await Review.findOne({ ...query })

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

    async create(payload: IReview): Promise<IReview> {
        try {
            let dbObj = await Review.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
    async delete(id: string): Promise<any> {
        try {
            let dbObj = await Review.findByIdAndDelete(id)

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
