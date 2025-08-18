import express from "express";
import { Request, Response } from "express";
import { User } from "../../../../entity/User";
import { validate } from "class-validator";

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

export {
    userAuthRouter
}
