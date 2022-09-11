import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { ROLES } from "../constants";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (context.req.session.role !== ROLES.ADMIN) {
    throw new Error("incorrect role");
  }
  return next();
};
