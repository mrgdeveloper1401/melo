import express from "express";
import { Request, Response } from "express";
import { User } from "../../../../entity/User";
import { AppDataSource } from "../../../../data-source";
import { funcCreateHashPassword } from "../../../../utils/createHashPassword";
import { funcCreateToken } from "../../../../utils/createJwtToken";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { notAuthenticateJwt } from "../../../../utils/authenticate";
import { sendOtp } from "../../../../utils/sendOtpSmsIr";
import { redisClient, VerifyOtpRedis } from "../../../../utils/connectRedis";

const userAuthRouter = express.Router()

// create user
userAuthRouter.post(
    "/signup/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        try {
            // check request body
            if (!req.body) {
                return res.status(400).json({message: "request body is required"})
            }
            
            // request body
            const {username, password, email} = req.body
        
            // check validate data
            if (!username) {
                return res.status(400).json({message: "username is required"})
            }
            if (!password){
                return res.status(400).json({message: "password is required"})
            }
            if (!email) {
                return res.status(400).json({message: "email is required"})
            }

            const user = AppDataSource.getRepository(User)

            // check user exits
            const checkUsername = await user.findOne(
                {
                    where: {username: username}
                }
            );
            if (checkUsername) {
                return res.status(400).json({message: "username already exists"})
            }
                    const checkEmail = await user.findOne(
                {
                    where: {email: email}
                }
            )
            if (checkEmail) {
                return res.status(400).json({message: "email is already exists"})
            }

            // create user
            const hashPassword = funcCreateHashPassword(password);
            const createUser = new User();
            createUser.username = username;
            createUser.email = email;
            createUser.password = hashPassword;
            await createUser.save()

            // create and return token
            const token  = funcCreateToken(createUser.id)
            return res.status(201).json(
                {
                    "status": "success",
                    token: token,
                    isAdmin: createUser.is_staff
                }
            )
        }catch (error) {
            return res.status(500).json({message: "server error"})
        }

    }
)

// login_by_username
userAuthRouter.post(
    "/login_by_username/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        try {
            // request body
            if (!req.body) {
                return res.status(400).json({message: "request body is required"})
            }

            const { username, password } = req.body;
            if (!username) {
                return res.status(400).json({message: "username is required"});
            }
            if (!password){
                return res.status(400).json({message: "password is required"});
            }
            
            const userRepository = AppDataSource.getRepository(User);
            const hashPassword = funcCreateHashPassword(password)
            const user = await userRepository.findOne({where: {username: username, password: hashPassword}}) ;
            if (!user) {
                return res.status(400).json({message: "username or password is invalid"})
            }
            
            // check user is_active
            if (user.is_active === false) {
                return res.status(400).json(
                    {
                        message: "your account is bend!",
                        status: false
                    }
                )
            }
            // create token
            const token = funcCreateToken(user.id)

            // return token
            return res.status(200).json(
                {
                    "status": "success",
                    token: token
                }
            )
        } catch (error) {
            return res.status(500).json({message: "server error", status: "false"})
        }

    }
)

// login_by_email
userAuthRouter.post(
    "/login_by_email/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        try {
            // request body
            if (!req.body) {
                return res.status(400).json({message: "request body is required"})
            }

            const {email, password} = req.body;
    
            // check data
            if (!email) {
                return res.status(400).json({message: "email is required"});
            }
            if (!password) {
                return res.status(400).json({message: "password is required"});
            }

            const userRepository = AppDataSource.getRepository(User);
  
            // get user
            const getUser = await userRepository.findOne(
                {
                    where: {email: email}
                }
            );

            // check user
            if (!getUser) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "invalid email or password"
                    }
                );
            }

            // compare password
            const isValidPassword = bcrypt.compare(password, getUser.password);
            const hash = funcCreateHashPassword(password)
            if (!isValidPassword) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "invalid email or password",
                        hash: hash
                    }
                );
            }

            // check user is_active
            if (getUser.is_active === false) {
                return res.status(403).json(
                    {
                        status: false,
                        message: "your account is ben!"
                    }
                )
            }

            // generate and return token
            const token = funcCreateToken(getUser.id);
            return res.status(200).json({
                status: true,
                token,
                isAdmin: getUser.is_staff,
            });

        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            )
        }
    }
)

// request_login_by_otp_phone
userAuthRouter.post(
    "/request_otp_phone/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        try {
            // check request body
            if (!req.body) {
                return res.status(400).json({message: "request body is required"})
            }

            const { mobile_phone } = req.body;
            // validate data
            if (!mobile_phone || !req.body) {
                return res.status(400).json({message: "mobile_phone is required!"})
            }

            // check user dose exits
            const userRepository = AppDataSource.getRepository(User);
            const getUser = await userRepository.findOne({where: {mobile_phone: mobile_phone}})
            if (!getUser) {
                return res.status(404).json({message: "user not found!"})
            }
            if (getUser.is_active === false) {
                return res.status(403).json({message: "your account is ben!!"})
            }

            // generate otp code and send otp code
            await sendOtp(mobile_phone, req)
            const text = "code is send";
            return res.status(200).json(
                {
                    status: "success",
                    message: text
                }
            );
        } catch (error) {
            return res.status(500).json({message: "server error", error})
        }

        // create and send otp code
    }
)

// verify_login_by_otp_phone
userAuthRouter.post(
    "/verify_otp_phone/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        try {
            // check data in body
            if (!req.body) {
                return res.status(400).json({message: "request body must be set"});
            }

            // body
            const { code, mobile_phone } = req.body;

            // validate data
            if (!code) {
                return res.status(400).json({message: "code is required"});
            }
            if (!mobile_phone) {
                return res.status(400).json({message: "mobile phone is required"});
            }

            // check otp code
            const checkOtpCode = await VerifyOtpRedis(code, req.ip)
            // console.log(checkOtpCode);
            if (checkOtpCode === null) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "code is invalid"
                    }
                )
            }
            
            // get user and return token
            const userRepository = AppDataSource.getRepository(User);
            const getUser = await userRepository.findOne({where: {mobile_phone: mobile_phone}})
            if (!getUser) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "user not found"
                    }
                );
            }
            if (getUser.is_active === false) {
                return res.status(403).json(
                    {
                        status: false,
                        message: "your account is ben!"
                    }
                );
            }
            const token = funcCreateToken(getUser.id);
            return res.status(200).json(
                {
                    status: "success",
                    token: token,
                    isAdmin: getUser.is_staff
                }
            )
        } catch (error) {
            return res.status(500).json({message: "server error"})   
        }
    }
)


// userAuthRouter.post(
//     "/request_login_by_otp_email/",
//     async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/verify_login_by_otp_email/",
//     async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/request_login_by_otp_phone/",
//     async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/request_reset_password_by_phone/",
//         async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/verify_reset_password_by_phone/",
//         async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/request_reset_password_by_email/",
//         async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/verify_reset_password_by_email/",
//         async (req: Request, res: Response) => {

//     }
// )


// // profile
// userAuthRouter.get(
//     "/profile/",
//     async (req: Request, res: Response) => {
//         try {
//             // get and  token
//             const token = req.headers.authorization?.split(" ")[1];
//             if (!token) {
//                 return res.status(401).json({message: "authentication not found"})
//             }
            
//         } catch (error) {
//             return error
//         }
//     }
// )

// userAuthRouter.put(
//     "/profile/:user_id/",
//         async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.patch(
//     "/profile/:user_id/",
//         async (req: Request, res: Response) => {

//     }
// )
export {
    userAuthRouter
}
