"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dealerContact_1 = require("../controllers/dealerContact");
const dealerContact_2 = require("../validators/dealerContact");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new dealerContact_1.DealerContactController();
const validator = new dealerContact_2.DealerContactValidator();
router
    .route('/create')
    .post(validator.create, controller.sendMessage);
exports.default = router;
//# sourceMappingURL=dealerContact.js.map