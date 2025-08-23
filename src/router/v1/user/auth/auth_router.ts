import express from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../../../../entity/User";
import { AppDataSource } from "../../../../data-source";
import { funcCreateHashPassword } from "../../../../utils/createHashPassword";
import { funcCreateToken } from "../../../../utils/createJwtToken";
import bcrypt from "bcrypt";
import { authenticateJWT, notAuthenticateJwt } from "../../../../middlewares/authenticate";
import { sendOtp } from "../../../../utils/sendOtpSmsIr";
import { VerifyOtpRedis } from "../../../../utils/connectRedis";
import { validate } from "class-validator";
import { Profile } from "../../../../entity/Profile";
import { funcCheckUserActive } from "../../../../middlewares/checkUserActive";
import { ResetPasswordDto } from "../../../../dtos/auth/ResetPassword.dto";
import { plainToClass } from "class-transformer";
import { SignUpUserDto } from "../../../../dtos/auth/SignupUser";
import { refreshTokenDto } from "../../../../dtos/auth/RefreshToken";
import { TokenBlockDto } from "../../../../dtos/auth/TokenBlock";
import { TokenBlock } from "../../../../entity/TokenBlock";
import { LoginUsernameDto } from "../../../../dtos/auth/LoginUsername";
import { LoginByEmailDto } from "../../../../dtos/auth/LoginInByEmail";

const userAuthRouter = express.Router()

// refresh router
userAuthRouter.post(
    "/refresh_token",
    async (req: Request, res: Response) => {
        try {
            // check request body
            if (!req.body) {
                return res.status(400).json(
                    {
                        success: false,
                        message: "request body is required"
                    }
                );
            }

            // validate data dto
            const refreshToken = plainToClass(refreshTokenDto, req.body);
            const error = await validate(refreshToken);
            if (error.length > 0) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "Invalid Data",
                        errors: error.map(
                            err => (
                                {
                                    field: err.property,
                                    value: err.constraints
                                }
                            )
                        )
                    }
                );
            }

            // check and validate refresh token
            const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY
            if (!refreshSecretKey) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "REFRESH_JWT_SECRET_KEY is not defined in .env file"
                    }
                );
            }

            // decode refresh token
            try {
                const decodeRefreshToken = jwt.verify(refreshToken.refresh_token, refreshSecretKey)
                if (decodeRefreshToken['type_token'] !== "refresh") {
                    return res.status(400).json(
                        {
                           status: false,
                           message: "Invalid token type"
                        }
                    )
                }

                // is token block?
                const tokenRepository = AppDataSource.getRepository(TokenBlock);
                const isTokenBlock = await tokenRepository.findOne(
                    {
                        where: {token_uuid: decodeRefreshToken['uuid_name']},
                        select: ['token_uuid']
                    }
                );
                if (isTokenBlock !== null) {
                    return res.status(400).json(
                        {
                            status: false,
                            message: "this refresh_token blocked"
                        }
                    );
                }

                // check user
                const userRepository = AppDataSource.getRepository(User);
                const user = await userRepository.findOne(
                {
                    where: {id: decodeRefreshToken['user_id']},
                    select: ['id', "is_active"]
                }
            );
            if (!user) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "user not found"
                    }
                );
            }
            if (!user.is_active) {
                return res.status(403).json(
                    {
                        status: false,
                        message: "your account is ben!"
                    }
                );
            }

            // create access_token
            const accessSecretKey = process.env.JWT_SECRET_KEY
            if (!accessSecretKey) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "JWT_SECRET_KEY is not found in .env file"
                    }
                );
            }
            const token = jwt.sign(
                {user_id: decodeRefreshToken['user_id'], type_token: "access", is_active: user.is_active},
                accessSecretKey,
                {expiresIn: "1h"}
            )
            return res.status(201).json(
                {
                    status: "success",
                    token: token
                }
            )
            } catch (error) {
                return res.status(400).json(
                    {
                        status: false,
                        message: error
                    }
                );
            }
    } catch (error) {
        return res.status(500).json(
            {
                status: false,
                message: "server error"
            }
        )
    }
})

