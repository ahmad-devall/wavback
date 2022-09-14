"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let config = {
    HttpPort: getConf('HTTP_PORT', '8080'),
    MongoPort: parseInt(getConf('MONGO_PORT', '')),
    MongoPassword: getConf('MONGO_PASSWORD'),
    MongoDatabase: getConf('MONGO_DATABASE', ''),
    JwtSecret: getConf('JWT_SECRET', ''),
    NodeEnv: getConf('NODE_ENV', ''),
    Lifetime: getConf('LIFETIME', ''),
    SECRET_KEY: getConf('SECRET_KEY', ''),
    SENDGRID_API: getConf('SENDGRID_API', '')
};
function getConf(name, def = '') {
    if (process.env[name]) {
        return process.env[name] || '';
    }
    return def;
}
exports.default = config;
//# sourceMappingURL=config.js.map