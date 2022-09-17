require("dotenv").config();
export const ROLES = {
  ADMIN: "admin",
  PROJECT_MANAGER: "project manager",
  SUBMITTER: "submitter",
  DEVELOPER: "developer",
  DEMO_ADMIN: "admin",
  DEMO_PROJECT_MANAGER: "project manager",
  DEMO_SUBMITTER: "submitter",
  DEMO_DEVELOPER: "developer",
};

export const INITIAL_ROLE = ROLES.DEVELOPER;

export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const __prod__ = process.env.NODE_ENV === "production";
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const COOKIE_NAME = process.env.COOKIE_NAME || "bt qid";
export const DB_NAME = process.env.DB_NAME;
export const REDIS_SECRET = process.env.REDIS_SECRET || "keyboard cat";

export const __passwordResetTokenSecret__ =
  process.env.PASSWORD_RESET_SECRET || "its a secret to us all";
