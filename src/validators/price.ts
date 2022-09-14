import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class PriceValidator {
    private updateSchema = Joi.object({
        individual: Joi.string(),
        packeg_1: Joi.string(),
        packeg_2: Joi.string(),
        packeg_3: Joi.string()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}