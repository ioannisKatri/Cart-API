import {CustomError} from "./custom-error";


export class CartAlreadyExist extends CustomError {
    statusCode = 400;

    constructor() {
        super("Cart Already Exist");
        Object.setPrototypeOf(this, CartAlreadyExist.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: "Cart Already exist"}];
    }

}