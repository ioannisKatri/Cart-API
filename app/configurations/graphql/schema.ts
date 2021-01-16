import {ProvidedRequiredArgumentsOnDirectivesRule} from "graphql/validation/rules/ProvidedRequiredArgumentsRule";

import {gql} from "apollo-server-express";
// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
    type Query {
        hello: String
#        carts: [Cart]
    }

   
#    type Cart {
#        userId: String
#        cart: [Product]
#    }
#
#    type Product {
#        product: String
#        quantity: Int
#        price: Float
#    }
`;


const productDB = [
    {
        id: 1,
        name: "Apple",
    },
    {
        id: 2,
        name: "Orange",
    },
    {
        id: 3,
        name: "Banana",
    },
];

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        hello: () => "Hello world!",
    //     cart: () => {
    //         return [
    //             {
    //                 id: "XXXX01",
    //                 quantity: 3,
    //                 productId: 2,
    //             },
    //             {
    //                 id: "XXXX02",
    //                 quantity: 10,
    //                 productId: 3,
    //             },
    //         ];
    //     },
    // },
    // Item: {
    //     product: (obj: any, args: any, context: any, info: any) => {
    //         // emit events
    //         return productDB.find((prod) => prod.id === obj.productId);
    //     },
    },
};


export default {
    typeDefs,
    resolvers
};