import { env } from "./env";
import knex from "knex";
import pg from "pg";

// parse numeric types as floats
pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);

const db = knex({ client: "pg", connection: env.database_url });
export default db;
