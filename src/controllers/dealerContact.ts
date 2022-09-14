import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import sgMail from '@sendgrid/mail'
import config from "../config/config"
const SENDGRID_API = config.SENDGRID_API

export class DealerContactController {
    sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name, phone, email, message, subject, toEmail } = req.body
        sgMail.setApiKey(SENDGRID_API)
        const msg = {
            to: toEmail,// Change to your recipient
            from: 'azizwebdev77@gmail.com', // Change to your verified sender
            subject: subject,
            text: `Dealer Contact`,
            html: `<span><b style="color: black; ">Name:</b> ${name} <br>
            <b style="color: black; ">Phone Number:</b> ${phone}<br>
            <b style="color: black; ">Email:</b> ${email}<br>
            <b style="color: black; ">Message:</b> ${message}<br>
            </span>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                res.json({
                    status: 'success'
                })
            })
            .catch((error) => {
                res.json({
                    status: 'failure'
                })
            })
    })
}
