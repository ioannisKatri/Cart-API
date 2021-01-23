import {CustomError} from "./custom-error";


export class CartDontExist extends CustomError {
    statusCode = 400;

    constructor() {
        super("Cart Already Exist");
        Object.setPrototypeOf(this, CartDontExist.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string }[] {
        return [{success: false, message: "Cart Does not Exist"}];
    }

}