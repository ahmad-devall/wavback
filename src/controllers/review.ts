import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
import AppError from '../utils/appError'


export class ReviewController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const reviews = await storage.review.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                reviews
            },
            message: message('reviews_getAll_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const review = await storage.review.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                review
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        const user = await storage.dealer.findOne({ _id: id })
        const dealer = await storage.dealer.findOne({ _id: req.body.dealer_id })
        if (dealer.role !== "dealer") {
            return next(new AppError(401, 'Incorrect dealer_id'))
        }
        req.body.name = user.name
        const newReview = await storage.review.create(req.body)
        res.status(201).json({
            success: true,
            data: {
                newReview
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        if ((role === 'user') && (req.params.id !== id)) {
            return next(new AppError(401, 'auth_404'))
        }
        await storage.review.delete(req.params.id)

        res.status(200).json({
            success: true,
            data: null,
            message: message('review_delete_204', lang)
        })
    })
}
