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
            const followRepository = AppDataSource.getRepository(Follow);
            const [follow, totalCount] = await followRepository.findAndCount(
                {
                    where: {from_user: (req as any).user.user_id},
                    select: {
                        to_user: true,
                        createdAt: true
                    }
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