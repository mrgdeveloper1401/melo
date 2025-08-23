import { AppDataSource } from "./data-source";
import { blue } from "colors";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { userAuthRouter } from "./router/v1/user/auth/auth_router";
import bodyParser from "body-parser";
import { followRouter } from "./router/v1/user/follow/follow_routers";

dotenv.config()

AppDataSource.initialize().then(() => {
    console.log(blue("success connect database"));
    console.log("Here you can setup and run express / fastify / any other framework.")

    // express
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = process.env.PORT;

    // router
    app.get(
        "/", (req: Request, res: Response) => {
            res.send("rest api music");
        }
    )
    app.use(
        "/v1/auth/user/", userAuthRouter
    )
    app.use(
        "/v1/follow/user/", followRouter
    )

    // listen
    app.listen(port)

}).catch(error => console.log(error))
