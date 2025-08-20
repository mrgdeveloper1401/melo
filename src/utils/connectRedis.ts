import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: envPath });

export const redisClient = createClient({
    url: `redis://${process.env.PROD_REDIS_HOST || "localhost"}:${process.env.PROD_REDIS_PORT || "6381"}/1`,
    password: process.env.PROD_REDIS_PASSWORD || undefined
});

let isConnected = false;

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
    isConnected = false;
});

redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis connected successfully");
    isConnected = true;
});

// func for check connect
export const isRedisConnected = isConnected;

// connect to redis
export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

const disconnectRedis = async () => {
    if (redisClient.isOpen) {
        await redisClient.quit();
    }
}

export const VerifyOtpRedis = async (code: string, userIp: string) => {
    if (isRedisConnected === false) {
        await connectRedis();
    }
    const RedisKey = `otp_${code}_${userIp}`;
    const check = await redisClient.get(RedisKey);
    redisClient.del(RedisKey);
    await disconnectRedis();
    return check;
}