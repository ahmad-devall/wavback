"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../config/config"));
const SENDGRID_API = config_1.default.SENDGRID_API;
class ContactController {
    constructor() {
        this.sendMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phoneNumber, email, message, subject } = req.body;
            mail_1.default.setApiKey(SENDGRID_API);
            const msg = {
                to: 'aziztokhirjonov@gmail.com',
                from: 'azizwebdev77@gmail.com',
                subject: subject,
                text: `First name: ${firstName}, Last name: ${lastName}, Phone number: ${phoneNumber}, Email: ${email}, Message: ${message}`,
                html: `<span><b style="color: black; ">First Name:</b> ${firstName} <br>
            <b style="color: black; ">Last Name:</b> ${lastName}<br>
            <b style="color: black; ">Phone Number:</b> ${phoneNumber}<br>
            <b style="color: black; ">Email:</b> ${email}<br>
            <b style="color: black; ">Message:</b> ${message}<br>
            </span>`,
            };
            mail_1.default
                .send(msg)
                .then(() => {
                res.json({
                    status: 'success'
                });
            })
                .catch((error) => {
                res.json({
                    status: 'failure'
                });
            });
        }));
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.js.map