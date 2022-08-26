import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __PGPassword__, __db__, __prod__ } from "./constants";
import { Users } from "./entities/Users";

export default {
  password: __PGPassword__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Users],
  dbName: __db__,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
