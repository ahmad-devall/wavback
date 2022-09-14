"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const admin_2 = require("../validators/admin");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new admin_1.AdminController();
const validator = new admin_2.AdminValidator();
const middleware = new auth_1.Middleware();
router
    .route('/all')
    .get(middleware.auth(['admin']), controller.getAll);
router
    .route('/create')
    .post(validator.create, controller.create);
router
    .route('/login')
    .post(validator.login, controller.login);
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.getOne)
    .delete(middleware.auth(['admin']), controller.delete);
exports.default = router;
//# sourceMappingURL=admin.js.map