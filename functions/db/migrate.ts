import Postgrator from "postgrator";
import db from "../src/config/postgres";
import { env } from "../src/config/env";
import path from "path";

async function main() {
  const postgrator = new Postgrator({
    migrationPattern: path.join(process.cwd(), "db/migrations/*"),
    driver: "pg",
    database: env.database_name,
    schemaTable: "schema_migrations",
    execQuery: (query) => db.raw(query),
  });

  await postgrator.migrate();
}
main();
