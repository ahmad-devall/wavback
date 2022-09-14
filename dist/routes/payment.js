"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controllers/payment");
const payment_2 = require("../validators/payment");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new payment_1.PaymentController();
const validator = new payment_2.PaymentValidator();
const middleware = new auth_1.Middleware();
router
    .route('/all')
    .get(middleware.auth(['dealer', 'user', 'admin',]), controller.getAll);
router
    .route('/pay')
    .post(middleware.auth(['dealer', 'user',]), controller.pay);
exports.default = router;
//# sourceMappingURL=payment.js.map