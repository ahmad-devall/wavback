"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../controllers/contact");
const contact_2 = require("../validators/contact");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new contact_1.ContactController();
const validator = new contact_2.ContactValidator();
router
    .route('/create')
    .post(validator.create, controller.sendMessage);
exports.default = router;
//# sourceMappingURL=contact.js.map