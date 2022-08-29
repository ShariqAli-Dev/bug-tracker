import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Users } from "./entities/Users";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  payload?: Users;
};

export type User = {
  email: string;
  role: string;
  id: string | number;
};
