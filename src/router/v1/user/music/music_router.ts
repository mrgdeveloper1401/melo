import {Request, Response, Router} from "express";
import { authenticateJWT } from "../../../../middlewares/authenticate";
import { AppDataSource } from "../../../../data-source";
import { Song } from "../../../../entity/Song";
import { Album } from "../../../../entity/Album";


export const musicRouter = Router();

musicRouter.get(
    "/:album_id/songs/",
    authenticateJWT,
    async (req: Request, res: Response) => {
        try {
            // pagination
            const limit = parseInt(req.query.limit as string) || 20;
            const page = 1;
            const skip = (page - 1) * limit;

            // query params
            const albumId = parseInt(req.params.album_id)
            // get album id by query params
            const albumRepository = AppDataSource.getRepository(Album);
            const getAlbum = await albumRepository.findOne(
                {
                    where: {id: albumId},
                    select: ['id']
                }
            )
            if (!getAlbum) {
                return res.status(404).json(
                    {
                        status: false,
                        message: "album not found"
                    }
                );
            }

            // all songs
            const musicRepository = AppDataSource.getRepository(Song);
            const [songs, count] = await musicRepository.findAndCount(
                {
                    where: {album: getAlbum},
                    take: limit,
                    skip: skip
                }
            );
            return res.status(200).json(
                {
                    status: "success",
                    data: songs,
                    count: count,
                    page: page
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: "server error"
                }
            );
        }
    }

)