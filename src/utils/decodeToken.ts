import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token_secret_key = process.env.JWT_SECRET_KEY;

function decodeToken(token: string) {
    try {
        const decode = jwt.verify(token, token_secret_key);
        return decode;
    } catch (error) {
        return error
    }
}

console.log(decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1NDE1MDA5LCJpYXQiOjE3NTQ4MTAyMDksImp0aSI6Ijg1MDBlNTA2MTVmNDQ4MTg4MDk0NDNjZjFjZWI5ZDQ0IiwidXNlcl9pZCI6IjEifQ.Aw7r3Ng2iiT9Z1ZxBDYoYxiyqFjiE59Z-hkzo6aSeJc"));
