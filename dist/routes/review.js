"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_1 = require("../controllers/review");
const review_2 = require("../validators/review");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new review_1.ReviewController();
const validator = new review_2.ReviewValidator();
const middleware = new auth_1.Middleware();
router
    .route('/all')
    .get(controller.getAll);
router
    .route('/create')
    .post(validator.create, middleware.auth(['user']), controller.create);
router
    .route('/:id')
    .get(controller.getOne)
    .delete(middleware.auth(['admin', 'user']), controller.delete);
exports.default = router;
//# sourceMappingURL=review.js.map