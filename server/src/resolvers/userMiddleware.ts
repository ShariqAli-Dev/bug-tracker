import { verify } from "jsonwebtoken";
import { __accessTokenSecret__ } from "../constants";
import { MyContext } from "../types";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

// bearer token

export const isAuth: Middleware<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization?.split(" ")[1];
    const payload = verify(token, __accessTokenSecret__);
    context.payload = payload as any;
    return next();
  } catch {
    throw new Error("not authenticated");
  }
};
