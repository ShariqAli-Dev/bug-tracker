require("dotenv").config({ allowEmptyValues: true });
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
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN.split(" "),
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
        domain: __prod__ ? ".shariqapps.dev" : undefined,
      },
      saveUninitialized: false,
      secret: REDIS_SECRET,
      resave: false,
    })
  );
  app.get("/sanity", (_, res) => {
    res.status(201).json({ message: "initial request succesful" });
  });
  app.get("/", (_, res) => {
    res.json({
      PG_PASSWORD: process.env.PG_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
      PASSWORD_RESET_SECRET: process.env.PASSWORD_RESET_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      REDIS_SECRET: process.env.REDIS_SECRET,
      COOKIE_NAME: process.env.COOKIE_NAME,
      DEMO_USER_PASSWORD: process.env.DEMO_USER_PASSWORD,
      REDIS_URL: process.env.REDIS_URL,
      PORT: process.env.port,
      CORS_ORIGIN: process.env.CORS_ORIGIN,
      NODE_ENV: process.env.NODE_ENV,
    });
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        ProjectResolver,
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
