import express from 'express';
import { userModel } from "../../data/db.js"
// import { getAllUser } from '../../controller/userController.js';


// define router
const router = express.Router();

// define route admin user
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 1
 *           readOnly: true
 *         username:
 *           type: string
 *           maxLength: 64
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 100
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           maxLength: 128
 *           writeOnly: true
 *           example: "securePassword123"
 *         mobile_phone:
 *           type: string
 *           pattern: '^[0-9]{11}$'
 *           example: "09123456789"
 *           nullable: true
 *         is_active:
 *           type: boolean
 *           default: true
 *         is_staff:
 *           type: boolean
 *           default: false
 *         is_superuser:
 *           type: boolean
 *           default: false
 *         is_artist:
 *           type: boolean
 *           default: false
 *       example:
 *         id: 1
 *         username: "john_doe"
 *         email: "user@example.com"
 *         mobile_phone: "09123456789"
 *         is_active: true
 *         is_staff: false
 *         is_superuser: false
 *         is_artist: false
 */
router.get("/admin-users/",  async (req, res) => {
    try {
        const users = await userModel.findAll();
        if (users.length == 0) {
            return res.status(200).json(
                {
                    "res": "No users found"
                }
            )
        }
        else
            res.status(200).json(users)
    } catch (error) {
        
    }
});

router.get("/admin-users/:id", (req, res) => {
    res.send(`Get admin user with ID: ${req.params.id}`);
});

router.post("/admin-users/", (req, res) => {
    res.send("Create new admin user");
});

router.put("/admin-users/:id", (req, res) => {
    res.send(`Update admin user with ID: ${req.params.id}`);
});

router.patch("/admin-users/:id", (req, res) => {
    res.send(`Partially update admin user with ID: ${req.params.id}`);
});

router.delete("/admin-users/:id", (req, res) => {
    res.send(`Delete admin user with ID: ${req.params.id}`);
});

export default router;
