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
exports.ReviewController = void 0;
const main_1 = require("../storage/main");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
const appError_1 = __importDefault(require("../utils/appError"));
class ReviewController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const reviews = yield main_1.storage.review.findAll(req.query);
            res.status(200).json({
                success: true,
                data: {
                    reviews
                },
                message: (0, get_message_1.message)('reviews_getAll_200', lang)
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const review = yield main_1.storage.review.findOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                data: {
                    review
                }
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals;
            const user = yield main_1.storage.dealer.findOne({ _id: id });
            const dealer = yield main_1.storage.dealer.findOne({ _id: req.body.dealer_id });
            if (dealer.role !== "dealer") {
                return next(new appError_1.default(401, 'Incorrect dealer_id'));
            }
            req.body.name = user.name;
            const newReview = yield main_1.storage.review.create(req.body);
            res.status(201).json({
                success: true,
                data: {
                    newReview
                }
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            if ((role === 'user') && (req.params.id !== id)) {
                return next(new appError_1.default(401, 'auth_404'));
            }
            yield main_1.storage.review.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: null,
                message: (0, get_message_1.message)('review_delete_204', lang)
            });
        }));
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.js.map