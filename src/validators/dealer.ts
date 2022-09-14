import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class DealerValidator {
    private createSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        login: Joi.string().required(),
        password: Joi.string().min(8).max(30).required(),
        phone_number: Joi.string().required(),
        address: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        about_us: Joi.string(),
        postcode: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        map_link: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        links: Joi.object({
            web_site: Joi.string(),
            facebook: Joi.string(),
            twitter: Joi.string(),
            youtube: Joi.string()
        }),
        coins: Joi.forbidden(),
        role: Joi.string().valid('user', 'dealer').required(),
        status: Joi.string().valid('active', 'ended')
    })

    private createAdminSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        login: Joi.string().required(),
        password: Joi.string().min(8).max(30).required(),
        phone_number: Joi.string().required(),
        address: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        about_us: Joi.string(),
        postcode: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        map_link: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        links: Joi.object({
            web_site: Joi.string(),
            facebook: Joi.string(),
            twitter: Joi.string(),
            youtube: Joi.string()
        }),
        coins: Joi.number(),
        role: Joi.string().valid('user', 'dealer').required(),
        status: Joi.string().valid('active', 'ended')
    })

    private loginSchema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().min(8).max(30).required()
    })

    private updateSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        login: Joi.string(),
        old_password: Joi.string().min(8).max(30).when('new_password', {
            is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden()
        }),
        new_password: Joi.string().min(8).max(30),
        phone_number: Joi.string(),
        address: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        about_us: Joi.string(),
        postcode: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        map_link: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        links: Joi.object({
            web_site: Joi.string(),
            facebook: Joi.string(),
            twitter: Joi.string(),
            youtube: Joi.string()
        }),
        coins: Joi.forbidden(),
        role: Joi.string().valid('user', 'dealer'),
        status: Joi.string().valid('active', 'ended')
    })

    private updateAdminSchema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        login: Joi.string(),
        new_password: Joi.string().min(8).max(30),
        phone_number: Joi.string(),
        address: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        about_us: Joi.string(),
        postcode: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        map_link: Joi.string().when('role', {
            is: 'dealer',
            then: Joi.required()
        }),
        links: Joi.object({
            web_site: Joi.string(),
            facebook: Joi.string(),
            twitter: Joi.string(),
            youtube: Joi.string()
        }),
        coins: Joi.number(),
        role: Joi.string().valid('user', 'dealer'),
        status: Joi.string().valid('active', 'ended')
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const links = req.body.links
        if (links) {
            req.body.links = JSON.parse(links)
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

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const links = req.body.links
        if (links) {
            req.body.links = JSON.parse(links)
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