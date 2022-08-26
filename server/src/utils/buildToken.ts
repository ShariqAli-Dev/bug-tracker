import jwt from "jsonwebtoken";
// import { User } from "../types";
import {
  __accessTokenSecret__,
  __passwordResetTokenSecret__,
  __refreshTokenSecret__,
} from "../constants";
import { Users } from "../entities/Users";

export const buildAccessToken = (user: Users): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    __accessTokenSecret__,
    { expiresIn: "15m" }
  );
};

export const buildRefreshToken = (user: Users): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    __refreshTokenSecret__,
    { expiresIn: "7d" }
  );
};

export const buildPasswordResetToken = (
  email: string,
  userId: number
): string => {
  return jwt.sign({ email, userId }, __passwordResetTokenSecret__, {
    expiresIn: "3d",
  });
};
