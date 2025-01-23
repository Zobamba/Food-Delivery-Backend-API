import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import { typeDefs, resolvers } from "./modules/index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app: Application = express();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: () => ({ prisma }),
  plugins: [
    {
      async requestDidStart(requestContext) {
        console.log("Incoming request:", requestContext.request.query);
        return undefined;
      },
    },
  ],
});

let httpServer: any;

async function startServer() {
  await server.start();

  // @ts-ignore
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000 + Math.floor(Math.random() * 1000);
  httpServer = app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });

  prisma
    .$connect()
    .then(() => console.log("Prisma Client connected"))
    .catch((error) => console.error("Prisma Client connection error:", error));
}

startServer();

export { httpServer };
