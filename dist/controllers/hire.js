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
exports.HireController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const config_1 = __importDefault(require("../config/config"));
const SENDGRID_API = config_1.default.SENDGRID_API;
class HireController {
    constructor() {
        this.hireWav = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { size, duration, startDate, email, name, postCode, phone, message, subject } = req.body;
            mail_1.default.setApiKey(SENDGRID_API);
            const msg = {
                to: 'aziztokhirjonov@gmail.com',
                from: 'azizwebdev77@gmail.com',
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
exports.HireController = HireController;
//# sourceMappingURL=hire.js.map