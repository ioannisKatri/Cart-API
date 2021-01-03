import mongoose from "mongoose";

interface ProductAttrs {
    product: string,
    quantity: number,
    price: number
}

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
});

const Product = mongoose.model('Product', productSchema);
export { Product };