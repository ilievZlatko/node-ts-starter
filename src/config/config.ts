import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const MONGO = {
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        poolSize: 50,
        autoIndex: true,
        retryWrites: false
    },
    url: 'mongodb+srv://admin:h@ilToTh3King@cluster0.msdaq.mongodb.net/blog-db'
};

const config = {
    server: SERVER,
    mongo: MONGO
};

export default config;
