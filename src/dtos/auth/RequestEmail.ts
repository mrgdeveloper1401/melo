import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     RequestEmailDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: آدرس ایمیل کاربر
 *           example: "user@example.com"
 *       example:
 *         email: "user@example.com"
 */
export class requestEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
};
