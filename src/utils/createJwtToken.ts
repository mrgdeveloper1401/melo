import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const funcCreateToken = (userId: number): string => {
    const jwtToken = jwt.sign(
        {userId: userId},
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.EXPIRED_TOKEN || "1h"}
    ) ;
    return  jwtToken
}