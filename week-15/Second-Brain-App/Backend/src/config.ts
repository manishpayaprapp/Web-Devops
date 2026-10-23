import "dotenv/config";

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

export const JWT_PASSWORD = jwtSecret;
export const DB_URL = mongoUri;
export const BCRYPT_ROUNDS = bcryptRounds;
export const PORT = Number(process.env.PORT ?? 3000);
export const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
