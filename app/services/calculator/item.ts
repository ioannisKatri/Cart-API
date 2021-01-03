export default interface Item {
    name: string;
    unitPrice: number;
    quantity: number;
    totalDiscount: number
}

export const itemMapFunction = (arr: []) => {
    return arr.map((i: Item) =>
        <Item> {
            name: i.name,
            unitPrice: i.unitPrice,
            quantity: i.quantity,
            totalDiscount: i.totalDiscount
        }
    )
}