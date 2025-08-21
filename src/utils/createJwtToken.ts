import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const funcCreateToken = (userId: number, isActive: boolean): string => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const jwtToken = jwt.sign(
        {user_id: userId, is_active: isActive},
        secretKey as string,
        {expiresIn:"1h"}
    );
    return  jwtToken
}