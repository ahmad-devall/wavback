import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class WavValidator {
    createSchema = Joi.object({
        owner: Joi.forbidden(),
        featured: Joi.forbidden(),
        price: Joi.string().required(),
        condition: Joi.string().valid('used', 'new', 'motability').required(),
        make: Joi.string().required(),
        models: Joi.string().required(),
        year: Joi.number().required(),
        body: Joi.string().required(),
        engine: Joi.number().required(),
        size: Joi.string().required(),
        entrance: Joi.string().required(),
        doors: Joi.string().required(),
        mileage: Joi.string().required(),
        transmission: Joi.string(),
        wav_type: Joi.string().required(),
        space: Joi.string().required(),
        stock_id: Joi.string().required(),
        fuel_type: Joi.string(),
        exterior_colour: Joi.string().required(),
        seating: Joi.string().required(),
        conversion: Joi.string(),
        features: Joi.array().items(Joi.string()),
        status: Joi.string().valid('active', 'ended'),
        title: Joi.string().required(),
        description: Joi.string().required()
    })

    createAdminSchema = Joi.object({
        owner: Joi.string().required(),
        featured: Joi.boolean(),
        price: Joi.string().required(),
        condition: Joi.string().valid('used', 'new', 'motability').required(),
        make: Joi.string().required(),
        models: Joi.string().required(),
        year: Joi.number().required(),
        body: Joi.string().required(),
        engine: Joi.number().required(),
        size: Joi.string().required(),
        entrance: Joi.string().required(),
        doors: Joi.string().required(),
        mileage: Joi.string().required(),
        transmission: Joi.string(),
        wav_type: Joi.string().required(),
        space: Joi.string().required(),
        stock_id: Joi.string().required(),
        fuel_type: Joi.string(),
        exterior_colour: Joi.string().required(),
        seating: Joi.string().required(),
        conversion: Joi.string(),
        features: Joi.array().items(Joi.string()),
        status: Joi.string().valid('active', 'ended'),
        title: Joi.string().required(),
        description: Joi.string().required()
    })

    updateSchema = Joi.object({
        price: Joi.string(),
        featured: Joi.forbidden(),
        condition: Joi.string().valid('used', 'new', 'motability'),
        make: Joi.string(),
        models: Joi.string(),
        year: Joi.number(),
        body: Joi.string(),
        engine: Joi.number(),
        size: Joi.string(),
        entrance: Joi.string(),
        doors: Joi.string(),
        mileage: Joi.string(),
        transmission: Joi.string(),
        wav_type: Joi.string(),
        space: Joi.string(),
        stock_id: Joi.string(),
        fuel_type: Joi.string(),
        exterior_colour: Joi.string(),
        seating: Joi.string(),
        conversion: Joi.string(),
        features: Joi.array().items(Joi.string()),
        deletedImages: Joi.array().items(Joi.string()),
        status: Joi.string().valid('active', 'ended'),
        title: Joi.string(),
        description: Joi.string()
    })

    updateAdminSchema = Joi.object({
        owner: Joi.string(),
        featured: Joi.boolean(),
        price: Joi.string(),
        condition: Joi.string().valid('used', 'new', 'motability'),
        make: Joi.string(),
        models: Joi.string(),
        year: Joi.number(),
        body: Joi.string(),
        engine: Joi.number(),
        size: Joi.string(),
        entrance: Joi.string(),
        doors: Joi.string(),
        mileage: Joi.string(),
        transmission: Joi.string(),
        wav_type: Joi.string(),
        space: Joi.string(),
        stock_id: Joi.string(),
        fuel_type: Joi.string(),
        exterior_colour: Joi.string(),
        seating: Joi.string(),
        conversion: Joi.string(),
        features: Joi.array().items(Joi.string()),
        deletedImages: Joi.array().items(Joi.string()),
        status: Joi.string().valid('active', 'ended'),
        title: Joi.string(),
        description: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const wav_details = req.body.wav_details
        const features = req.body.features
        if (wav_details) {
            req.body.wav_details = JSON.parse(wav_details)
        }
        if (features) {
            req.body.features = JSON.parse(features)
        }
        if (role === 'admin') {
            const { error } = this.createAdminSchema.validate(req.body)
            if (error) return next(error)
        } else {
            const { error } = this.createSchema.validate(req.body)
            if (error) return next(error)
        }

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const deletedImages = req.body.deletedImages
        const features = req.body.features
        if (deletedImages) {
            req.body.deletedImages = JSON.parse(deletedImages)
        }
        if (features) {
            req.body.features = JSON.parse(features)
        }
        if (role === 'admin') {
            const { error } = this.updateAdminSchema.validate(req.body)
            if (error) return next(error)
        } else {
            const { error } = this.updateSchema.validate(req.body)
            if (error) return next(error)
        }

        next()
    })
}
