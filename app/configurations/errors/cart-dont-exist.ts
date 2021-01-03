import {CustomError} from "./custom-error";


export class CartDontExist extends CustomError {
    statusCode = 400;

    constructor() {
        super("Cart Already Exist");
        Object.setPrototypeOf(this, CartDontExist.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: "Cart Does not Exist"}];
    }

}