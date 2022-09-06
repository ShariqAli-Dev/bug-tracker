import "reflect-metadata";
import {
  __cookieName__,
  __prod__,
  __redisSecret__,
  __refreshTokenSecret__,
} from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import cors from "cors";
import { UserResolver } from "./resolvers/user";
// import cookieParser from "cookie-parser";
// import { verify } from "jsonwebtoken";
// import { Users } from "./entities/Users";
// import { sendRefreshToken } from "./utils/sendToken";
import { myDataSource } from "./data-source";
import { ReviewResolver } from "./resolvers/review";
import { ProjectResolver } from "./resolvers/project";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
const main = async () => {
  await myDataSource.initialize();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  redis.connect().catch(console.error);

  app.use(
    // cookieParser(),
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(
    session({
      name: __cookieName__,
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
      secret: __redisSecret__,
      resave: false,
    })
  );

  // app.post("/refresh-token", async (req, res) => {
  //   const refreshToken = req.cookies.refreshToken;

  //   if (!refreshToken) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   let payload = null;

  //   try {
  //     payload = verify(refreshToken, __refreshTokenSecret__) as Users;
  //   } catch (err) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   const user = Users.findOne({
  //     where: { id: payload.id },
  //   }) as unknown as Users;

  //   if (!user) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   if (user.tokenVersion !== payload.tokenVersion) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   sendRefreshToken(res, buildRefreshToken(user));
  //   return res.send({
  //     ok: true,
  //     accessToken: buildAccessToken(user),
  //   });
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ReviewResolver, ProjectResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis: redis }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on", "http://localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.log(err.message);
});
