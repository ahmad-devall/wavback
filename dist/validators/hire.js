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
exports.HireValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
class HireValidator {
    constructor() {
        this.createSchema = joi_1.default.object({
            size: joi_1.default.string().required(),
            duration: joi_1.default.string().required(),
            startDate: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            name: joi_1.default.string().required(),
            postCode: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            subject: joi_1.default.string().required(),
            message: joi_1.default.string().required()
        });
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = this.createSchema.validate(req.body);
            if (error)
                return next(error);
            next();
        }));
    }
}
exports.HireValidator = HireValidator;
//# sourceMappingURL=hire.js.map