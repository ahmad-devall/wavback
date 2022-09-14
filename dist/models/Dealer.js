"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const dealerSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    logo: {
        type: String
    },
    about_us: {
        type: String
    },
    postcode: {
        type: String
    },
    map_link: {
        type: String
    },
    links: {
        web_site: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        }
    },
    coins: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['user', 'dealer'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },
    created_at: {
        type: Number,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Dealer', dealerSchema);
//# sourceMappingURL=Dealer.js.map