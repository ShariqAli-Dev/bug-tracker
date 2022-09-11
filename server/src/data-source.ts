require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_NAME, PG_PASSWORD } from "./constants";
import { Comment } from "./entities/Comment";
import { Notification } from "./entities/Notification";
import { Project } from "./entities/Project";
import { Ticket } from "./entities/Ticket";
import { Users } from "./entities/Users";
import { User_Project } from "./entities/User_Project";
import path from "path";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: PG_PASSWORD,
  database: DB_NAME + "2",
  synchronize: true,
  logging: true,
  entities: [Comment, Notification, Project, Ticket, User_Project, Users],
  // migrations: [path.join(__dirname, "./migrations/*")],
  subscribers: [],
});
