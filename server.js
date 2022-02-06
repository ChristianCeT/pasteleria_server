const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { UsertypeDefs } = require("./graphql/Schemas");
const { UserResolvers } = require("./graphql/Resolvers");
const { connectionDB } = require("./db/connection");
const { getUsers } = require("./Authentication/Authentication");

require("dotenv").config();

const startApolloServer = async () => {
  connectionDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [UsertypeDefs],
    resolvers: [UserResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";

      const usuario = getUsers(token);

      console.log(usuario);

      return {
        usuario,
      };
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: {
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
  });

  httpServer.listen(
    process.env.PORT,
    console.log(`API CONECTADA EN http://localhost:${process.env.PORT}`)
  );
};

startApolloServer();
