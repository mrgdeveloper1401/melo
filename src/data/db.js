import { Pool } from "pg";
import { config } from "dotenv";

config();

export const pool = new Pool(
    {
        user: process.env.DEVELOPMENT_POSTDB_USER,
        port: process.env.DEVELOPMENT_POSTDB_PORT,
        host: process.env.DEVELOPMENT_POSTDB_HOST,
        password: process.env.DEVELOPMENT_POSTDB_PASSWORD,
        database:process.env.DEVELOPMENT_POSTDB_DB_NAME
    }
)

pool.on(
    "connect",
    () => {
        console.log("Connection pool established with database");
    }
)
