import express from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../../data/db.js';
import {body, validationResult} from "express-validator";
import { json } from 'sequelize';
import bcrypt from "bcrypt";


// define router
const router = express.Router();

// create
router.post(
    "/auth/create/",

    // validate data
    [
        body('email').isEmail(),
        body('password').isLength({min: 6})

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const { username, email, password} = req.body;
            // check user exist
            const exitingEmail = await userModel.findOne({where: {email}})
            const exitingUsername = await userModel.findOne({ where: {username} })
            if (exitingUsername) {
                return res.status(400).json(
                    {
                        error: "username already exists"
                    }
                )
            }
            if (exitingEmail) {
                return res.status(400).json(
                    {
                        error: "email already exists"
                    }
                )
            }
            // hash password and create user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await new userModel.create(
                {
                    username,
                    email,
                    password: hashedPassword
                }
            );

            // create jwy token
            const token = jwt.sign(
                {userId: newUser.id},
                process.env.DEV_SECRET_KEY,
                {expiresIn: '1h'}
            )

            res.status(201).json(
                {
                    message: "User Created successfully",
                    token,
                    user: {
                        id: newUser.id,
                        is_staff: newUser.is_staff,
                        is_active: newUser.is_active,
                        email: newUser.email,
                        username: newUser.username
                    }
                }
            )
        } catch (error) {
            res.status(500).json({error: error})
        }
        
    }
)

// login
router.post(
    "/auth/login_by_username/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_otp/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/verify_request_otp/",
        (req, res) => {
        console.log("object");
    }
)

// profile
router.get(
    "/auth/profile/",
        (req, res) => {
        console.log("object");
    }
)
router.patch(
    "/auth/profile/:id",
        (req, res) => {
        console.log(`object ${req.params.id}`);
    }
)
router.put(
    "/auth/profile/:id",
        (req, res) => {
        console.log(`object ${req.params.id}`);
    }
)

// change email
router.post(
    "/auth/request_change_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_email/",
        (req, res) => {
        console.log("object");
    }
)

// change phone
router.post(
    "/auth/request_change_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_change_phone/",
        (req, res) => {
        console.log("object");
    }
)

// reset password
router.post(
    "/auth/change_password/",
        (req, res) => {
        console.log("object");
    }
)

// reset password by email
router.post(
    "/auth/request_reset_password_by_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_reset_password_by_email/",
        (req, res) => {
        console.log("object");
    }
)

// reset password by phone
router.post(
    "/auth/request_reset_password_by_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_reset_password_by_phone/",
        (req, res) => {
        console.log("object");
    }
)

// send link into email for reset password
router.post(
    "/auth/request_send_link_into_email/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_send_link_into_email/",
        (req, res) => {
        console.log("object");
    }
)

// send link for into phone for reset password
router.post(
    "/auth/request_send_link_into_phone/",
        (req, res) => {
        console.log("object");
    }
)
router.post(
    "/auth/request_verify_send_link_into_phone/",
        (req, res) => {
        console.log("object");
    }
)
export default router;