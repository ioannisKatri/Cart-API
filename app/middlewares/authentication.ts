import {NextFunction, Request, Response} from "express";
import authService from "../services/authService";

export default (req: Request, res: Response, next: NextFunction) => {
    authService.authenticateForMiddleware(req, res, next);
}
