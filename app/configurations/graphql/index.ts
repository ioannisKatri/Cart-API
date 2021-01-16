import {resolvers, typeDefs} from "./schema";
import {ApolloServer} from "apollo-server-express";
import authService from "../../services/authService";
import {Request} from "express";

const apolloConfiguration = {
    typeDefs,
    resolvers,
}


export default new ApolloServer(apolloConfiguration);