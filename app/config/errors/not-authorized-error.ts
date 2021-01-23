import {CustomError} from "./custom-error";


export default class NotAuthorizedError extends CustomError{
    statusCode = 401;

    constructor() {
        super("Not Authorized");
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }


    serializeErrors(): {success: boolean, message: string; field?: string }[] {
        return [{success: false, message: "Not Authorized"}];
    }
}