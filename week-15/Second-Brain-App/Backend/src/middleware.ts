import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function userMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.header("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : authorization;
  if (!token) {
    res.status(401).json({ message: "You are not logged in." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD);
    if (typeof decoded === "string" || typeof (decoded as JwtPayload).id !== "string") {
      res.status(401).json({ message: "Your session is invalid. Please sign in again." });
      return;
    }
    req.userId = (decoded as JwtPayload).id as string;
    next();
  } catch {
    res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
}
