import { Request, Response, Router } from "express";
import { authenticateJWT } from "../../../../middlewares/authenticate";
import { AppDataSource } from "../../../../data-source";
import { Genre } from "../../../../entity/Genre";
import { Album } from "../../../../entity/Album";


export const albumRouter = Router();

/**
 * @swagger
 * /v1/user/album/{genre_id}/albums/:
 *   get:
 *     summary: دریافت آلبوم‌های یک ژانر خاص
 *     description: |
 *       این endpoint برای دریافت لیست آلبوم‌های مرتبط با یک ژانر خاص استفاده می‌شود.
 *       فقط آلبوم‌های فعال را برمی‌گرداند و شامل اطلاعات محدودی از هر آلبوم می‌شود.
 *     tags:
 *       - Albums
 *     parameters:
 *       - in: path
 *         name: genre_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: شناسه یکتای ژانر
 *     responses:
 *       200:
 *         description: لیست آلبوم‌ها با موفقیت بازگردانده شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: شناسه آلبوم
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: عنوان آلبوم
 *                         example: "نجواهای شب"
 *                       cover_image:
 *                         type: object
 *                         description: اطلاعات تصویر کاور
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: شناسه تصویر
 *                             example: 5
 *                           image_path:
 *                             type: string
 *                             description: مسیر فایل تصویر
 *                             example: "/images/covers/cover1.jpg"
 *       404:
 *         description: ژانر مورد نظر یافت نشد
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
 *                   example: "genre not found"
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
 *                   example: "server error"
 */
albumRouter.get(
    "/:genre_id/albums/",
    async (req: Request, res: Response) => {
        try {
            const genreId = parseInt(req.params.genre_id);
            
            const genreRepository = AppDataSource.getRepository(Genre);
            const genre = await genreRepository.findOne({
                where: { id: genreId, is_active: true },
                select: {id: true}
            });

            if (!genre) {
                return res.status(404).json({
                    status: "error",
                    message: "genre not found"
                });
            }

            const albumRepository = AppDataSource.getRepository(Album);
            
            const albums = await albumRepository
                .createQueryBuilder("album")
                .innerJoin("album.genres", "genre", "genre.id = :genreId", { genreId })
                .leftJoinAndSelect("album.cover_image", "cover_image")
                .where("album.is_active = :isActive", { isActive: true })
                .select([
                    "album.id",
                    "album.title",
                    // "album.bio",
                    // "album.release_date",
                    "cover_image.id",
                    "cover_image.image_path",
                    // "genre.id"
                ])
                .getMany();

            return res.status(200).json({
                status: "success",
                data: albums
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: "server error"
            });
        }
    }
);