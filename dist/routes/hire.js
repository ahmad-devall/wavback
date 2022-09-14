"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hire_1 = require("../controllers/hire");
const hire_2 = require("../validators/hire");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new hire_1.HireController();
const validator = new hire_2.HireValidator();
router
    .route('/create')
    .post(validator.create, controller.hireWav);
exports.default = router;
//# sourceMappingURL=hire.js.map