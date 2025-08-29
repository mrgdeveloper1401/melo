import express from "express";
import { AppDataSource } from "../../../data-source";
import { PublicNotification } from "../../../entity/publicNotification";
import { Request, Response } from "express";
import multer from 'multer';
import { upload } from "../../../utils/UploadFile";
import { authenticateJWT } from "../../../middlewares/authenticate";


export const coreRouter = express.Router();

// all public notification

/**
 * @swagger
 * /v1/core/user/notification/public_notifications:
 *   get:
 *     summary: دریافت لیست نوتیفیکیشن‌های عمومی
 *     description: |
 *       این endpoint برای دریافت لیست نوتیفیکیشن‌های عمومی با قابلیت صفحه‌بندی استفاده می‌شود.
 *       نیاز به احراز هویت ندارد.
 *     tags:
 *       - Notifications
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
 *           maximum: 100
 *           default: 20
 *         description: تعداد آیتم‌ها در هر صفحه (حداکثر 100)
 *         example: 20
 *     responses:
 *       200:
 *         description: لیست نوتیفیکیشن‌های عمومی با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 total:
 *                   type: integer
 *                   description: تعداد کل نوتیفیکیشن‌ها
 *                   example: 150
 *                 limit:
 *                   type: integer
 *                   description: تعداد آیتم‌ها در هر صفحه
 *                   example: 20
 *                 page:
 *                   type: integer
 *                   description: شماره صفحه فعلی
 *                   example: 1
 *                 total_page:
 *                   type: integer
 *                   description: تعداد کل صفحات
 *                   example: 8
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: شناسه نوتیفیکیشن
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: عنوان نوتیفیکیشن
 *                         example: "به روزرسانی سیستم"
 *                       notification_redirect_url:
 *                         type: string
 *                         nullable: true
 *                         description: URL جهت redirect
 *                         example: "https://example.com/update"
 *                       notification_type:
 *                         type: string
 *                         description: نوع نوتیفیکیشن
 *                         example: "system_update"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: تاریخ ایجاد
 *                         example: "2023-12-01T10:30:00.000Z"
 *       500:
 *         description: خطای سرور داخلی
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
 *             example:
 *               status: false
 *               message: "server error"
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


// detail public notification
/**
 * @swagger
 * /v1/core/user/notification/public_notifications/{id}:
 *   get:
 *     summary: دریافت جزئیات نوتیفیکیشن عمومی
 *     description: |
 *       این endpoint برای دریافت جزئیات کامل یک نوتیفیکیشن عمومی استفاده می‌شود.
 *       نیاز به احراز هویت ندارد.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه نوتیفیکیشن
 *         example: 1
 *     responses:
 *       200:
 *         description: جزئیات نوتیفیکیشن با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: شناسه نوتیفیکیشن
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: عنوان نوتیفیکیشن
 *                       example: "به روزرسانی سیستم"
 *                     body:
 *                       type: string
 *                       description: محتوای کامل نوتیفیکیشن
 *                       example: "سیستم در تاریخ ۱۴۰۲/۱۲/۰۱ به روزرسانی خواهد شد."
 *                     notification_redirect_url:
 *                       type: string
 *                       nullable: true
 *                       description: URL جهت redirect
 *                       example: "https://example.com/update"
 *                     notification_type:
 *                       type: string
 *                       description: نوع نوتیفیکیشن
 *                       example: "system_update"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: تاریخ ایجاد
 *                       example: "2023-12-01T10:30:00.000Z"
 *       404:
 *         description: نوتیفیکیشن یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *             example:
 *               status: "error"
 *               message: "Notification not found"
 *       500:
 *         description: خطای سرور داخلی
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
 *             example:
 *               status: false
 *               message: "server error"
 */
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

coreRouter.post(
    "/upload_image/",
    authenticateJWT,
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "file not found!"
                    }
                )
            }
            return res.status(201).json(
                {
                    status: "success",
                    message: `file ${req.file.path} with upload successfully`
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
);