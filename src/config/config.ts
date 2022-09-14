import dotenv from "dotenv"

dotenv.config()

interface Config {
    HttpPort: string
    MongoPort: number
    MongoPassword: string
    MongoDatabase: string
    JwtSecret: string
    NodeEnv: string
    Lifetime: string
    SECRET_KEY: string
    SENDGRID_API: string
}

let config: Config = {
    HttpPort: getConf('HTTP_PORT', '8080'),
    MongoPort: parseInt(getConf('MONGO_PORT', '')),
    MongoPassword: getConf('MONGO_PASSWORD'),
    MongoDatabase: getConf('MONGO_DATABASE', ''),
    JwtSecret: getConf('JWT_SECRET', ''),
    NodeEnv: getConf('NODE_ENV', ''),
    Lifetime: getConf('LIFETIME', ''),
    SECRET_KEY: getConf('SECRET_KEY', ''),
    SENDGRID_API: getConf('SENDGRID_API', '')
}

function getConf(name: string, def: string = ''): string {
    if (process.env[name]) {
        return process.env[name] || ''
    }

    return def
}

export default config