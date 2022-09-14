import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class HireValidator {
    private createSchema = Joi.object({
        size: Joi.string().required(),
        duration: Joi.string().required(),
        startDate: Joi.string().required(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        postCode: Joi.string().required(),
        phone: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}