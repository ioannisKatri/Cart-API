import mongoose, {Schema} from 'mongoose';

interface ItemCartAttrs {
    product: string,
    quantity: number,
    price: number
}

const itemCartSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            required: true,
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