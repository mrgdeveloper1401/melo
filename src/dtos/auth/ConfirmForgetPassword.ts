import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     ConfirmForgetPasswordDto:
 *       type: object
 *       required:
 *         - code
 *         - new_password
 *         - confirm_new_password
 *         - mobile_phone
 *       properties:
 *         code:
 *           type: number
 *           description: کد OTP ارسال شده
 *           example: 123456
 *         new_password:
 *           type: string
 *           format: password
 *           description: رمز عبور جدید
 *           example: "NewPassword123!"
 *         confirm_new_password:
 *           type: string
 *           format: password
 *           description: تأیید رمز عبور جدید
 *           example: "NewPassword123!"
 *         mobile_phone:
 *           type: string
 *           description: شماره تلفن همراه کاربر
 *           example: "09123456789"
 *       example:
 *         code: 123456
 *         new_password: "NewPassword123!"
 *         confirm_new_password: "NewPassword123!"
 *         mobile_phone: "09123456789"
 */
export class  confirmForgetPasswordDto {
    @IsNumber()
    @IsNotEmpty()
    code: number;

    @IsString()
    @IsNotEmpty()
    new_password: string;

    @IsString()
    @IsNotEmpty()
    confirm_new_password: string;

    @IsString()
    @IsNotEmpty()
    mobile_phone: string;
}
