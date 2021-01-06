import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

const mongodServer = new MongoMemoryServer();
import Cart from "../../models/cart";


async function getConnection() {
  const uri = await mongodServer.getUri();
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    return null;
  }
}


export const tokenBearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzdjNDAyNzE5NmI4MWNkZWE0MmNiMyIsImVtYWlsIjoic29tZUBhc2QxYXNkYXMuY29tIiwiaWF0IjoxNjA3MDEwMDgwfQ.HQLtsKYKjtaUwsAiRW2B-fTRNadXpPvy_vnEi6WvgwA"
export const invalidTokenBearer = "sadadadadasa";

export const productCart1 = [
  { product: "product1", quantity: 2, price: 3 },
  { product: "product2", quantity: 3, price: 4 },
  { product: "product3", quantity: 1, price: 2 },
]

export const productCart2 = [
  { product: "product4", quantity: 2, price: 3 },
  { product: "product5", quantity: 3, price: 4 },
  { product: "product6", quantity: 1, price: 2 },
]

export const newUser1 = {
  userId: "5fc7c4027196b81cdea42cb3",
  cart: [],
};

export const newUserWithItemsInCart = {
  userId: "5fc7c4027196b81cdea42cb3",
  cart: productCart1,
};

export const setupDatabase = async () => {
  await getConnection();
  await Cart.deleteMany({});
  await Cart.build(newUser1).save();
}

export const deleteEntries = async () => {
  await Cart.deleteMany({});
}

export const disconnect = async () => {
  await mongoose.disconnect();
  await mongodServer.stop();
}

module.exports = {
  tokenBearer,
  invalidTokenBearer,
  newUser1,
  newUserWithItemsInCart,
  productCart1,
  productCart2,
  setupDatabase,
  deleteEntries,
  disconnect
}
