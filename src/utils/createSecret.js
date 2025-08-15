import crypto from "crypto";

const createRandByte = crypto.randomBytes(64).toString("hex")
console.log(createRandByte);