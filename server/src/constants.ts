require("dotenv").config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __password__ = process.env.PASSWORD;
export const __db__ = process.env.DB_NAME;
export const __accessTokenSecret__ =
  process.env.ACCESS_TOKEN_SECRET || "its a secret to us all";
export const __refreshTokenSecret__ =
  process.env.REFRESH_TOKEN_SECRET || "its a secret to us all";
export const __passwordResetTokenSecret__ =
  process.env.PASSWORD_RESET_SECRET || "its a secret to us all";
export const __initialRole__ = "developer";
