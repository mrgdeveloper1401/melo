import express from "express";
import { AppDataSource } from "../../../data-source";
import { PublicNotification } from "../../../entity/publicNotification";
import { Request, Response } from "express";


export const coreRouter = express.Router();

/**
 * @swagger
 * /v1/auth/user/confirm_forget_password:
 *  get:
 *      summary: all public notification
 */
coreRouter.get(
    "/public_notifications/",
    async (req: Request, res: Response) => {
        try {
            const requestParams = req.query; // params
            const limit = parseInt(requestParams.limit as string) || 20; // get limit in params
            const page = parseInt(requestParams.page as string) || 1;
            const skip = (page - 1) * limit;
            const publicNotificationRepository = AppDataSource.getRepository(PublicNotification);
            const [publicNotification, total] = await publicNotificationRepository.findAndCount(
                {
                    where: {is_active: true},
                    take: limit || 20,
                    skip: skip,
                    select: ['id', "title", "notification_redirect_url", "notification_type", "createdAt"]
                }
            )
            return res.status(200).json(
                {
                    status: "success",
                    total: total,
                    limit: limit,
                    page: page,
                    total_page: Math.ceil(total / limit),
                    data: publicNotification
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


coreRouter.get(
    "/public_notifications/:id",
    async (req: Request, res: Response) => {
        try {
            const publicNotificationRepository = AppDataSource.getRepository(PublicNotification);
            const getPublicNotification = await publicNotificationRepository.findOne(
                {
                    where: {
                        is_active: true,
                        id: Number(req.params.id),
                    },
                    select: ['id', "body", "notification_redirect_url", "title", "notification_type", "createdAt"]
                }
            )
            return res.status(200).json(
                {
                    status: "success",
                    data: getPublicNotification
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