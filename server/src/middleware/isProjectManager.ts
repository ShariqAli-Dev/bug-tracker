import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { ROLES } from "../constants";

export const isProjectManager: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  if (
    context.req.session.role !== ROLES.ADMIN ||
    context.req.session.role !== ROLES.PROJECT_MANAGER
  ) {
    throw new Error("incorrect role");
  }
  return next();
};
