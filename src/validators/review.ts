import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ReviewValidator {
    private createSchema = Joi.object({
        dealer_id: Joi.string().required(),
        title: Joi.string().required(),
        review: Joi.string().required(),
        customer_service: Joi.number().required(),
        buying_process: Joi.number().required(),
        overall_experience: Joi.number().required(),
        recommendation: Joi.string().valid('yes', 'no').required(),
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}