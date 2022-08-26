require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { __db__, __PGPassword__ } from "./constants";
import { Review } from "./entities/Review";
import { Users } from "./entities/Users";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: __PGPassword__,
  database: __db__ + "2",
  synchronize: true,
  logging: true,
  entities: [Review, Users],
  migrations: [],
  subscribers: [],
});
