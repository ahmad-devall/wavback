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
exports.PriceController = void 0;
const main_1 = require("../storage/main");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
class PriceController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const price = yield main_1.storage.price.findAll(req.query);
            res.status(200).json({
                success: true,
                data: {
                    price
                },
                message: (0, get_message_1.message)('price_getAll_200', lang)
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            yield main_1.storage.admin.findOne({ _id: id });
            const newPrice = yield main_1.storage.price.create(req.body);
            res.status(201).json({
                success: true,
                data: {
                    newPrice
                }
            });
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            yield main_1.storage.admin.findOne({ _id: id });
            const updatedPrice = yield main_1.storage.price.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: {
                    updatedPrice
                }
            });
        }));
    }
}
exports.PriceController = PriceController;
//# sourceMappingURL=price.js.map