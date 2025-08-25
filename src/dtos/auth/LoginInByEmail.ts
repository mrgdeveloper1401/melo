import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginByEmailDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: آدرس ایمیل کاربر
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: رمز عبور
 *           example: "Password123!"
 */
export class LoginByEmailDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
