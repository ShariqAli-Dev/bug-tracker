require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { __db__, __PGPassword__ } from "./constants";
import { Comment } from "./entities/Comment";
import { Notification } from "./entities/Notification";
import { Project } from "./entities/Project";
import { Review } from "./entities/Review";
import { Ticket } from "./entities/Ticket";
import { Users } from "./entities/Users";
import { User_Project } from "./entities/User_Project";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: __PGPassword__,
  database: __db__ + "2",
  synchronize: true,
  logging: true,
  entities: [
    Comment,
    Notification,
    Project,
    Review,
    Ticket,
    User_Project,
    Users,
  ],
  migrations: [],
  subscribers: [],
});
