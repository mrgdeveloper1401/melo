import express from "express";
import { authenticateJWT } from "../../../../middlewares/authenticate";
import { Request, Response } from "express";
import { AppDataSource } from "../../../../data-source";
import { Follow } from "../../../../entity/Follow";

export const followRouter = express.Router();


followRouter.get(
    "/followers/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        // get data and pagination
        try {
            console.log((req as any).user.user_id);
            const followRepository = AppDataSource.getRepository(Follow);
            const [follow, totalCount] = await followRepository.findAndCount(
                {
                    where: {from_user: {id: (req as any).user.user_id}},
                    relations: ["to_user.profile.profile_image"],
                    select: ['to_user',]
                }
            )
            return res.status(200).json(
                {
                    status: "success",
                    totalCount: totalCount,
                    data: follow
                }
            )
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