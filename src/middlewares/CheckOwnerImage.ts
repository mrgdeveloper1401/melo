import { NextFunction, Request, Response } from "express";
import { Image } from "../entity/Image";
import { AppDataSource } from "../data-source";

export const checkImageOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.user_id;
    const imageId = req.body.profile_image_id || req.body.banner_image_id || req.body.banner_galery_image_id;

    if (imageId) {
        const imageRepository = AppDataSource.getRepository(Image);
        const image = await imageRepository.findOne(
            {
                where: { id: imageId, user: userId },
                relations: ['user'],
                select: {
                    id: true,
                    user: {
                        id: true
                    }
                }
            }
        );
    }
        if (!Image) {
            return res.status(404).json(
                {
                    status: false,
                    message: "image not found"
                }
            )
        }
    next();
}
