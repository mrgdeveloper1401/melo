import express from "express";
import { Request, Response } from "express";
import { User } from "../../../../entity/User";
import { AppDataSource } from "../../../../data-source";
import { funcCreateHashPassword } from "../../../../utils/createHashPassword";
import { funcCreateToken } from "../../../../utils/createJwtToken";
import bcrypt from "bcrypt";
import { authenticateJWT, notAuthenticateJwt } from "../../../../utils/authenticate";
import { sendOtp } from "../../../../utils/sendOtpSmsIr";
import { redisClient, VerifyOtpRedis } from "../../../../utils/connectRedis";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";

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
            const user = await userRepository.findOne({where: {username: username}}) ;
            const isMatch = await bcrypt.compare(password, user.password);

            if (!user && !isMatch) {
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
            return res.status(500).json(
                {
                    message: "server error", 
                    status: "false",
                    error: error
                }
            )
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

// send request otp into email
userAuthRouter.post(
    "/request_login_by_otp_email/",
    notAuthenticateJwt,
    async (req: Request, res: Response) => {
        // validate request body
        if (!req.body) {
            return res.status(400).json({message: "request body must be set"});
        }

        // validate data
        const { email } = req.body;
        if (!req.body) {
            return res.status(400).json({message: "email is required"});
        }

        const userRepository = AppDataSource.getRepository(User);
        const getUser = await userRepository.findOne({where: {email: email}});

        if (!getUser) {
            return res.status(404).json(
                {
                    message: "user not found",
                    status: false
                }
            );
        }
        if (getUser.is_active === false) {
            return res.status(403).json(
                {
                    message: "your account is ben!",
                    status: false
                }
            );
        }
    }
)

// // user
userAuthRouter.get(
    "/user/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const userId = user.userId;
            
            // get and validate user
            const userRepository = AppDataSource.getRepository(User);
            const getUser = await userRepository.findOne({where: {id: userId}})
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

            const { password, is_staff, is_superuser, is_active, ...userProfile } = getUser;
            return res.status(200).json(
                {
                    status: "success",
                    data: userProfile 
                }
            );
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    error: error
                }
            );
        }
    }
)

// detail user
userAuthRouter.get(
    "/user/:id/",
    authenticateJWT,
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                
                const userRepository = AppDataSource.getRepository(User);
                const getUser = await userRepository.findOne({where: {id: Number(id)}});

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
                if (getUser.id !== (req as any).user.userId || getUser.is_public === false) {
                    return res.status(403).json(
                        {
                            status: false,
                            message: "you dot not have permission"
                        }
                    )
                }
                const { password, is_staff, is_superuser, is_active, ...userProfile } = getUser;
                return res.status(200).json(
                    {
                        status: "success",
                        data: userProfile
                    }
                );
            } catch (error) {
                return res.status(500).json(
                    {
                        status: false,
                        message: error
                    }
                );
            }
    }
)

// update user
userAuthRouter.patch(
    "/user/:id/",
    authenticateJWT,
        async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const userRepository = AppDataSource.getRepository(User);
                
                // get user query
                const user = await userRepository.findOne(
                    {
                        where: {id: Number(id)}
                    }
                );

                // check user
                if (!user) {
                    return res.status(404).json(
                        {
                            status: false,
                            message: "user not found"
                        }
                    );
                }
                if (user.is_active === false) {
                    return res.status(403).json(
                        {
                            status: false,
                            message: "your account is ben!"
                        }
                    );
                }
                if (user.id !== (req as any).user.userId) {
                    return res.status(403).json(
                        {
                            status: false,
                            message: "you do not have permission "
                        }
                    );
                }

                // if request body is None
                if (req.body == null) {
                    const { password, is_staff, is_superuser, is_active, ...userProfile } = user;
                    return res.status(200).json(
                        {
                            status: "success",
                            data: userProfile
                        }
                    )
                }

                // update field
                const updateField = [
                    "mobile_phone",
                    "username",
                    "email",
                    "is_public",
                    "is_artist"
                ]               

                updateField.forEach(field => {
                    if (req.body[field] !== undefined) {
                        (user as any)[field] = req.body[field];
                    }
                });
                const error = await validate(user);
                if (error.length > 0) {
                    return res.status(400).json(
                        {
                            status: false,
                            message: "Validation Field",
                            error: error.map(
                                err => (
                                    {
                                        field: Object.keys(err.constraints || {}),
                                        message: Object.values(err.constraints || {})
                                    }
                                )
                            )
                        }
                    );
                }

                // save the update user
                const updateUser = await userRepository.save(user)
                // Remove sensitive fields from response
                const { password, is_staff, is_superuser, is_active, ...updateAuthUser } = updateUser;

                return res.status(200).json(
                    {
                        status: "success",
                        data: updateAuthUser
                    }
                );
            } catch (error) {
                
            }
    }
)

export {
    userAuthRouter
}
