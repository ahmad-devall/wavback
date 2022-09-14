"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dealer_1 = require("../controllers/dealer");
const dealer_2 = require("../validators/dealer");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new dealer_1.DealerController();
const validator = new dealer_2.DealerValidator();
const middleware = new auth_1.Middleware();
const upload = (0, multer_1.default)(['image/png', 'image/jpg', 'image/jpeg'], 20).single('logo');
router
    .route('/all')
    .get(controller.getAll);
router
    .route('/create')
    .post(upload, validator.create, controller.create);
router
    .route('/login')
    .post(validator.login, controller.login);
router
    .route('/:id')
    .get(controller.getOne)
    .patch(upload, middleware.auth(['admin', 'dealer', 'user']), validator.update, controller.update)
    .delete(middleware.auth(['admin', 'dealer', 'user']), controller.delete);
exports.default = router;
//# sourceMappingURL=dealer.js.map