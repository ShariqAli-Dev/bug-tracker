import { MikroORM } from "@mikro-orm/core";

const main = async () => {
  console.log("server is up on port 4000");
  const orm = await MikroORM.init();
};

main();
