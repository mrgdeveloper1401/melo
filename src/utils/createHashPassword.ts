import crypto from "crypto";
import dotenv from "dotenv"
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({path: envPath});

const salt = process.env.SALT_HASH // Generate a random salt
const iterations = 10000; // Number of iterations (higher is more secure but slower)
const keylen = 64; // Length of the derived key in bytes
const hashAlgorithm = process.env.HASHED_ALGORITM || "sha512"

export const funcCreateHashPassword = (password: string): string => {
    const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, hashAlgorithm).toString('hex')
    return hash
}

export const funcVerifyPassword = (password: string, storedHash: string): string => {
    
    const hash = crypto.pbkdf2Sync(
        password,
        salt,
        iterations,
        keylen,
        hashAlgorithm
    ).toString('hex');
    
    return hash;
}


// const hash = funcCreateHashPassword("1234")
// console.log(hash);
// console.log(funcVerifyPassword("1234", hash));
