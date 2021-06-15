import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAAMESPACE, `Sample health check route called.`);

    return res.status(200).json({
        message: 'pong'
    });
};

export default { sampleHealthCheck };
