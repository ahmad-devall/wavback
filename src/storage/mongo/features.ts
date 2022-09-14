import { FeaturesRepo } from '../repo/features'
import Features, { IFeatures } from '../../models/Features'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class FeaturesStorage implements FeaturesRepo {
    private scope = 'storage.features'

    async findAll(query: Object): Promise<IFeatures[]> {
        try {
            const dbObj = await Features.find({ ...query })
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IFeatures> {
        try {
            let dbObj = await Features.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Features_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IFeatures): Promise<IFeatures> {
        try {
            let dbObj = await Features.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IFeatures): Promise<IFeatures> {
        try {
            let dbObj = await Features.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Features_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async updateMany(query: Object, payload: IFeatures): Promise<Object> {
        try {
            const db_res = await Features.updateMany(query, payload)

            return db_res
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }
    async delete(id: string): Promise<any> {
        try {
            let dbObj = await Features.findByIdAndDelete(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'Features_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
