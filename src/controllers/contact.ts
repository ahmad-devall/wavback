import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import sgMail from '@sendgrid/mail'
import config from "../config/config"
const SENDGRID_API = config.SENDGRID_API

export class ContactController {
    sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, phoneNumber, email, message, subject } = req.body
        sgMail.setApiKey(SENDGRID_API)
        const msg = {
            to: 'aziztokhirjonov@gmail.com',// Change to your recipient
            from: 'azizwebdev77@gmail.com', // Change to your verified sender
            subject: subject,
            text: `First name: ${firstName}, Last name: ${lastName}, Phone number: ${phoneNumber}, Email: ${email}, Message: ${message}`,
            html: `<span><b style="color: black; ">First Name:</b> ${firstName} <br>
            <b style="color: black; ">Last Name:</b> ${lastName}<br>
            <b style="color: black; ">Phone Number:</b> ${phoneNumber}<br>
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
