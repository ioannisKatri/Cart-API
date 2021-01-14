import {CustomError} from "./custom-error";


export class CartAlreadyExist extends CustomError {
    statusCode = 400;

    constructor() {
        super("Cart Already Exist");
        Object.setPrototypeOf(this, CartAlreadyExist.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string }[] {
        return [{success: false, message: "Cart Already exist"}];
    }

}