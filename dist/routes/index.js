"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const wav_1 = __importDefault(require("./wav"));
const admin_1 = __importDefault(require("./admin"));
const dealer_1 = __importDefault(require("./dealer"));
const review_1 = __importDefault(require("./review"));
const contact_1 = __importDefault(require("./contact"));
const payment_1 = __importDefault(require("./payment"));
const hire_1 = __importDefault(require("./hire"));
const dealerContact_1 = __importDefault(require("./dealerContact"));
const price_1 = __importDefault(require("./price"));
const features_1 = __importDefault(require("./features"));
const router = (0, express_1.Router)({ mergeParams: true });
router.use('/api/file', express_1.default.static(path_1.default.join(__dirname, '../../../uploads')));
router.use('/wav', wav_1.default);
router.use('/admin', admin_1.default);
router.use('/dealer', dealer_1.default);
router.use('/review', review_1.default);
router.use('/contact', contact_1.default);
router.use('/payment', payment_1.default);
router.use('/hire', hire_1.default);
router.use('/dealer/contact', dealerContact_1.default);
router.use('/price', price_1.default);
router.use('/features', features_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map