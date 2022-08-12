import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __password__, __db__, __prod__ } from "./constants";

export default {
  password: __password__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [],
  dbName: __db__,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];