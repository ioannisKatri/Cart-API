import mongoose, { Schema } from "mongoose";
import { ItemCartAttrs, itemCartSchema } from "./itemCartAttrs";

interface CartAttrs {
  userId: string;
  cart: ItemCartAttrs[] | [];
}

interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
}

interface CartDoc extends mongoose.Document {
  userId: string;
  cart: ItemCartAttrs[] | [];
}

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  cart: {
    type: [itemCartSchema],
  },
});

cartSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.id;
  }
});


cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>("Cart", cartSchema);
export default Cart;
