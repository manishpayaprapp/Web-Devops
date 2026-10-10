"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("./config.js");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header || typeof header !== "string") {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }
    const token = header.startsWith("Bearer ") ? header.slice(7) : header;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_js_1.JWT_PASSWORD);
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
