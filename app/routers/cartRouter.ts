import express, {Request, Response, Router} from "express";
import path from "path";
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "../configurations/graphql/schema";
import {createCart, getCart, updateCart} from "../controllers/cartController"
import {body, validationResult} from 'express-validator';
import currentUser from "../middlewares/authentication";
import authMiddleware from "../middlewares/authentication";
import {validateRequest} from "../middlewares/validate-request";

export default function cartRouter(router: Router) {


    router.get("/carts", authMiddleware, getCart);

    router.post("/carts", [
        body('cart').custom( (value) => {
            if (!value) {
                throw new Error("Cart field is missing or incorrect, please refer to documentation");
            }
            // TODO LOGIC for authentication
            return true;
        })
    ], authMiddleware, validateRequest, createCart);

    router.put("/carts",[
        body('cart').custom( (value, {req}) => {

            if (!value || value.length === 0) {
                throw new Error("Cart field is missing or incorrect, please refer to documentation");
            }
            // TODO LOGIC for authentication
            return true;
        })
    ], authMiddleware, validateRequest, updateCart)

    return router;
}
