import joi from "joi";
import { validate } from "../internal/joi";
import dotenv from "dotenv";

interface ApplicationEnv {
  database_url: string;
  database_name: string;
}

const envSchema: Record<keyof ApplicationEnv, joi.SchemaLike> = {
  database_url: joi.string().uri({ scheme: "postgres" }).required(),
  database_name: joi.string().required(),
};

function loadEnv(): ApplicationEnv {
  dotenv.config();
  const parsedData = Object.keys(process.env).reduce((obj, key) => {
    const path = key.toLowerCase();

    // filter by the keys we need
    if ((<any>envSchema).hasOwnProperty(path)) {
      obj[key.toLowerCase()] = process.env[key];
    }
    return obj;
  }, <Record<string, any>>{});

  return validate(parsedData, envSchema);
}

export const env = loadEnv();
