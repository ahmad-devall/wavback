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
exports.FeaturesController = void 0;
const main_1 = require("../storage/main");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
class FeaturesController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const features = yield main_1.storage.features.findAll(req.query);
            res.status(200).json({
                success: true,
                data: {
                    features
                },
                message: (0, get_message_1.message)('feature_getAll_200', lang)
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const feature = yield main_1.storage.features.findOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                data: {
                    feature
                }
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            yield main_1.storage.admin.findOne({ _id: id });
            const newFeature = yield main_1.storage.features.create(req.body);
            res.status(201).json({
                success: true,
                data: {
                    newFeature
                }
            });
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            yield main_1.storage.admin.findOne({ _id: id });
            const updatedFeature = yield main_1.storage.features.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: {
                    updatedFeature
                }
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id } = res.locals;
            yield main_1.storage.admin.findOne({ _id: id });
            yield main_1.storage.features.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: null,
                message: (0, get_message_1.message)('feature_delete_204', lang)
            });
        }));
    }
}
exports.FeaturesController = FeaturesController;
//# sourceMappingURL=features.js.map