// token block
userAuthRouter.post(
    "/token_block/",
    async (req: Request, res: Response) => {
        try {
            // validate data
            if (!req.body) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "request body is required"
                    }
                );
            }

            const tokenBlock = plainToClass(TokenBlockDto, req.body)
            const error = await validate(tokenBlock)
            if (error.length > 0) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "Invalid Data",
                        errors: error.map(
                            err => (
                                {
                                    field: err.property,
                                    value: err.constraints
                                }
                            )
                        )
                    }
                );
            }

            // check refresh token
            try {
                const refreshSecretKey = process.env.REFRESH_JWT_SECRET_KEY
                if (!refreshSecretKey) {
                    return res.status(404).json(
                        {
                            status: false,
                            message: "REFRESH_JWT_SECRET_KEY is not found in .env file"
                        }
                    );
                }
    
                const verifyRefreshToken = jwt.verify(tokenBlock.refresh_token, refreshSecretKey)
                if (verifyRefreshToken["type_token"] !== "refresh") {
                    return res.status(400).json(
                        {
                            status: false,
                            message: "Invalid Token Type!"
                        }
                    );
                }

                // check token exits
                const tokenRepository = AppDataSource.getRepository(TokenBlock);
                const checkTokenExists = await tokenRepository.findOne(
                    {
                        where: {token_uuid: verifyRefreshToken['uuid_name']},
                        select: ['token_uuid']
                    }
                )
                if (checkTokenExists) {
                    return res.status(400).json(
                        {
                            status: false,
                            message: "token already exists"
                        }
                    );
                }
                
                // save token in database
                const getUserByToken = verifyRefreshToken['user_id'];
                const createTokenBlock = new TokenBlock();
                createTokenBlock.user_id = getUserByToken;
                createTokenBlock.refresh_token = tokenBlock.refresh_token;
                createTokenBlock.token_uuid = verifyRefreshToken['uuid_name']
                await createTokenBlock.save();

                return res.status(201).json(
                    {
                        status: "success",
                        message: "block token successfully"
                    }
                );

            } catch (error) {
                return res.status(400).json(
                    {
                        status: false,
                        message: error
                    }
                );
            }
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            )
        }
        
    }
);

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

            // validate data
            const signupUserDto = plainToClass(SignUpUserDto, req.body)
            const error = await validate(signupUserDto)
            if (error.length > 0) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "Validation Field",
                        errors: error.map(
                            err => (
                                {
                                    field: err.property,
                                    constraints: err.constraints
                                }
                            )
                        )
                    }
                );
            }

            const user = AppDataSource.getRepository(User)

            // check user exits
            const checkUsername = await user.findOne(
                {
                    where: {username: signupUserDto.username},
                    select: ['username', 'is_active', "password", "is_staff"]
                }
            );
            if (checkUsername) {
                return res.status(400).json({message: "username already exists"})
            }
                    const checkEmail = await user.findOne(
                {
                    where: {email: signupUserDto.email}
                }
            )
            if (checkEmail) {
                return res.status(400).json({message: "email is already exists"})
            }

            // create user
            const hashPassword = funcCreateHashPassword(signupUserDto.password);
            const createUser = new User();
            createUser.username = signupUserDto.username;
            createUser.email = signupUserDto.email;
            createUser.is_artist = signupUserDto.is_artist;
            createUser.password = hashPassword;
            await createUser.save()

            // create and return token
            const token  = funcCreateToken(createUser.id, createUser.is_active)
            return res.status(201).json(
                {
                    "status": "success",
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    isAdmin: createUser.is_staff
                }
            )
        }catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            )
        }

    }
);

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

            // validate data
            const loginByUsername = plainToClass(LoginUsernameDto, req.body)
            const error = await validate(loginByUsername);
            
            if (error.length > 0) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "Invalid Data",
                        errors: error.map(
                            err => (
                                {
                                    field: err.property,
                                    value: err.constraints
                                }
                            )
                        )
                    }
                );
            }

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne(
                { 
                    where: {username: loginByUsername.username}, select: ['username', "password", "is_active", "is_staff"]}
                ) ;
            const hashPassword = funcCreateHashPassword(loginByUsername.password);
            const isMatch = user.password === hashPassword

            if (!user) {
                return res.status(400).json({message: "username or password is invalid"})
            }

            if (isMatch === false) {
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
            const token = funcCreateToken(user.id, user.is_active)

            // return token
            return res.status(200).json(
                {
                    "status": "success",
                    access_token: token['accessToken'],
                    refresh_token: token['refreshToken'],
                    is_staff: user.is_staff
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
);

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

            // validate data
            const loginByEmail = plainToClass(LoginByEmailDto, req.body)

            const userRepository = AppDataSource.getRepository(User);
  
            // get user
            const getUser = await userRepository.findOne(
                {
                    where: {email: loginByEmail.email},
                    select: ['email', "is_active", "password", 'is_staff']
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
            const isValidPassword = funcCreateHashPassword(loginByEmail.password)
            if (isValidPassword !== getUser.password) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "invalid email or password",
                    }
                );
            }

            // check user is_active
            if (!getUser.is_active) {
                return res.status(403).json(
                    {
                        status: false,
                        message: "your account is ben!"
                    }
                )
            }

            // generate and return token
            const token = funcCreateToken(getUser.id, getUser.is_active);
            return res.status(200).json({
                status: true,
                access_token: token["accessToken"],
                refresh_token: token['refreshToken'],
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
);

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
);

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
            const token = funcCreateToken(getUser.id, getUser.is_active);
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
);

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
);

