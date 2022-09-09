import { __accessTokenSecret__ } from "../constants";
import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (
    context.req.session.role !== "product manager" ||
    // context.req.session.role !== "demo product manager" ||
    context.req.session.role !== "product manager" ||
    context.req.session.role !== "product manager"
  ) {
    throw new Error("not an admin or manager");
  }

  return next();
};
