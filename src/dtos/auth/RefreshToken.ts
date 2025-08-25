import { IsNotEmpty, IsString } from "class-validator"

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenDto:
 *       type: object
 *       required:
 *         - refresh_token
 *       properties:
 *         refresh_token:
 *           type: string
 *           description: The refresh token to generate new access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
export class refreshTokenDto {

    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}
