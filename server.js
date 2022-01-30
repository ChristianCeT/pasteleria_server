const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { UsertypeDefs } = require("./graphql/Schemas");
const { UserResolvers } = require("./graphql/Resolvers");
const { connectionDB } = require("./db/connection");
require("dotenv").config();

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [UsertypeDefs],
    resolvers: [UserResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: {
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  });

  connectionDB();

  httpServer.listen(
    process.env.PORT,
    console.log(`API CONECTADA EN http://localhost:${process.env.PORT}`)
  );


};

startApolloServer();
