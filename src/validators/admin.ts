import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class AdminValidator {
    private createSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        login: Joi.string().required(),
        password: Joi.string().min(8).max(30).required()
    })

    private loginSchema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().min(8).max(30).required()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}