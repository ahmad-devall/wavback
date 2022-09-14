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
exports.WavValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
class WavValidator {
    constructor() {
        this.createSchema = joi_1.default.object({
            owner: joi_1.default.forbidden(),
            featured: joi_1.default.forbidden(),
            price: joi_1.default.string().required(),
            condition: joi_1.default.string().valid('used', 'new', 'motability').required(),
            make: joi_1.default.string().required(),
            models: joi_1.default.string().required(),
            year: joi_1.default.number().required(),
            body: joi_1.default.string().required(),
            engine: joi_1.default.number().required(),
            size: joi_1.default.string().required(),
            entrance: joi_1.default.string().required(),
            doors: joi_1.default.string().required(),
            mileage: joi_1.default.string().required(),
            transmission: joi_1.default.string(),
            wav_type: joi_1.default.string().required(),
            space: joi_1.default.string().required(),
            stock_id: joi_1.default.string().required(),
            fuel_type: joi_1.default.string(),
            exterior_colour: joi_1.default.string().required(),
            seating: joi_1.default.string().required(),
            conversion: joi_1.default.string(),
            features: joi_1.default.array().items(joi_1.default.string()),
            status: joi_1.default.string().valid('active', 'ended'),
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required()
        });
        this.createAdminSchema = joi_1.default.object({
            owner: joi_1.default.string().required(),
            featured: joi_1.default.boolean(),
            price: joi_1.default.string().required(),
            condition: joi_1.default.string().valid('used', 'new', 'motability').required(),
            make: joi_1.default.string().required(),
            models: joi_1.default.string().required(),
            year: joi_1.default.number().required(),
            body: joi_1.default.string().required(),
            engine: joi_1.default.number().required(),
            size: joi_1.default.string().required(),
            entrance: joi_1.default.string().required(),
            doors: joi_1.default.string().required(),
            mileage: joi_1.default.string().required(),
            transmission: joi_1.default.string(),
            wav_type: joi_1.default.string().required(),
            space: joi_1.default.string().required(),
            stock_id: joi_1.default.string().required(),
            fuel_type: joi_1.default.string(),
            exterior_colour: joi_1.default.string().required(),
            seating: joi_1.default.string().required(),
            conversion: joi_1.default.string(),
            features: joi_1.default.array().items(joi_1.default.string()),
            status: joi_1.default.string().valid('active', 'ended'),
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required()
        });
        this.updateSchema = joi_1.default.object({
            price: joi_1.default.string(),
            featured: joi_1.default.forbidden(),
            condition: joi_1.default.string().valid('used', 'new', 'motability'),
            make: joi_1.default.string(),
            models: joi_1.default.string(),
            year: joi_1.default.number(),
            body: joi_1.default.string(),
            engine: joi_1.default.number(),
            size: joi_1.default.string(),
            entrance: joi_1.default.string(),
            doors: joi_1.default.string(),
            mileage: joi_1.default.string(),
            transmission: joi_1.default.string(),
            wav_type: joi_1.default.string(),
            space: joi_1.default.string(),
            stock_id: joi_1.default.string(),
            fuel_type: joi_1.default.string(),
            exterior_colour: joi_1.default.string(),
            seating: joi_1.default.string(),
            conversion: joi_1.default.string(),
            features: joi_1.default.array().items(joi_1.default.string()),
            deletedImages: joi_1.default.array().items(joi_1.default.string()),
            status: joi_1.default.string().valid('active', 'ended'),
            title: joi_1.default.string(),
            description: joi_1.default.string()
        });
        this.updateAdminSchema = joi_1.default.object({
            owner: joi_1.default.string(),
            featured: joi_1.default.boolean(),
            price: joi_1.default.string(),
            condition: joi_1.default.string().valid('used', 'new', 'motability'),
            make: joi_1.default.string(),
            models: joi_1.default.string(),
            year: joi_1.default.number(),
            body: joi_1.default.string(),
            engine: joi_1.default.number(),
            size: joi_1.default.string(),
            entrance: joi_1.default.string(),
            doors: joi_1.default.string(),
            mileage: joi_1.default.string(),
            transmission: joi_1.default.string(),
            wav_type: joi_1.default.string(),
            space: joi_1.default.string(),
            stock_id: joi_1.default.string(),
            fuel_type: joi_1.default.string(),
            exterior_colour: joi_1.default.string(),
            seating: joi_1.default.string(),
            conversion: joi_1.default.string(),
            features: joi_1.default.array().items(joi_1.default.string()),
            deletedImages: joi_1.default.array().items(joi_1.default.string()),
            status: joi_1.default.string().valid('active', 'ended'),
            title: joi_1.default.string(),
            description: joi_1.default.string()
        });
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const wav_details = req.body.wav_details;
            const features = req.body.features;
            if (wav_details) {
                req.body.wav_details = JSON.parse(wav_details);
            }
            if (features) {
                req.body.features = JSON.parse(features);
            }
            if (role === 'admin') {
                const { error } = this.createAdminSchema.validate(req.body);
                if (error)
                    return next(error);
            }
            else {
                const { error } = this.createSchema.validate(req.body);
                if (error)
                    return next(error);
            }
            next();
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const deletedImages = req.body.deletedImages;
            const features = req.body.features;
            if (deletedImages) {
                req.body.deletedImages = JSON.parse(deletedImages);
            }
            if (features) {
                req.body.features = JSON.parse(features);
            }
            if (role === 'admin') {
                const { error } = this.updateAdminSchema.validate(req.body);
                if (error)
                    return next(error);
            }
            else {
                const { error } = this.updateSchema.validate(req.body);
                if (error)
                    return next(error);
            }
            next();
        }));
    }
}
exports.WavValidator = WavValidator;
//# sourceMappingURL=wav.js.map