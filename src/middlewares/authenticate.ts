import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({path: envPath});


export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication credentials were not provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(
      {
        status: false,
        message: "Invalid or expired token."
      }
    )
  }
};

export const notAuthenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next();
    }
    const checkOne = authHeader === null;
    const checkTwo = (authHeader || authHeader.startsWith("Bearer "));
    if (checkOne || checkTwo) {
            return res.status(400).json({message: "Authentication credentials were provided."})
    }
}
