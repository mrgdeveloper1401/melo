import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import { Request } from "express";
import { connectRedis, isRedisConnected, redisClient } from "./connectRedis";


const pathEnv = path.resolve(process.cwd(), "../../.env")
dotenv.config({path: pathEnv});


const api = axios.create(
    {
        baseURL: process.env.SMS_IR_VERIFY_BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.SMS_IR_API_KEY_SAND_BOX
        }
    }
)

export const sendOtp = async (phoneNumber: string, req: Request) => {
    try {
        // check and connect redis
        if (isRedisConnected === false) {
            await connectRedis();
        }

        // create random code
        const otpCode = crypto.randomInt(111111,999999)

        const response = await api.post(
            "/send/verify",
            {
                mobile: phoneNumber,
                templateId: process.env.SMS_IR_OTP_TEMPLATE_ID_SANDBOX,
                parameters: [
                    {name: "otp", value: otpCode}
                ]
            }
        );

        const userIp = req.ip
        await redisClient.setEx(`otp_${otpCode}_${userIp}`, 120, otpCode.toString());
        // { data: { messageId: 89545112, cost: 1 }, status: 1, message: 'موفق' }
        // console.log(response.data);
        return response.data

    } catch (error) {
        // console.log(error);
        // console.log(error.response.data); // { data: null, status: 113, message: 'قالب یافت نشد' }
        return error.response
    }
}


// sendOtp("09923081041", "127.0.0.1")