import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const funcCreateToken = (userId: number, isActive: boolean) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY

    if (!secretKey && refreshSecretKey) {
        throw new Error("JWT_SECRET_KEY and REFRESH_JWT_SECRET_KEY is not defined in environment variables");
    }

    const accessToken = jwt.sign(
        {user_id: userId, is_active: isActive, type: "access"},
        secretKey as string,
        {expiresIn: "1h"}
    );
    const refreshToken = jwt.sign(
        {user_id: userId, is_active: isActive, type: "refresh"},
        refreshSecretKey as string,
        {expiresIn: "365d"}
    );
    return {accessToken, refreshToken}   
}