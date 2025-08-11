import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";

// config environment
dotenv.config();


// variable
const app = express();
const appPort = process.env.PROGRAM_PORT;
const defaultPort = 30001;
const defaultState = "dev";


// middleware
app.use(express.json());
app.use(cors);
app.use(morgan(process.env.MORGAN_STATE || defaultState))


// routes


// error handling middleware


// server running
app.listen(
    appPort || defaultPort,
    () => {
        console.log(`listen port http://localhost:${appPort || defaultPort}`);
    }
);
