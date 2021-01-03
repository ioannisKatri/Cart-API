import Item from "./item";
import itemCalculatorService from "./helper/itemPriceCalculator";

export default (class ListPriceCalculator {

    listPriceCalculator(shoppingList: Item[]) : number {
        if(!shoppingList) return 0
        let listTotalPrice = 0;
        for (let i = 0;i < shoppingList.length; i++){
            listTotalPrice = listTotalPrice + itemCalculatorService.itemPriceCalculator(shoppingList[i])
        }
        return listTotalPrice;
    }
});
