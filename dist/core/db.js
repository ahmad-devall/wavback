"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../config/logger");
const db = mongoose_1.default.connection;
db.on('error', () => {
    logger_1.logger.error('DB: mongo db connection is not open');
    logger_1.logger.info('DB: killing myself so that container restarts');
});
db.once('open', () => {
    logger_1.logger.info('DB: mongo db connection is established');
});
class Database {
    constructor() {
        this.url = `mongodb+srv://jaskaran123:Wavcompare123!@cluster0.c4yiww1.mongodb.net/?retryWrites=true&w=majority`
        //this.url = `mongodb+srv://wav:wav@cluster0.zfehybo.mongodb.net/test`
        // this.url = `mongodb://77.68.73.116:27017/`;
        logger_1.logger.info(`DB: DATABASE URL: ${this.url}`);
    }
    connect() {
        return mongoose_1.default.connect(this.url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }, (error) => {
            if (error) {
                logger_1.logger.error('DB: MongoDB Connection error:', error);
                process.exit(1);
            }
        });
    }
}
exports.default = Database;
//# sourceMappingURL=db.js.map