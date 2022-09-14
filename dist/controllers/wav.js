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
exports.WavController = void 0;
const main_1 = require("../storage/main");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const uuid_1 = require("uuid");
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = require("fs/promises");
const get_message_1 = require("../locales/get_message");
class WavController {
    constructor() {
        this.getHome = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const wavs = yield main_1.storage.wav.findHome(req.query);
            res.status(200).json({
                success: true,
                data: {
                    wavs
                },
                message: (0, get_message_1.message)('wavs_getAll_200', lang)
            });
        }));
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            let features = [];
            if (req.body.features) {
                features = req.body.features;
            }
            let wavs = [];
            const allWavs = yield main_1.storage.wav.findAll(req.query);
            if (allWavs) {
                for (let i = 0; i < allWavs.length; i++) {
                    let op = features.every(element => allWavs[i].features.indexOf(element) > -1);
                    if (op) {
                        wavs.push(allWavs[i]);
                    }
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    wavs
                },
                message: (0, get_message_1.message)('wavs_getAll_200', lang)
            });
        }));
        this.getDetails = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const wavs = yield main_1.storage.wav.getAll(req.query);
            const make = [];
            const model = [];
            const price = [];
            const body = [];
            const size = [];
            const entrance = [];
            const doors = [];
            const mileage = [];
            const year = [];
            const transmission = [];
            const seating = [];
            for (let i = 0; i < wavs.length; i++) {
                if (!make.includes(wavs[i].make)) {
                    make.push(wavs[i].make);
                }
                if (!model.includes(wavs[i].models)) {
                    model.push(wavs[i].models);
                }
                if (!price.includes(wavs[i].price)) {
                    price.push(wavs[i].price);
                }
                if (!body.includes(wavs[i].body)) {
                    body.push(wavs[i].body);
                }
                if (!size.includes(wavs[i].size)) {
                    size.push(wavs[i].size);
                }
                if (!entrance.includes(wavs[i].entrance)) {
                    entrance.push(wavs[i].entrance);
                }
                if (!doors.includes(wavs[i].doors)) {
                    doors.push(wavs[i].doors);
                }
                if (!mileage.includes(wavs[i].mileage)) {
                    mileage.push(wavs[i].mileage);
                }
                if (!year.includes(wavs[i].year)) {
                    year.push(wavs[i].year);
                }
                if (!transmission.includes(wavs[i].transmission)) {
                    transmission.push(wavs[i].transmission);
                }
                if (!seating.includes(wavs[i].seating)) {
                    seating.push(wavs[i].seating);
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    make,
                    model,
                    price,
                    body,
                    size,
                    entrance,
                    doors,
                    mileage,
                    year,
                    transmission,
                    seating
                }
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const wav = yield main_1.storage.wav.findOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                data: {
                    wav
                }
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            if (role !== 'admin') {
                let dealer = yield main_1.storage.dealer.findOne({ _id: id });
                if (dealer.coins === 0) {
                    return next(new appError_1.default(401, 'you do not have enough coins'));
                }
                req.body.owner = id;
            }
            else {
                yield main_1.storage.dealer.findOne({ _id: req.body.owner });
            }
            req.body.images = [];
            if (req.files) {
                const imageFiles = [];
                const url = req.files;
                for (let i = 0; i < url.length; i++) {
                    const image = `images/${url[i].fieldname}-${(0, uuid_1.v4)()}.png`;
                    yield (0, sharp_1.default)(url[i].buffer)
                        .png()
                        .toFile((0, path_1.join)(__dirname, '../../uploads', image));
                    imageFiles.push(image);
                }
                req.body.images = imageFiles;
            }
            const wav = yield main_1.storage.wav.create(req.body);
            if (role !== 'admin') {
                yield main_1.storage.dealer.update(id, { $inc: { coins: -1 } });
            }
            res.status(201).json({
                success: true,
                data: {
                    wav
                }
            });
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const { deletedImages } = req.body;
            const _id = req.params.id;
            const wav = yield main_1.storage.wav.find({ _id });
            if ((role === 'dealer' || role === 'user') && (id !== wav.owner)) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            else if ((role === 'admin') && ((req.body.owner !== 'null') && (req.body.owner !== null)) && (req.body.owner)) {
                yield main_1.storage.dealer.findOne({ _id: req.body.owner });
            }
            else if ((role === 'admin') && ((req.body.owner === 'null') || (req.body.owner === null))) {
                return next(new appError_1.default(403, 'wrong owner!'));
            }
            const imageFiles = wav.images;
            if (deletedImages) {
                for (let i = 0; i < deletedImages.length; i++) {
                    yield (0, promises_1.unlink)((0, path_1.join)(__dirname, '../../uploads', deletedImages[i]));
                    for (let j = 0; j < imageFiles.length; j++) {
                        if (deletedImages[i] === imageFiles[j]) {
                            imageFiles.splice(j, 1);
                        }
                    }
                }
            }
            if (req.files) {
                const url = req.files;
                for (let i = 0; i < url.length; i++) {
                    const image = `images/${url[i].fieldname}-${(0, uuid_1.v4)()}.png`;
                    yield (0, sharp_1.default)(url[i].buffer)
                        .png()
                        .toFile((0, path_1.join)(__dirname, '../../uploads', image));
                    imageFiles.push(image);
                }
            }
            req.body.images = imageFiles;
            const updatedWav = yield main_1.storage.wav.update(_id, req.body);
            res.status(200).json({
                success: true,
                data: {
                    updatedWav
                }
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const _id = req.params.id;
            const wav = yield main_1.storage.wav.find({ _id });
            if ((role === 'dealer' || role === 'user') && wav.owner !== id) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            yield main_1.storage.wav.delete(_id);
            const wavImages = wav.images;
            if (wavImages !== []) {
                for (let i = 0; i < wavImages.length; i++) {
                    yield (0, promises_1.unlink)((0, path_1.join)(__dirname, '../../uploads', wavImages[i]));
                }
            }
            res.status(200).json({
                success: true,
                data: null,
                message: (0, get_message_1.message)('wav_delete_204', lang)
            });
        }));
    }
}
exports.WavController = WavController;
//# sourceMappingURL=wav.js.map