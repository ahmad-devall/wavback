import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
import config from "../config/config"
const Stripe = require('stripe')(config.SECRET_KEY);
export class PaymentController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        let payments
        if ((role === 'user') || (role === 'dealer')) {
            payments = await storage.payment.findAll({ owner: id })
        } else {
            payments = await storage.payment.findAll(req.query)
        }


        res.status(200).json({
            success: true,
            data: {
                payments
            },
            message: message('payments_getAll_200', lang)
        })
    })

    pay = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        let status, error;
        let payAmount
        let payType
        const { token, amount, type } = req.body;
        try {
            await Stripe.charges.create({
                source: token.id,
                amount,
                currency: 'gbp',
            });
            const price = await storage.price.findAll(req.query)
            if (type === 'individual') {
                await storage.dealer.update(id, { coins: 1 })
                payAmount = price[0].individual
                payType = 'Individual'
            } else if (type === 'packeg_1') {
                await storage.dealer.update(id, { coins: 9 })
                payAmount = price[0].packeg_1
                payType = 'Packeg 1'
            } else if (type === 'packeg_2') {
                await storage.dealer.update(id, { coins: 24 })
                payAmount = price[0].packeg_2
                payType = 'Packeg 2'
            } else if (type === 'packeg_3') {
                await storage.dealer.update(id, { coins: 50 })
                payAmount = price[0].packeg_3
                payType = 'Packeg 2'
            }

            await storage.payment.create({ owner: id, type: payType, price: payAmount })
            status = 'success';
        } catch (error) {
            console.log(error);
            status = 'Failure';
        }
        res.json({ error, status });
    })
}
