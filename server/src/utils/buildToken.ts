import jwt from "jsonwebtoken";
import { User } from "../types";
import { __accessTokenSecret__, __refreshTokenSecret__ } from "../constants";

export const buildAccessToken = (payload: User): string => {
  return jwt.sign({ payload }, __accessTokenSecret__, { expiresIn: "15m" });
};

export const buildRefreshToken = (payload: User): string => {
  return jwt.sign({ payload }, __refreshTokenSecret__, { expiresIn: "7d" });
};
