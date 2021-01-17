import {NextFunction, Request, Response} from "express";
import NotAuthorizedError from "../configurations/errors/not-authorized-error";
import jwt from "jsonwebtoken";
import {AuthenticationError} from "../configurations/errors/authentication-error";
import dotEnv from "dotenv";

dotEnv.config({ path: process.env.NODE_ENV !== "test" ? '.env': '.env.test' })

export default new (class AuthenticationService {

    authenticateForMiddleware(req: Request, res: Response, next: NextFunction) {
        let token = this.getToken(req)

        token = token!.replace(/^Bearer\s+/, "");
        try {
            req.user = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
            req.body.userId = req.user.id;
        } catch (e) {
            throw new AuthenticationError();
        }
        next()
    }

    authenticateForGraphQL(req: Request) {
        let token = this.getToken(req)

        token = token!.replace(/^Bearer\s+/, "");
        try {
            req.user = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
            return req.user.id;
        } catch (e) {
            throw new AuthenticationError();
        }
    }

    private getToken(req: Request) {
        let token = req.headers.authorization;
        if (!token) throw new NotAuthorizedError();
        return token!.replace(/^Bearer\s+/, "");
    }
})