import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

/** Create the server */
const httpServer = http.createServer(router);

/** Connect to DB */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        logging.info(NAMESPACE, 'Mongo connected!');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message);
    });

/** Logging the request */
router.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/** Parse the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of API */
router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/sample', sampleRoutes);

/** Error Handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Starting the server */
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}...`));
