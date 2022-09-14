import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
export class FeaturesController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const features = await storage.features.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                features
            },
            message: message('feature_getAll_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = await storage.features.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                feature
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        await storage.admin.findOne({ _id: id })
        const newFeature = await storage.features.create(req.body)
        res.status(201).json({
            success: true,
            data: {
                newFeature
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        await storage.admin.findOne({ _id: id })
        const updatedFeature = await storage.features.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updatedFeature
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id } = res.locals
        await storage.admin.findOne({ _id: id })
        await storage.features.delete(req.params.id)

        res.status(200).json({
            success: true,
            data: null,
            message: message('feature_delete_204', lang)
        })
    })
}
