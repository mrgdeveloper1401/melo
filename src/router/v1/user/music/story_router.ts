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
/**
 * @swagger
 * /v1/user/music/all_user_story/:
 *   get:
 *     summary: دریافت لیست استوری‌های کاربران
 *     description: |
 *       این endpoint برای دریافت لیست استوری‌های فعال کاربران در ۲۴ ساعت گذشته استفاده می‌شود.
 *       نیاز به احراز هویت دارد.
 *     tags: [Story]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: شماره صفحه برای صفحه‌بندی
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: تعداد آیتم‌ها در هر صفحه (حداکثر 50)
 *         example: 20
 *     responses:
 *       200:
 *         description: لیست استوری‌ها با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoryListResponse'
 *       401:
 *         description: عدم احراز هویت
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: خطای سرور داخلی
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
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
/**
 * @swagger
 * /v1/user/music/create_story:
 *   post:
 *     summary: ایجاد استوری جدید
 *     description: |
 *       این endpoint برای ایجاد یک استوری جدید با استفاده از تصویر آپلود شده استفاده می‌شود.
 *       نیاز به احراز هویت دارد.
 *     tags: [Story]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dtos/music/create_story'
 *     responses:
 *       201:
 *         description: استوری با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoryCreateResponse'
 *       400:
 *         description: درخواست نامعتبر - بدنه درخواست ضروری است
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "request body is required"
 *       404:
 *         description: تصویر یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "image not found"
 *       401:
 *         description: عدم احراز هویت
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: خطای سرور داخلی
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
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