import request from "supertest";
import {
    setupDatabase,
    disconnect,
    tokenBearer,
    invalidTokenBearer,
    deleteEntries,
    newUser1,
    productCart1,
    productCart2,
    newUserWithItemsInCart
} from "./bootstraping/db";
import app from "../app";
import Cart from "../models/cart";

require('dotenv').config();

describe("Test The Cart Service", () => {

    beforeAll(setupDatabase)
    beforeEach(deleteEntries)
    afterAll(disconnect)

    it('Returns 401 if we do not provide an authorization  token', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .get("/carts");
        expect(result.status).toEqual(401);
    })

    it('Returns 401 if we provide invalid authorization token', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .get("/carts")
            .set('Authorization', invalidTokenBearer)
        expect(result.status).toEqual(401);
    })

    it('Returns 200 with valid authorization token', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .get("/carts")
            .set('Authorization', tokenBearer)

        expect(result.status).toEqual(200);
    })

    it('Fetched created cart should not be empty array', async () => {

        await Cart.build(newUserWithItemsInCart).save();
        const result = await request(app)
            .get("/carts")
            .set('Authorization', tokenBearer)

        expect(result.status).toBe(200)
        expect(result.body.response.cart).toEqual(newUserWithItemsInCart.cart)
        expect(result.body.response.cart.length).toBeGreaterThan(0)
    })


    it('Returns 400 if empty object is provided', async () => {
        const result = await request(app)
            .post('/carts')
            .set('Authorization', tokenBearer)
            .send({})

        expect(result.status).toBe(400)
    })

    it('Returns 400 if Cart already exist', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .post('/carts')
            .set('Authorization', tokenBearer)
            .send({})

        expect(result.status).toBe(400)
    })

    it('Returns 201 if new empty cart is created', async () => {
        const result = await request(app)
            .post('/carts')
            .set('Authorization', tokenBearer)
            .send({cart: []})

        expect(result.status).toBe(201)
    })

    it('Returns 201 if not empty cart is Created', async () => {
        const result = await request(app)
            .post('/carts')
            .set('Authorization', tokenBearer)
            .send({cart: productCart1})

        expect(result.status).toBe(201)
    })

    it('Returns 200 if we try to update the cart', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .put('/carts')
            .set('Authorization', tokenBearer)
            .send({cart: productCart2})

        expect(result.status).toEqual(200)
    })

    it('User Cart should be updated with the new Cart', async () => {
        await Cart.build(newUser1).save();
        const result = await request(app)
            .put('/carts')
            .set('Authorization', tokenBearer)
            .send({cart: productCart2})
        expect(result.body.response.cart).toEqual(productCart2)
    })

})
