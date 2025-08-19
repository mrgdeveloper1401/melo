import crypto from "crypto";
import dotenv from "dotenv"


dotenv.config();

const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
const iterations = 10000; // Number of iterations (higher is more secure but slower)
const keylen = 64; // Length of the derived key in bytes
const hashAlgorithm = process.env.HASHED_ALGORITM || "sha512"

export const funcCreateHashPassword = (password: string): string => {
    const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, hashAlgorithm).toString('hex')
    return hash
}
