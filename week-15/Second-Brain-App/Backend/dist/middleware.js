"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function userMiddleware(req, res, next) {
    const authorization = req.header("authorization");
    const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : authorization;
    if (!token) {
        res.status(401).json({ message: "You are not logged in." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        if (typeof decoded === "string" || typeof decoded.id !== "string") {
            res.status(401).json({ message: "Your session is invalid. Please sign in again." });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(401).json({ message: "Your session has expired. Please sign in again." });
    }
}
