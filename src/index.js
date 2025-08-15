import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
// import { pool } from './data/db.js';
// import colors from 'colors';
import adminUser from "./routers/admin/admin.js";
import authUser from './routers/user/user.js';
// import errorHandel from "./middleware/errorHandler.js";
import { connectionDb } from "./data/db.js";
import { setupSwagger } from "./routers/doc/swagger.js";

// config environment
dotenv.config();


// variable
const app = express();
const appPort = process.env.PROGRAM_PORT;
const defaultPort = 30001;
const defaultState = "dev";
const adminUserRouter = adminUser;
const authUserRouter = authUser;
// const errorHandelMiddleware = errorHandel;


// middleware
setupSwagger(app) // swagger doc
app.use(express.json());
app.use(cors());
app.use(morgan(process.env.MORGAN_STATE || defaultState))


// routes
app.use(
    "/v1/admin/",
    adminUserRouter
)
app.use(
    "/v1/user/",
    authUserRouter
)
app.use(
    "/",
    (req, res) => {
        res.status(200).json(
            {
                status: "success",
                message: "REST API WORKING!"
            }
        )
    }
)


// error handling middleware
// app.use(errorHandelMiddleware())


// server running
const startServer = async () => {
    try {
        await connectionDb();
        app.listen(appPort || defaultPort, () => {
            console.log(`Server running on http://localhost:${appPort || defaultPort}`);
        });
    } catch (err) {
        console.error("Failed to connect to DB:", err);
        process.exit(1);
    }
};

startServer();
