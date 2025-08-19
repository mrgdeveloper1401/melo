import express from "express";
import { Request, Response } from "express";
import { User } from "../../../../entity/User";
import { validate } from "class-validator";
import { AppDataSource } from "../../../../data-source";
import { funcCreateHashPassword } from "../../../../utils/createHashPassword";
import { funcCreateToken } from "../../../../utils/createJwtToken";

const userAuthRouter = express.Router()

// create user
userAuthRouter.post(
    "/signup/",
    async (req: Request, res: Response) => {
        try{
            const { username, email, password } = req.body
            const createUser = new User();
            createUser.username = username;
            createUser.password = password;
            createUser.email = email;

            const error = await validate(createUser);
            if (error.length > 0) {
                return res.status(400).json(
                    {
                        "message": "invalid",
                        "success": "false",
                        "error": error[0].constraints
                    }
                );
            }

            await createUser.save();
            const {username: userUsername, email: userEmail} = createUser;
            const responseData = {username: userUsername, email: userEmail}
            return res.status(200).json(responseData);
        }
        catch(error){
            res.status(400);
            res.send(error);
        }
    }
        
)

userAuthRouter.post(
    "/login_by_username/",
    async (req: Request, res: Response) => {
        try {
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

// userAuthRouter.post(
//     "/login_by_email/",
//     async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/request_login_by_otp_phone/",
//     async (req: Request, res: Response) => {

//     }
// )

// userAuthRouter.post(
//     "/verify_login_by_otp_phone/",
//     async (req: Request, res: Response) => {

//     }
// )


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
