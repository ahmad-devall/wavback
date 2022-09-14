"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const reviewSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    name: {
        type: String,
        required: true
    },
    dealer_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    customer_service: {
        type: Number,
        required: true
    },
    buying_process: {
        type: Number,
        required: true
    },
    overall_experience: {
        type: Number,
        required: true
    },
    recommendation: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
//# sourceMappingURL=Review.js.map