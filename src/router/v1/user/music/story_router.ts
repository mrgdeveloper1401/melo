import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../../../../data-source";
import { Story } from "../../../../entity/Story";
import { authenticateJWT } from "../../../../middlewares/authenticate";
import { MoreThan } from "typeorm";
import { Image } from "../../../../entity/Image";
import { plainToClass } from "class-transformer";
import { CreateStoryDto } from "../../../../dtos/music/CreateStory";


export const storyRouter = express.Router();

// get all story
storyRouter.get(
    "/all_user_story/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            const limit = parseInt(req.query.limit as string) || 20;
            const page = parseInt(req.query.page as string) || 1;
            const skip = (page - 1) * limit;
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const userStoryRepository = AppDataSource.getRepository(Story);
            const [stories, count] = await userStoryRepository.findAndCount(
                {
                    where: {is_active: true, createdAt: MoreThan(twentyFourHoursAgo)},
                    relations: ['user', "image_story"],
                    select: {
                        id: true,
                        caption: true,
                        createdAt: true,
                        user: {
                            id: true,
                            username: true,
                        },
                        image_story: {
                            id: true,
                            image_path: true
                        }
                    },
                    order: {
                        createdAt: "DESC"
                    },
                    take: limit,
                    skip: skip
                },
            )

            return res.status(200).json(
                {
                    status: "success",
                    data: stories,
                    count: count,
                    limit: limit,
                    page: page
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    message: "server error",
                    status: false,
                    errors: error
                }
            )
        }
    }
)

// create story
storyRouter.post(
    "/create_story/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            // check request body
            if (!req.body) {
                return res.status(400).json(
                    {
                        status: false,
                        message: "request body is required"
                    }
                );
            }

            const imageStoryDto = plainToClass(CreateStoryDto, req.body);
            const imageStoryRepository = AppDataSource.getRepository(Image);
            const checkImageUserUpload = await imageStoryRepository.findOne(
                {
                    where: {id: imageStoryDto.image_id, user: (req as any).user.user_id},
                    select: {
                        id: true,
                        user: {
                            id: true
                        }
                    }
                }
            )

            if (!checkImageUserUpload) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "image not found"
                    }
                )
            }

            const createStoryImage = new Story();
            createStoryImage.caption = imageStoryDto.caption;
            createStoryImage.image_story = checkImageUserUpload;
            createStoryImage.user = (req as any).user.user_id;
            await createStoryImage.save();

            return res.status(201).json(
                {
                    status: "success",
                    message: "successfully create image story",
                    data: {
                        caption: createStoryImage.caption,
                        image_story: createStoryImage.image_story,
                        created_at: createStoryImage.createdAt
                    }
                }
            )



        } catch (error) {
            
        }   
    }
)