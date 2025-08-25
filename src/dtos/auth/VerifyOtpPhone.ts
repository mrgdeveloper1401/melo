import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyOtpPhoneDto:
 *       type: object
 *       required:
 *         - mobile_phone
 *         - code
 *       properties:
 *         mobile_phone:
 *           type: string
 *           description: شماره تلفن همراه کاربر
 *           example: "09123456789"
 *         code:
 *           type: number
 *           description: کد OTP ارسال شده
 *           example: 123456
 *       example:
 *         mobile_phone: "09123456789"
 *         code: 123456
 */
export class VerifyOtpPhoneDto {
    @IsString()
    @IsNotEmpty()
    mobile_phone: string;

    @IsNumber()
    @IsNotEmpty()
    code: number;
}