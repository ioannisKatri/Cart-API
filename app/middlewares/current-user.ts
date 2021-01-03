import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

import NotAuthorizedError from "../configurations/errors/not-authorized-error";

export default (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        throw new NotAuthorizedError();
    }

    token = token!.replace(/^Bearer\s+/, "");

    try {
        req.user = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
        req.body.userId = req.user.id;
    } catch (e) {
        throw new Error();
    }
    next()
}
