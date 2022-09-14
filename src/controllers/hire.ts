import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import sgMail from '@sendgrid/mail'
import config from "../config/config"
const SENDGRID_API = config.SENDGRID_API

export class HireController {
    hireWav = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { size, duration, startDate, email, name, postCode, phone, message, subject } = req.body
        sgMail.setApiKey(SENDGRID_API)
        const msg = {
            to: 'aziztokhirjonov@gmail.com',// Change to your recipient
            from: 'azizwebdev77@gmail.com', // Change to your verified sender
            subject: subject,
            text: `Hire wav`,
            html: `<span><b style="color: black; ">Email:</b> ${email} <br>
            <b style="color: black; ">Name:</b> ${name}<br>
            <b style="color: black; ">Phone Number:</b> ${phone}<br>
            <b style="color: black; ">Post Code:</b> ${postCode}<br>
            <b style="color: black; ">Size:</b> ${size}<br>
            <b style="color: black; ">Duration:</b> ${duration}<br>
            <b style="color: black; ">Start Date:</b> ${startDate}<br>
            <b style="color: black; ">message:</b> ${message}<br>
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
