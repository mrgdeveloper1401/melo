import { IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenBlockDto:
 *       type: object
 *       required:
 *         - refresh_token
 *       properties:
 *         refresh_token:
 *           type: string
 *           description: توکن رفرش برای بلاک کردن
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
export class TokenBlockDto {
    
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}
