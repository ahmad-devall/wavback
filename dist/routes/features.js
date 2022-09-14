"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const features_1 = require("../controllers/features");
const features_2 = require("../validators/features");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new features_1.FeaturesController();
const validator = new features_2.FeaturesValidator();
const middleware = new auth_1.Middleware();
router
    .route('/all')
    .get(controller.getAll);
router
    .route('/create')
    .post(middleware.auth(['admin']), validator.create, controller.create);
router
    .route('/:id')
    .get(controller.getOne)
    .patch(middleware.auth(['admin']), validator.update, controller.update)
    .delete(middleware.auth(['admin']), controller.delete);
exports.default = router;
//# sourceMappingURL=features.js.map