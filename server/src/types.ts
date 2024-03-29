import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Users } from "./entities/Users";
import { Redis } from "ioredis";
export type MyContext = {
  req: Request & {
    session: Session &
      Partial<SessionData> & { userId?: number; role?: string };
  };
  res: Response;
  redis: Redis;
  payload?: Users;
};

// likely depricated frot the generated graphql
export type User = {
  email: string;
  role: string;
  id: string | number;
};
