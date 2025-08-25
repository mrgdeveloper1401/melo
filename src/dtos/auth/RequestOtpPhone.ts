import { IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     RequestOtpPhoneDto:
 *       type: object
 *       required:
 *         - mobile_phone
 *       properties:
 *         mobile_phone:
 *           type: string
 *           description: شماره تلفن همراه کاربر
 *           example: "09123456789"
 *       example:
 *         mobile_phone: "09123456789"
 */
export class RequestOtpPhoneDto {
    @IsString()
    @IsNotEmpty()
    mobile_phone: string;

}