import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { message } from '../locales/get_message'
import { compare, hash, genSalt } from 'bcrypt'
import { signToken } from '../middleware/auth'

export class DealerController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        let { postcode } = req.query
        let search = {}
        if (postcode) {
            search = {
                postcode: new RegExp(`^${postcode}`, 'i')
            }
        }
        delete req.query.postcode
        const dealersInfo = await storage.dealer.findAll({ ...search, ...req.query })
        let dealers = []
        for (let i = 0; i < dealersInfo.length; i++) {
            const reviews = await storage.review.findAll({ dealer_id: dealersInfo[i]._id })
            const wavs_in_stock = await (await storage.wav.getAll({ owner: dealersInfo[i]._id })).length
            let stars = 0
            let customer_service = 0
            let buying_process = 0
            let overall_experience = 0
            let rewievs_number = reviews.length
            if (rewievs_number) {
                for (let j = 0; j < rewievs_number; j++) {
                    customer_service += reviews[j].customer_service
                    buying_process += reviews[j].buying_process
                    overall_experience += reviews[j].overall_experience
                }
            }
            if (customer_service || buying_process || overall_experience) {
                stars = Math.round((customer_service + buying_process + overall_experience) / (rewievs_number * 3))
            }
            let dealer = { ...dealersInfo[i]._doc, rewievs_number, stars, wavs_in_stock }
            dealers.push(dealer)
        }
        res.status(200).json({
            success: true,
            data: {
                dealers
            },
            message: message('dealers_getAll_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        let dealer = await storage.dealer.findOne({ _id: id })
        const reviews = await storage.review.findAll({ dealer_id: id })
        const wavs_in_stock = await (await storage.wav.getAll({ owner: id })).length
        dealer = { ...dealer._doc, reviews, wavs_in_stock }
        res.status(200).json({
            success: true,
            data: {
                dealer
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const salt = await genSalt()
        req.body.password = await hash(req.body.password, salt)
        req.body.logo = ""
        if (req.file) {
            const photo = `logo/${req.file.fieldname}-${uuidv4()}.png`

            await sharp(req.file.buffer)
                .png()
                .toFile(join(__dirname, '../../uploads', photo))

            req.body.logo = photo
        }
        const newDealer = await storage.dealer.create(req.body)
        const token = await signToken(newDealer.id, req.body.role)
        res.status(201).json({
            success: true,
            data: {
                newDealer,
                token
            }
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { login, password } = req.body

        let dealer = await storage.dealer.findOne({ login })

        if (!(await compare(password, dealer.password))) {
            return next(new AppError(401, 'auth_401'))
        }
        console.log(dealer)
        const token = await signToken(dealer.id, dealer.role)

        res.status(201).json({
            success: true,
            data: {
                dealer,
                token
            },
            message: message('dealer_logged_200', lang)
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const { old_password, new_password } = req.body
        const _id = req.params.id
        delete req.query.old_password
        delete req.query.new_password
        if ((role === 'dealer' || role === 'user') && _id !== id) {
            return next(new AppError(401, 'auth_401'))
        }
        const dealer = await storage.dealer.findOne({ _id })
        if (old_password) {
            if (!(await compare(old_password, dealer.password))) {
                return next(new AppError(401, 'incorrect old password'))
            }
        }
        if (req.file) {
            const photo = `logo/${req.file.fieldname}-${uuidv4()}.png`
            await sharp(req.file.buffer)
                .png()
                .toFile(join(__dirname, '../../uploads', photo))
            if (dealer.logo !== "") {
                await unlink(join(__dirname, '../../uploads', dealer.logo))
            }
            req.body.logo = photo
        }
        if (new_password) {
            const salt = await genSalt()
            req.body.password = await hash(new_password, salt)
        }
        let status = dealer.role
        if (req.body.role) {
            status = req.body.role
        }
        const updatedDealer = await storage.dealer.update(req.params.id, req.body)
        const token = await signToken(dealer.id, status)
        res.status(200).json({
            success: true,
            data: {
                updatedDealer,
                token
            },
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const _id = req.params.id
        if ((role === 'dealer' || role === 'user') && _id !== id) {
            return next(new AppError(401, 'auth_401'))
        }
        const dealer = await storage.dealer.findOne({ _id })
        const wavs = await storage.wav.findAll({ owner: _id })

        if (wavs) {
            for (let i = 0; i < wavs.length; i++) {
                if (wavs[i].images) {
                    for (let j = 0; j < wavs[i].images.length; j++) {
                        await unlink(join(__dirname, '../../uploads', wavs[i].images[j]))
                    }
                }
                await storage.wav.delete(wavs[i]._id)
            }
        }
        if (dealer.logo !== "") {
            await unlink(join(__dirname, '../../uploads', dealer.logo))
        }
        await storage.dealer.delete(_id)
        res.status(200).json({
            success: true,
            data: null,
            message: message('dealer_delete_204', lang)
        })
    })
}
