require("dotenv").config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __PGPassword__ = process.env.PG_PASSWORD;
export const __cookieName__ = process.env.COOKIE_NAME || "bt qid";
export const __db__ = process.env.DB_NAME;
export const __redisSecret__ = process.env.REDIS_SECRET || "keyboard cat";
export const __accessTokenSecret__ =
  process.env.ACCESS_TOKEN_SECRET || "its a secret to us all";
export const __refreshTokenSecret__ =
  process.env.REFRESH_TOKEN_SECRET || "its a secret to us all";
export const __passwordResetTokenSecret__ =
  process.env.PASSWORD_RESET_SECRET || "its a secret to us all";
export const __initialRole__ = "developer";
