import express from 'express';
import { userModel } from "../../data/db.js"
// import { getAllUser } from '../../controller/userController.js';


// define router
const router = express.Router();

// define route admin user
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
