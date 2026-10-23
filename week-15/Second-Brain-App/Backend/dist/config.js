"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.PORT = exports.BCRYPT_ROUNDS = exports.DB_URL = exports.JWT_PASSWORD = void 0;
require("dotenv/config");
const jwtSecret = process.env.JWT_PASSWORD;
const mongoUri = process.env.MONGODB_URI;
const bcryptRounds = Number(process.env.BCRYPT_ROUNDS ?? 12);
if (!jwtSecret) {
    throw new Error("JWT_PASSWORD must be set in the backend environment.");
}
if (!mongoUri) {
    throw new Error("MONGODB_URI must be set in the backend environment.");
}
if (!Number.isInteger(bcryptRounds) || bcryptRounds < 10 || bcryptRounds > 15) {
    throw new Error("BCRYPT_ROUNDS must be an integer between 10 and 15.");
}
exports.JWT_PASSWORD = jwtSecret;
exports.DB_URL = mongoUri;
exports.BCRYPT_ROUNDS = bcryptRounds;
exports.PORT = Number(process.env.PORT ?? 3000);
exports.FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
