"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const wavSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    owner: {
        type: String,
        ref: 'Dealer',
        required: true
    },
    images: {
        type: [String]
    },
    price: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['used', 'new', 'motability'],
        required: true
    },
    make: {
        type: String,
        required: true
    },
    models: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    engine: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    entrance: {
        type: String,
        required: true,
    },
    doors: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
    },
    wav_type: {
        type: String,
        required: true,
    },
    space: {
        type: String,
        required: true,
    },
    stock_id: {
        type: String,
        required: true,
    },
    fuel_type: {
        type: String,
    },
    exterior_colour: {
        type: String,
        required: true,
    },
    seating: {
        type: String,
        required: true,
    },
    conversion: {
        type: String,
    },
    features: {
        type: [String]
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },
    title: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        expires: '30d',
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Wav', wavSchema);
//# sourceMappingURL=Wav.js.map