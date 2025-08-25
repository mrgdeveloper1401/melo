import { IsNotEmpty, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPasswordDto:
 *       type: object
 *       required:
 *         - old_password
 *         - new_password
 *         - confirm_password
 *       properties:
 *         old_password:
 *           type: string
 *           format: password
 *           description: رمز عبور قبلی
 *           example: "OldPassword123!"
 *         new_password:
 *           type: string
 *           format: password
 *           description: رمز عبور جدید
 *           example: "NewPassword456!"
 *         confirm_password:
 *           type: string
 *           format: password
 *           description: تأیید رمز عبور جدید
 *           example: "NewPassword456!"
 *       example:
 *         old_password: "OldPassword123!"
 *         new_password: "NewPassword456!"
 *         confirm_password: "NewPassword456!"
 */
export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @IsString()
    @IsNotEmpty()
    new_password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
