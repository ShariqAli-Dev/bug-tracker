import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__, __refreshTokenSecret__ } from "./constants";
import mickoConfig from "./mikro-orm.config";
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

const main = async () => {
  const orm = await MikroORM.init(mickoConfig);
  await orm.getMigrator().up();
  const fork = orm.em.fork();

  const app = express();
  app.use(
    cookieParser(),
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.post("/refresh-token", async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload = null;

    try {
      payload = verify(token, __refreshTokenSecret__) as Users;
    } catch (err) {
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid
    // we can send back an access token
    const user = (await fork.findOne(Users, {
      id: payload.id,
    })) as unknown as Users;

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
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: fork, req, res }),
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