// // user
userAuthRouter.get(
    "/user/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const userId = user.user_id;
            
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
);

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
                if (getUser.id !== (req as any).user.user_id || getUser.is_public === false) {
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
);

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
                if (user.id !== (req as any).user.user_id) {
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
);

// get profile
userAuthRouter.get(
    "/profile/",
    authenticateJWT,
    funcCheckUserActive,
    async (req: Request, res: Response) => {
        try {
            // user repository and get user
            const userRepository = AppDataSource.getRepository(Profile);
            const getProfile = await userRepository.findOne(
                {
                    where: {user_id: (req as any).user.user_id}
                }
            )

            if (!getProfile) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "profile ot found"
                    }
                );
            }
            if ((req as any).user.is_active === false) {
                return res.status(403).json(
                    {
                        status: false,
                        message: "your account is ben!"
                    }
                );
            }

            return res.status(200).json(
                {
                    status: "success",
                    data: getProfile
                }
            );

        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            )
        }
    });


// update profile
userAuthRouter.patch(
    "/profile/:id",
    authenticateJWT,
    funcCheckUserActive,
    async (req: Request, res: Response) => {
        try {
            return res.status(200).json(
                {
                    status: "success"
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            );
        }
    }
);

// reset password
userAuthRouter.post(
    "/reset_password/",
    authenticateJWT,
    funcCheckUserActive,
    async (req: Request, res: Response) => {
        try {
            if (!req.body) {
                return res.status(400).json(
                    {
                        message: "request body is required"
                    }
                )
            }
            const resetPasswordDto = plainToClass(ResetPasswordDto, req.body);
            const error = await validate(resetPasswordDto);

            if (error.length > 0) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "Validation Field",
                        errors: error.map(
                            err => (
                                {
                                    field: err.property,
                                    constraints: err.constraints
                                }
                            )
                        )
                    }
                );
            }

            // get user
            const userRepository = AppDataSource.getRepository(User);
            const userId = (req as any).user.user_id
            const user = await userRepository.findOne(
                {
                    where: {id: Number(userId)},
                    select: ['id', 'password']
                }
            )

            // check old password
            const hashOldPassword = funcCreateHashPassword(resetPasswordDto.old_password)
            const isOldPasswordValid = hashOldPassword === user.password
            if (!isOldPasswordValid) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "old password is wrong"
                    }
                );
            }

            // check new_password and confirm_password
            if (resetPasswordDto.new_password !== resetPasswordDto.confirm_password) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "password not same"
                    }
                )
            }

            // save new password
            user.password = resetPasswordDto.new_password;
            await user.save();
            return res.status(200).json(
                {
                    status: "success",
                    message: "change password successfully"
                }
            );
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error",
                    error: error.message
                }
            )
        }
    }
);

export {
    userAuthRouter
}
