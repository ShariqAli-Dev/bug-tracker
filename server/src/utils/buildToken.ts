import jwt from "jsonwebtoken";
import { User } from "../types";
import { __accessTokenSecret__, __refreshTokenSecret__ } from "../constants";

export const buildAccessToken = (
  payload: User,
  options: jwt.SignOptions
): string => {
  return jwt.sign({ payload }, __accessTokenSecret__, options);
};

export const buildRefreshToken = (
  payload: User,
  options: jwt.SignOptions
): string => {
  return jwt.sign({ payload }, __refreshTokenSecret__, options);
};
