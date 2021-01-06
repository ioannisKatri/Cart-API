import {CustomError } from "./custom-error";

export class AuthenticationError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Unable to Authenticate");
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: "Unable to Authenticate"}];
    }
}