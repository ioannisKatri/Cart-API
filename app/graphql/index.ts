import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";

const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
    cart: [Item]
  }
  type Product {
    id: ID
    name: String
  }
  type Item {
    id: ID
    quantity: Int
    product: Product
  }
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
    cart: () => {
      return [
        {
          id: "XXXX01",
          quantity: 3,
          productId: 2,
        },
        {
          id: "XXXX02",
          quantity: 10,
          productId: 3,
        },
      ];
    },
  },
  Item: {
      product: (obj: any, args: any, context: any, info: any) => {
        // emit events
        return productDB.find((prod) => prod.id === obj.productId);
    },
  },
};


export default {
  typeDefs,
  resolvers
};