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
exports.DealerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
class DealerValidator {
    constructor() {
        this.createSchema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            login: joi_1.default.string().required(),
            password: joi_1.default.string().min(8).max(30).required(),
            phone_number: joi_1.default.string().required(),
            address: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            about_us: joi_1.default.string(),
            postcode: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            map_link: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            links: joi_1.default.object({
                web_site: joi_1.default.string(),
                facebook: joi_1.default.string(),
                twitter: joi_1.default.string(),
                youtube: joi_1.default.string()
            }),
            coins: joi_1.default.forbidden(),
            role: joi_1.default.string().valid('user', 'dealer').required(),
            status: joi_1.default.string().valid('active', 'ended')
        });
        this.createAdminSchema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            login: joi_1.default.string().required(),
            password: joi_1.default.string().min(8).max(30).required(),
            phone_number: joi_1.default.string().required(),
            address: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            about_us: joi_1.default.string(),
            postcode: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            map_link: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            links: joi_1.default.object({
                web_site: joi_1.default.string(),
                facebook: joi_1.default.string(),
                twitter: joi_1.default.string(),
                youtube: joi_1.default.string()
            }),
            coins: joi_1.default.number(),
            role: joi_1.default.string().valid('user', 'dealer').required(),
            status: joi_1.default.string().valid('active', 'ended')
        });
        this.loginSchema = joi_1.default.object({
            login: joi_1.default.string().required(),
            password: joi_1.default.string().min(8).max(30).required()
        });
        this.updateSchema = joi_1.default.object({
            name: joi_1.default.string(),
            email: joi_1.default.string().email(),
            login: joi_1.default.string(),
            old_password: joi_1.default.string().min(8).max(30).when('new_password', {
                is: joi_1.default.exist(), then: joi_1.default.required(), otherwise: joi_1.default.forbidden()
            }),
            new_password: joi_1.default.string().min(8).max(30),
            phone_number: joi_1.default.string(),
            address: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            about_us: joi_1.default.string(),
            postcode: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            map_link: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            links: joi_1.default.object({
                web_site: joi_1.default.string(),
                facebook: joi_1.default.string(),
                twitter: joi_1.default.string(),
                youtube: joi_1.default.string()
            }),
            coins: joi_1.default.forbidden(),
            role: joi_1.default.string().valid('user', 'dealer'),
            status: joi_1.default.string().valid('active', 'ended')
        });
        this.updateAdminSchema = joi_1.default.object({
            name: joi_1.default.string(),
            email: joi_1.default.string().email(),
            login: joi_1.default.string(),
            new_password: joi_1.default.string().min(8).max(30),
            phone_number: joi_1.default.string(),
            address: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            about_us: joi_1.default.string(),
            postcode: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            map_link: joi_1.default.string().when('role', {
                is: 'dealer',
                then: joi_1.default.required()
            }),
            links: joi_1.default.object({
                web_site: joi_1.default.string(),
                facebook: joi_1.default.string(),
                twitter: joi_1.default.string(),
                youtube: joi_1.default.string()
            }),
            coins: joi_1.default.number(),
            role: joi_1.default.string().valid('user', 'dealer'),
            status: joi_1.default.string().valid('active', 'ended')
        });
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const links = req.body.links;
            if (links) {
                req.body.links = JSON.parse(links);
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
        this.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { error } = this.loginSchema.validate(req.body);
            if (error)
                return next(error);
            next();
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang, id, role } = res.locals;
            const links = req.body.links;
            if (links) {
                req.body.links = JSON.parse(links);
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
exports.DealerValidator = DealerValidator;
//# sourceMappingURL=dealer.js.map