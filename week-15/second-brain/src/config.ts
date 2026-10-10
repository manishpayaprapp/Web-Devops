import "dotenv/config";

const jwtPassword = process.env.JWT_PASSWORD;
const bcryptRounds = Number(process.env.BCRYPT_ROUNDS);
const dbUrl = process.env.MONGODB_URI;

if (!jwtPassword) {
    throw new Error("JWT_PASSWORD must be set in the environment");
}

if (!Number.isInteger(bcryptRounds) || bcryptRounds < 4 || bcryptRounds > 31) {
    throw new Error("BCRYPT_ROUNDS must be an integer between 4 and 31");
}

if (!dbUrl) {
    throw new Error("MONGODB_URI must be set in the environment");
}

export const JWT_PASSWORD = jwtPassword;
export const noOfRounds = bcryptRounds;
export const DBUrl = dbUrl;
