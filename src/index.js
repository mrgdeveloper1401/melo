import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import { pool } from './data/db.js';
import colors from 'colors';


// config environment
dotenv.config();


// variable
const app = express();
const appPort = process.env.PROGRAM_PORT;
const defaultPort = 30001;
const defaultState = "dev";

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan(process.env.MORGAN_STATE || defaultState))


// routes


// error handling middleware


// postgres connection
app.get(
    "/db/",
    async (req, res) => {
        const result = await pool.query("select current_database();")
        res.send(`Database name is: ${result.rows[0].current_database}`);
        console.log(`database name is ${result.rows[0].current_database}`.blue);
    }
);


// server running
app.listen(
    appPort || defaultPort,
    () => {
        console.log(`listen port http://localhost:${appPort || defaultPort}`);
    }
);
