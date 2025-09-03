import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../../../../data-source";
import { Story } from "../../../../entity/Story";
import { authenticateJWT } from "../../../../middlewares/authenticate";
import { MoreThan } from "typeorm";


export const storyRouter = express.Router();

storyRouter.get(
    "/all_user_story/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            const currentTime = new Date();
            const userStoryRepository = AppDataSource.getRepository(Story);
            const [stories, count] = await userStoryRepository.findAndCount(
                {
                    where: {is_active: true, createdAt: MoreThan(currentTime)},
                    relations: ['user', "image_story"],
                    order: {
                        createdAt: "DESC"
                    }
                },
            );

            return res.status(200).json(
                {
                    status: "success",
                    data: stories,
                    count: count
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    message: "server error",
                    status: false
                }
            )
        }
    }
)