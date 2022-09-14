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
exports.PaymentController = void 0;
const main_1 = require("../storage/main");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
const config_1 = __importDefault(require("../config/config"));
const Stripe = require('stripe')(config_1.default.SECRET_KEY);
class PaymentController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            let payments;
            if ((role === 'user') || (role === 'dealer')) {
                payments = yield main_1.storage.payment.findAll({ owner: id });
            }
            else {
                payments = yield main_1.storage.payment.findAll(req.query);
            }
            res.status(200).json({
                success: true,
                data: {
                    payments
                },
                message: (0, get_message_1.message)('payments_getAll_200', lang)
            });
        }));
        this.pay = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            let status, error;
            let payAmount;
            let payType;
            const { token, amount, type } = req.body;
            try {
                yield Stripe.charges.create({
                    source: token.id,
                    amount,
                    currency: 'gbp',
                });
                const price = yield main_1.storage.price.findAll(req.query);
                if (type === 'individual') {
                    yield main_1.storage.dealer.update(id, { coins: 1 });
                    payAmount = price[0].individual;
                    payType = 'Individual';
                }
                else if (type === 'packeg_1') {
                    yield main_1.storage.dealer.update(id, { coins: 9 });
                    payAmount = price[0].packeg_1;
                    payType = 'Packeg 1';
                }
                else if (type === 'packeg_2') {
                    yield main_1.storage.dealer.update(id, { coins: 24 });
                    payAmount = price[0].packeg_2;
                    payType = 'Packeg 2';
                }
                else if (type === 'packeg_3') {
                    yield main_1.storage.dealer.update(id, { coins: 50 });
                    payAmount = price[0].packeg_3;
                    payType = 'Packeg 2';
                }
                yield main_1.storage.payment.create({ owner: id, type: payType, price: payAmount });
                status = 'success';
            }
            catch (error) {
                console.log(error);
                status = 'Failure';
            }
            res.json({ error, status });
        }));
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.js.map