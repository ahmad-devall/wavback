import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { message } from '../locales/get_message'

export class WavController {
    getHome = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const wavs = await storage.wav.findHome(req.query)

        res.status(200).json({
            success: true,
            data: {
                wavs
            },
            message: message('wavs_getAll_200', lang)
        })
    })

    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        let features: any[] = []
        if (req.body.features) {
            features = req.body.features
        }
        let wavs: any[] = []
        const allWavs = await storage.wav.findAll(req.query)
        if (allWavs) {
            for (let i = 0; i < allWavs.length; i++) {
                let op = features.every(element => allWavs[i].features.indexOf(element) > -1);
                if (op) {
                    wavs.push(allWavs[i])
                }
            }
        }
        res.status(200).json({
            success: true,
            data: {
                wavs
            },
            message: message('wavs_getAll_200', lang)
        })
    })

    getDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const wavs = await storage.wav.getAll(req.query)
        const make: string[] = []
        const model: string[] = []
        const price: string[] = []
        const body: string[] = []
        const size: string[] = []
        const entrance: string[] = []
        const doors: string[] = []
        const mileage: string[] = []
        const year: number[] = []
        const transmission: string[] = []
        const seating: string[] = []

        for (let i = 0; i < wavs.length; i++) {
            if (!make.includes(wavs[i].make)) {
                make.push(wavs[i].make)
            }
            if (!model.includes(wavs[i].models)) {
                model.push(wavs[i].models)
            }
            if (!price.includes(wavs[i].price)) {
                price.push(wavs[i].price)
            }
            if (!body.includes(wavs[i].body)) {
                body.push(wavs[i].body)
            }
            if (!size.includes(wavs[i].size)) {
                size.push(wavs[i].size)
            }
            if (!entrance.includes(wavs[i].entrance)) {
                entrance.push(wavs[i].entrance)
            }
            if (!doors.includes(wavs[i].doors)) {
                doors.push(wavs[i].doors)
            }
            if (!mileage.includes(wavs[i].mileage)) {
                mileage.push(wavs[i].mileage)
            }
            if (!year.includes(wavs[i].year)) {
                year.push(wavs[i].year)
            }
            if (!transmission.includes(wavs[i].transmission)) {
                transmission.push(wavs[i].transmission)
            }
            if (!seating.includes(wavs[i].seating)) {
                seating.push(wavs[i].seating)
            }
        }
        res.status(200).json({
            success: true,
            data: {
                make,
                model,
                price,
                body,
                size,
                entrance,
                doors,
                mileage,
                year,
                transmission,
                seating
            }
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const wav = await storage.wav.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                wav
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        if (role !== 'admin') {
            let dealer = await storage.dealer.findOne({ _id: id })
            if (dealer.coins === 0) {
                return next(new AppError(401, 'you do not have enough coins'))
            }
            req.body.owner = id
        } else {
            await storage.dealer.findOne({ _id: req.body.owner })
        }

        req.body.images = []
        if (req.files) {
            const imageFiles: string[] = []
            const url = req.files as Array<Express.Multer.File>
            for (let i = 0; i < url.length; i++) {
                const image = `images/${url[i].fieldname}-${uuidv4()}.png`
                await sharp(url[i].buffer)
                    .png()
                    .toFile(join(__dirname, '../../uploads', image));
                imageFiles.push(image);
            }
            req.body.images = imageFiles
        }

        const wav = await storage.wav.create(req.body)
        if (role !== 'admin') {
            await storage.dealer.update(id, { $inc: { coins: -1 } })
        }
        res.status(201).json({
            success: true,
            data: {
                wav
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const { deletedImages } = req.body
        const _id = req.params.id
        const wav = await storage.wav.find({ _id })
        if ((role === 'dealer' || role === 'user') && (id !== wav.owner)) {
            return next(new AppError(401, 'auth_401'))
        } else if ((role === 'admin') && ((req.body.owner !== 'null') && (req.body.owner !== null)) && (req.body.owner)) {
            await storage.dealer.findOne({ _id: req.body.owner })
        } else if ((role === 'admin') && ((req.body.owner === 'null') || (req.body.owner === null))) {
            return next(new AppError(403, 'wrong owner!'))
        }
        const imageFiles = wav.images
        if (deletedImages) {
            for (let i = 0; i < deletedImages.length; i++) {
                await unlink(join(__dirname, '../../uploads', deletedImages[i]))
                for (let j = 0; j < imageFiles.length; j++) {
                    if (deletedImages[i] === imageFiles[j]) {
                        imageFiles.splice(j, 1)
                    }
                }
            }
        }
        if (req.files) {
            const url = req.files as Array<Express.Multer.File>
            for (let i = 0; i < url.length; i++) {
                const image = `images/${url[i].fieldname}-${uuidv4()}.png`
                await sharp(url[i].buffer)
                    .png()
                    .toFile(join(__dirname, '../../uploads', image));
                imageFiles.push(image);
            }
        }
        req.body.images = imageFiles
        const updatedWav = await storage.wav.update(_id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updatedWav
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const _id = req.params.id
        const wav = await storage.wav.find({ _id })
        if ((role === 'dealer' || role === 'user') && wav.owner !== id) {
            return next(new AppError(401, 'auth_401'))
        }
        await storage.wav.delete(_id)
        const wavImages = wav.images
        if (wavImages === []) {
            for (let i = 0; i < wavImages.length; i++) {
                await unlink(join(__dirname, '../../uploads', wavImages[i]))
            }
        }
        res.status(200).json({
            success: true,
            data: null,
            message: message('wav_delete_204', lang)
        })
    })
}
