// import { Pool } from "pg";
import { config } from "dotenv";
import {Sequelize} from "sequelize";
import colors from "colors";

// load env
config();

// export const pool = new Pool(
//     {
//         user: process.env.POSTDB_USER,
//         port: process.env.POSTDB_PORT,
//         host: process.env.POSTDB_HOST,
//         password: process.env.POSTDB_PASSWORD,
//         database:process.env.POSTDB_DB_NAME
//     }
// )

// pool.on(
//     "connect",
//     () => {
//         console.log("Connection pool established with database");
//     }
// )

// connect database postgres by orm sequelize
const postgresDb = new Sequelize(
  process.env.POSTDB_DB_NAME,
  process.env.POSTDB_USER,
  process.env.POSTDB_PASSWORD,
  {
    host: process.env.POSTDB_HOST,
    port: process.env.POSTDB_PORT,
    dialect: 'postgres',
    logging: console.log
  }
);

const connectionDb = async () => {
    try {
        await postgresDb.authenticate();
        console.log(colors.blue(`Connection database ${process.env.POSTDB_DB_NAME} successful!`));
    } catch (error) {
        console.error(colors.red('Connection failed:', error));
    };
};


export {
  connectionDb
}