import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header || typeof header !== "string") {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD);

        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }

        // @ts-ignore
        req.userId = (decoded as JwtPayload).id;
        next();
    } catch (error) {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};