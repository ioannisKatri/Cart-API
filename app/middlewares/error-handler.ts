import {NextFunction, Request, Response} from 'express';
import logger from '../configurations/logger'
import {CustomError} from '../configurations/errors/custom-error'


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeErrors())
    }

    res.status(500).send({
        errors: [ { message: "something went wrong" }]
    });
}

