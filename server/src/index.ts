import "reflect-metadata";
import { __PGPassword__, __prod__, __refreshTokenSecret__ } from "./constants";
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
import { DataSource } from "typeorm";
import { Review } from "./entities/Review";
require("dotenv").config();

export const myDataSource = new DataSource({
  type: "postgres",
  database: process.env.DB_NAME + "2",
  username: "postgres",
  password: __PGPassword__,
  logging: true,
  synchronize: true,
  entities: [Review, Users],
});

const main = async () => {
  const app = express();
  app.use(
    cookieParser(),
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
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
