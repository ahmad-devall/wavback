"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const priceSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    individual: {
        type: String,
        required: true
    },
    packeg_1: {
        type: String,
        required: true
    },
    packeg_2: {
        type: String,
        required: true
    },
    packeg_3: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Price', priceSchema);
//# sourceMappingURL=Price.js.map