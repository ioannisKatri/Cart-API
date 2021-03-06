import { Request, Response } from "express";
import Cart from "../models/cart";
import { CartAlreadyExist } from "../configurations/errors/cart-already-exist";
import { CartDontExist } from "../configurations/errors/cart-dont-exist";

const getCart = async (req: Request, res: Response) => {
  const user = await Cart.findOne({ userId: req.user.id });
  return res.status(200).json({ success: true, payload: user || null });
};

const createCart = async (req: Request, res: Response) => {
  const cartExist = await Cart.findOne({ userId: req.user.id });

  if (cartExist) {
    throw new CartAlreadyExist();
  }

  try {
    let cart = Cart.build(req.body);
    cart = await cart.save();
    return res.status(201).json({ success: true, payload: cart });
  } catch (err) {
    throw new Error(err);
  }
};

const updateCart = async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    throw new CartDontExist();
  }

  try {
    cart.cart = req.body.cart;
    await cart.save();
    return res.status(200).json({ success: true, payload: cart });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ success: false, message: err.errors });
  }
};

export { getCart, createCart, updateCart };
