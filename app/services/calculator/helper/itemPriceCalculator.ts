import Item from "../item";
import {apiErrCodes} from "../../../configurations/logging-codes/loggingCodes";
import {isNotPositiveNumberOrBellowZero} from "../../../configurations/utilities/utilities";


// tslint:disable-next-line:new-parens
export default new (class ItemCalculator {

    itemPriceCalculator(item: Item): number {
        if (!item) return 0;
        // calculates the full price by multiplying quantity and unit price
        const fullPrice: number = item.unitPrice * item.quantity;
        if (isNotPositiveNumberOrBellowZero(fullPrice)) throw new Error(apiErrCodes.INVALID_NUMBER);

        const isInvalidDiscountNumber = item.totalDiscount && isNotPositiveNumberOrBellowZero(item.totalDiscount);
        if (isInvalidDiscountNumber) throw new Error(apiErrCodes.INVALID_DISCOUNT);

        const totalPrice = item.totalDiscount ? (fullPrice - item.totalDiscount) : fullPrice;
        if (isNotPositiveNumberOrBellowZero(totalPrice)) throw new Error(apiErrCodes.INVALID__TOTAL_PRICE);

        return totalPrice
    }

});