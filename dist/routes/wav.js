"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wav_1 = require("../controllers/wav");
const wav_2 = require("../validators/wav");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new wav_1.WavController();
const validator = new wav_2.WavValidator();
const middleware = new auth_1.Middleware();
const upload = (0, multer_1.default)(['image/png', 'image/jpg', 'image/jpeg'], 400).array('images', 20);
router
    .route('/')
    .get(controller.getHome);
router
    .route('/details')
    .get(controller.getDetails);
router
    .route('/all')
    .post(controller.getAll);
router
    .route('/create')
    .post(upload, middleware.auth(['dealer', 'user', 'admin']), validator.create, controller.create);
router
    .route('/:id')
    .get(controller.getOne)
    .patch(upload, middleware.auth(['dealer', 'admin', 'user']), validator.update, controller.update)
    .delete(middleware.auth(['admin', 'dealer', 'user']), controller.delete);
exports.default = router;
//# sourceMappingURL=wav.js.map