/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         token:
 *           type: string
 *           description: New access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               value:
 *                 type: object
 * 
 *     ValidationError:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *         value:
 *           type: object
 */
