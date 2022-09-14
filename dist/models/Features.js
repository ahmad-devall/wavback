"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const featuresSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    title: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Number,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Features', featuresSchema);
//# sourceMappingURL=Features.js.map