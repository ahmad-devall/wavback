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
exports.DealerController = void 0;
const main_1 = require("../storage/main");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const uuid_1 = require("uuid");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = require("fs/promises");
const get_message_1 = require("../locales/get_message");
const bcrypt_1 = require("bcrypt");
const auth_1 = require("../middleware/auth");
class DealerController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            let { postcode } = req.query;
            let search = {};
            if (postcode) {
                search = {
                    postcode: new RegExp(`^${postcode}`, 'i')
                };
            }
            delete req.query.postcode;
            const dealersInfo = yield main_1.storage.dealer.findAll(Object.assign(Object.assign({}, search), req.query));
            let dealers = [];
            for (let i = 0; i < dealersInfo.length; i++) {
                const reviews = yield main_1.storage.review.findAll({ dealer_id: dealersInfo[i]._id });
                const wavs_in_stock = yield (yield main_1.storage.wav.getAll({ owner: dealersInfo[i]._id })).length;
                let stars = 0;
                let customer_service = 0;
                let buying_process = 0;
                let overall_experience = 0;
                let rewievs_number = reviews.length;
                if (rewievs_number) {
                    for (let j = 0; j < rewievs_number; j++) {
                        customer_service += reviews[j].customer_service;
                        buying_process += reviews[j].buying_process;
                        overall_experience += reviews[j].overall_experience;
                    }
                }
                if (customer_service || buying_process || overall_experience) {
                    stars = Math.round((customer_service + buying_process + overall_experience) / (rewievs_number * 3));
                }
                let dealer = Object.assign(Object.assign({}, dealersInfo[i]._doc), { rewievs_number, stars, wavs_in_stock });
                dealers.push(dealer);
            }
            res.status(200).json({
                success: true,
                data: {
                    dealers
                },
                message: (0, get_message_1.message)('dealers_getAll_200', lang)
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let dealer = yield main_1.storage.dealer.findOne({ _id: id });
            const reviews = yield main_1.storage.review.findAll({ dealer_id: id });
            const wavs_in_stock = yield (yield main_1.storage.wav.getAll({ owner: id })).length;
            dealer = Object.assign(Object.assign({}, dealer._doc), { reviews, wavs_in_stock });
            res.status(200).json({
                success: true,
                data: {
                    dealer
                }
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)();
            req.body.password = yield (0, bcrypt_1.hash)(req.body.password, salt);
            req.body.logo = "";
            if (req.file) {
                const photo = `logo/${req.file.fieldname}-${(0, uuid_1.v4)()}.png`;
                yield (0, sharp_1.default)(req.file.buffer)
                    .png()
                    .toFile((0, path_1.join)(__dirname, '../../uploads', photo));
                req.body.logo = photo;
            }
            const newDealer = yield main_1.storage.dealer.create(req.body);
            const token = yield (0, auth_1.signToken)(newDealer.id, req.body.role);
            res.status(201).json({
                success: true,
                data: {
                    newDealer,
                    token
                }
            });
        }));
        this.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const { login, password } = req.body;
            let dealer = yield main_1.storage.dealer.findOne({ login });
            if (!(yield (0, bcrypt_1.compare)(password, dealer.password))) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            console.log(dealer);
            const token = yield (0, auth_1.signToken)(dealer.id, dealer.role);
            res.status(201).json({
                success: true,
                data: {
                    dealer,
                    token
                },
                message: (0, get_message_1.message)('dealer_logged_200', lang)
            });
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const { old_password, new_password } = req.body;
            const _id = req.params.id;
            delete req.query.old_password;
            delete req.query.new_password;
            if ((role === 'dealer' || role === 'user') && _id !== id) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            const dealer = yield main_1.storage.dealer.findOne({ _id });
            if (old_password) {
                if (!(yield (0, bcrypt_1.compare)(old_password, dealer.password))) {
                    return next(new appError_1.default(401, 'incorrect old password'));
                }
            }
            if (req.file) {
                const photo = `logo/${req.file.fieldname}-${(0, uuid_1.v4)()}.png`;
                yield (0, sharp_1.default)(req.file.buffer)
                    .png()
                    .toFile((0, path_1.join)(__dirname, '../../uploads', photo));
                if (dealer.logo !== "") {
                    yield (0, promises_1.unlink)((0, path_1.join)(__dirname, '../../uploads', dealer.logo));
                }
                req.body.logo = photo;
            }
            if (new_password) {
                const salt = yield (0, bcrypt_1.genSalt)();
                req.body.password = yield (0, bcrypt_1.hash)(new_password, salt);
            }
            let status = dealer.role;
            if (req.body.role) {
                status = req.body.role;
            }
            const updatedDealer = yield main_1.storage.dealer.update(req.params.id, req.body);
            const token = yield (0, auth_1.signToken)(dealer.id, status);
            res.status(200).json({
                success: true,
                data: {
                    updatedDealer,
                    token
                },
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const _id = req.params.id;
            if ((role === 'dealer' || role === 'user') && _id !== id) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            const dealer = yield main_1.storage.dealer.findOne({ _id });
            const wavs = yield main_1.storage.wav.findAll({ owner: _id });
            if (wavs) {
                for (let i = 0; i < wavs.length; i++) {
                    if (wavs[i].images) {
                        for (let j = 0; j < wavs[i].images.length; j++) {
                            yield (0, promises_1.unlink)((0, path_1.join)(__dirname, '../../uploads', wavs[i].images[j]));
                        }
                    }
                    yield main_1.storage.wav.delete(wavs[i]._id);
                }
            }
            if (dealer.logo !== "") {
                yield (0, promises_1.unlink)((0, path_1.join)(__dirname, '../../uploads', dealer.logo));
            }
            yield main_1.storage.dealer.delete(_id);
            res.status(200).json({
                success: true,
                data: null,
                message: (0, get_message_1.message)('dealer_delete_204', lang)
            });
        }));
    }
}
exports.DealerController = DealerController;
//# sourceMappingURL=dealer.js.map