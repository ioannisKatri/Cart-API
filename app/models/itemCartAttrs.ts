import mongoose, {Schema} from 'mongoose';

interface ItemCartAttrs {
    product: string,
    quantity: number,
    price: number
}

const itemCartSchema = new mongoose.Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }, {_id: false}
)

export {itemCartSchema, ItemCartAttrs};