import { randomBytes } from "crypto";



const generateRandomSecret = (length: number = 32) => {
    const result = randomBytes(length).toString('hex');
    return result;
}

const jwtSecret = generateRandomSecret()
console.log('Generated JWT Secret:', jwtSecret);