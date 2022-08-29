require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { __db__, __PGPassword__ } from "./constants";
import { Notification } from "./entities/Notification";
import { Project } from "./entities/Project";
import { Review } from "./entities/Review";
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
  entities: [Review, Users, Notification, User_Project, Project],
  migrations: [],
  subscribers: [],
});
