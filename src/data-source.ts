import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, SYNC_DB, LOG_ENABLE } =
  process.env;

const synchronize = SYNC_DB === "true" ? true : false;;

  // Configura o logging baseado em LOG_ENABLE
const log_enable = LOG_ENABLE === "true" ? true : false;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: synchronize,
//logging logs sql command on the treminal
  logging: log_enable,
  entities: [],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});