import { config } from "dotenv";
import {Sequelize} from "sequelize";
import { CreateUserModel } from "../models/auth.js";
import colors from "colors";

// load env
config();

// variable
let userModel = null;

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
    
        // define schema
        userModel = await CreateUserModel(postgresDb);
        await postgresDb.sync()
        console.log("database synced");
        console.log(colors.blue(`Connection database ${process.env.POSTDB_DB_NAME} successful!`));
        return userModel;
    } catch (error) {
        console.error(colors.red('Connection failed:', error));
    };
};


export {connectionDb, userModel}