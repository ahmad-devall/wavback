"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const price_1 = require("../controllers/price");
const price_2 = require("../validators/price");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new price_1.PriceController();
const validator = new price_2.PriceValidator();
const middleware = new auth_1.Middleware();
router
    .route('/get')
    .get(controller.getAll);
router
    .route('/create')
    .post(middleware.auth(['admin']), controller.create);
router
    .route('/:id')
    .patch(middleware.auth(['admin',]), validator.update, controller.update);
exports.default = router;
//# sourceMappingURL=price.js.map