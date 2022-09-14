import { WavRepo } from '../repo/wav'
import Wav, { IWav } from '../../models/Wav'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class WavStorage implements WavRepo {
    private scope = 'storage.wav'

    async findHome(query: any): Promise<Object> {
        try {
            const limit = parseInt(query.limit) || 8
            const page = parseInt(query.page) || 1
            let previous = true
            let next = true
            delete query.limit
            delete query.page
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const result = await Wav.find({ ...query }).limit(limit * 1).skip(startIndex).exec()
            const nextPage = await Wav.find({ ...query }).limit(limit * 1).skip(endIndex).exec()
            if (page === 1) {
                previous = false
            }
            if (!nextPage.length) {
                next = false
            }
            let dbObj = {
                result,
                next,
                previous
            }
            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findAll(query: Object): Promise<IWav[]> {
        try {
            const wav = await await Wav.find(query).populate('owner')
            return wav
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async getAll(query: Object): Promise<IWav[]> {
        try {
            const wav = await await Wav.find(query)
            return wav
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }


    async findOne(query: Object): Promise<IWav> {
        try {
            let dbObj = await Wav.findOne({ ...query }).populate('owner')

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'wav_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
    async find(query: Object): Promise<IWav> {
        try {
            let dbObj = await Wav.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'wav_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IWav): Promise<IWav> {
        try {
            let dbObj = await Wav.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IWav): Promise<IWav> {
        try {
            let dbObj = await Wav.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'wav_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async updateMany(query: Object, payload: IWav): Promise<Object> {
        try {
            const db_res = await Wav.updateMany(query, payload)

            return db_res
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }
    async delete(id: string): Promise<any> {
        try {
            let dbObj = await Wav.findByIdAndDelete(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'wav_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
