import { AppDataSource } from "./data-source";
import { blue } from "colors";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { userAuthRouter } from "./router/v1/user/auth/auth_router";


dotenv.config()

AppDataSource.initialize().then(() => {
    console.log(blue("success connect database"));
    console.log("Here you can setup and run express / fastify / any other framework.")

    // express
    const app = express()
    app.use(express.json())
    const port = process.env.PORT;

    // router
    app.get(
        "/", (req: Request, res: Response) => {
            res.send("rest api music");
        }
    )
    app.use(userAuthRouter)

    // listen
    app.listen(port)

}).catch(error => console.log(error))
