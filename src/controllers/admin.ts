import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
import { compare, hash, genSalt } from 'bcrypt'
import { signToken } from '../middleware/auth'


export class AdminController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const admins = await storage.admin.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                admins
            },
            message: message('admins_getAll_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const admin = await storage.admin.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                admin
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const salt = await genSalt()
        req.body.password = await hash(req.body.password, salt)
        const newAdmin = await storage.admin.create(req.body)
        res.status(201).json({
            success: true,
            data: {
                newAdmin
            }
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { login, password } = req.body

        let admin = await storage.admin.findOne({ login })

        if (!(await compare(password, admin.password))) {
            return next(new AppError(401, 'auth_401'))
        }

        const token = await signToken(admin.id, 'admin')

        res.status(201).json({
            success: true,
            data: {
                admin,
                token
            },
            message: message('dealer_logged_200', lang)
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        await storage.admin.delete(req.params.id)

        res.status(200).json({
            success: true,
            data: null,
            message: message('admin_delete_204', lang)
        })
    })
}
