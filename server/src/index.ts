require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__, REDIS_SECRET } from "./constants";
import { myDataSource } from "./data-source";
import { CommentResolver } from "./resolvers/comment";
import { HelloResolver } from "./resolvers/hello";
import { NotificationResolver } from "./resolvers/notification";
import { ProjectResolver } from "./resolvers/project";
import { TicketResolver } from "./resolvers/ticket";
import { UserResolver } from "./resolvers/user";
import { UserProjectResolver } from "./resolvers/user_project";

const main = async () => {
  await myDataSource.initialize();
  await myDataSource.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  redis.connect().catch(console.error);

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: REDIS_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        ProjectResolver,
        NotificationResolver,
        UserProjectResolver,
        UserProjectResolver,
        CommentResolver,
        TicketResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on", "http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.log(err.message);
});
