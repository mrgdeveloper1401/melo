import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";


const pathEnv = path.resolve(process.cwd(), "../../.env")
dotenv.config({path: pathEnv});


const api = axios.create(
    {
        baseURL: process.env.SMS_IR_VERIFY_BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.SMS_IR_API_KEY
        }
    }
)

const sendOtp = async (phoneNumber: string) => {
    try {
        const response = await api.post(
            "/send/verify",
            {
                mobile: phoneNumber,
                templateId: process.env.SMS_IR_OTP_TEMPLATE_ID,
                parameters: [
                    {name: "otp", value: crypto.randomInt(111111,999999)}
                ]
            }
        );
        console.log(response.data);

    } catch (error) {
        // console.log(error.response.data); // { data: null, status: 113, message: 'قالب یافت نشد' }
        return error.response.data
    }
}

sendOtp("09391640664")