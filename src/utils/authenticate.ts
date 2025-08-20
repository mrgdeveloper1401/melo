import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication credentials were not provided." });
  }
};

export const notAuthenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const checkOne = authHeader === null || authHeader === undefined;
    const checkTwo = authHeader || authHeader.startsWith("Bearer ");
    if (checkOne || checkTwo) {
        return res.status(400).json({message: "Authentication credentials were provided."})
    }
}
