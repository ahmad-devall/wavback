import mongoose from 'mongoose'
import { logger } from '../config/logger'
import config from "../config/config"

const db = mongoose.connection
db.on('error', () => {
    logger.error('DB: mongo db connection is not open')
    logger.info('DB: killing myself so that container restarts')
})

db.once('open', () => {
    logger.info('DB: mongo db connection is established')
})

export default class Database {
    url = `mongodb+srv://jaskaran123:${config.MongoPassword}@cluster0.c4yiww1.mongodb.net/?retryWrites=true&w=majority`
    // url = `mongodb://77.68.73.116:27017/`


    constructor() {
        logger.info(`DB: DATABASE URL: ${this.url}`)
    }

    connect() {
        return mongoose.connect(
            this.url,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
               serverSelectionTimeoutMS: 5000
            },
            (error) => {
                if (error) {
                    logger.error('DB: MongoDB Connection error:', error)
                    process.exit(1)
                }
            }
        )
    }
}
