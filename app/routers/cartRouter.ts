import express, {Request, Response, Router} from "express";
import path from "path";
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "../graphql";
import {createCart, getCart, updateProducts} from "../controllers/cartController"
import {body, validationResult} from 'express-validator';
import currentUser from "../middlewares/current-user";
import authMiddleware from "../middlewares/current-user";
import {validateRequest} from "../middlewares/validate-request";

export default function cartRouter(router: Router) {
    // const server = new ApolloServer({typeDefs, resolvers});
    // server.applyMiddleware({app});

    router.get("/carts/current-user", authMiddleware, getCart);

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
    ], authMiddleware, validateRequest, updateProducts)

    return router;
}
