require("dotenv").config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __password__ = process.env.PASSWORD;
export const __db__ = process.env.DB_NAME;
export const __tokenSecret__ =
  process.env.TOKEN_SECRET || "its a secret to us all";
export const __initialRole__ = "developer";
