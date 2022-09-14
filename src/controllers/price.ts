import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'


export class PriceController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const price = await storage.price.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                price
            },
            message: message('price_getAll_200', lang)
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        await storage.admin.findOne({ _id: id })
        const newPrice = await storage.price.create(req.body)
        res.status(201).json({
            success: true,
            data: {
                newPrice
            }
        })
    })
    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        await storage.admin.findOne({ _id: id })
        const updatedPrice = await storage.price.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updatedPrice
            }
        })
    })
}
