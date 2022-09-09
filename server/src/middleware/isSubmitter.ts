import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { ROLES } from "../constants";

export const isSubmitter: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  if (
    context.req.session.role !== ROLES.ADMIN ||
    context.req.session.role !== ROLES.SUBMITTER
  ) {
    throw new Error("not authenticated");
  }
  return next();
};
