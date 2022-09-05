import "reflect-metadata";
import { __refreshTokenSecret__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import cors from "cors";
import { UserResolver } from "./resolvers/user";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { Users } from "./entities/Users";
import { buildAccessToken, buildRefreshToken } from "./utils/buildToken";
import { sendRefreshToken } from "./utils/sendToken";
import { myDataSource } from "./data-source";
import { ReviewResolver } from "./resolvers/review";
import { ProjectResolver } from "./resolvers/project";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";

const main = async () => {
  await myDataSource.initialize();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.use(
    cookieParser(),
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  app.post("/refresh-token", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload = null;

    try {
      payload = verify(refreshToken, __refreshTokenSecret__) as Users;
    } catch (err) {
      return res.send({ ok: false, accessToken: "" });
    }

    const user = Users.findOne({
      where: { id: payload.id },
    }) as unknown as Users;

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, buildRefreshToken(user));
    return res.send({
      ok: true,
      accessToken: buildAccessToken(user),
    });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, ReviewResolver, ProjectResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
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
