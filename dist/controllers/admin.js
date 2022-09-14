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
exports.AdminController = void 0;
const main_1 = require("../storage/main");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
const bcrypt_1 = require("bcrypt");
const auth_1 = require("../middleware/auth");
class AdminController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const admins = yield main_1.storage.admin.findAll(req.query);
            res.status(200).json({
                success: true,
                data: {
                    admins
                },
                message: (0, get_message_1.message)('admins_getAll_200', lang)
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield main_1.storage.admin.findOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                data: {
                    admin
                }
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)();
            req.body.password = yield (0, bcrypt_1.hash)(req.body.password, salt);
            const newAdmin = yield main_1.storage.admin.create(req.body);
            res.status(201).json({
                success: true,
                data: {
                    newAdmin
                }
            });
        }));
        this.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const { login, password } = req.body;
            let admin = yield main_1.storage.admin.findOne({ login });
            if (!(yield (0, bcrypt_1.compare)(password, admin.password))) {
                return next(new appError_1.default(401, 'auth_401'));
            }
            const token = yield (0, auth_1.signToken)(admin.id, 'admin');
            res.status(201).json({
                success: true,
                data: {
                    admin,
                    token
                },
                message: (0, get_message_1.message)('dealer_logged_200', lang)
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            yield main_1.storage.admin.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: null,
                message: (0, get_message_1.message)('admin_delete_204', lang)
            });
        }));
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.js.map