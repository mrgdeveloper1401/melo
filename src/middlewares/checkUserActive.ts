import dotenv from "dotenv";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const envPath = path.resolve(process.cwd(), "../../.env");

dotenv.config({path: envPath});

export const funcCheckUserActive = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const getUser = await userRepository.findOne(
        {
            where: {id: (req as any).user.user_id},
            select: ['id', "is_active"]
        }
    )

    if (!getUser.is_active) {
        return res.status(403).json(
            {
                status: false,
                message: "your account is ben!"
            }
        );
    }

    next();
}