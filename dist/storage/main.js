"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const wav_1 = require("./mongo/wav");
const admin_1 = require("./mongo/admin");
const dealer_1 = require("./mongo/dealer");
const review_1 = require("./mongo/review");
const price_1 = require("./mongo/price");
const payment_1 = require("./mongo/payment");
const features_1 = require("./mongo/features");
exports.storage = {
    wav: new wav_1.WavStorage(),
    admin: new admin_1.AdminStorage(),
    dealer: new dealer_1.DealerStorage(),
    review: new review_1.ReviewStorage(),
    price: new price_1.PriceStorage(),
    payment: new payment_1.PaymentStorage(),
    features: new features_1.FeaturesStorage()
};
//# sourceMappingURL=main.js.map