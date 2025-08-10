import express from 'express';
import morgan from "morgan";
import 'dotenv/config';


const app = express();

app.use(morgan(process.env.MORGAN_STATE || "dev"))

app.listen(
    process.env.PROGRAM_PORT, 
    () => {
        console.log(`server listen port ${process.env.PROGRAM_PORT}`);
    }
)

console.log(process.env.PROGRAM_PORT);