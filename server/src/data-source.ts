require("dotenv").config();
import "dotenv-safe/config";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_NAME, PG_PASSWORD } from "./constants";
import { Comment } from "./entities/Comment";
import { Project } from "./entities/Project";
import { Ticket } from "./entities/Ticket";
import { Users } from "./entities/Users";
import { User_Project } from "./entities/User_Project";
import { User_Ticket } from "./entities/User_Ticket";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: PG_PASSWORD,
  database: DB_NAME,
  url: process.env.DATABASE_URL,
  // synchronize: true,
  logging: true,
  entities: [Comment, Project, Ticket, User_Project, Users, User_Ticket],
  migrations: [path.join(__dirname, "./migrations/*")],
  subscribers: [],
});
