import { IsNotEmpty, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUsernameDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: نام کاربری
 *           example: "john_doe"
 *         password:
 *           type: string
 *           format: password
 *           description: رمز عبور
 *           example: "Password123!"
 */
export class LoginUsernameDto {

    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}