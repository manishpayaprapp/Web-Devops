"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.FRONTEND_URL }));
app.use(express_1.default.json({ limit: "32kb" }));
const asyncHandler = (handler) => (req, res, next) => {
    void handler(req, res, next).catch(next);
};
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().trim().min(3).max(32),
    password: zod_1.z.string().min(8).max(128)
        .regex(/[A-Z]/, "Password must contain an uppercase letter.")
        .regex(/[a-z]/, "Password must contain a lowercase letter.")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character."),
});
const signinSchema = zod_1.z.object({
    username: zod_1.z.string().trim().min(1).max(32),
    password: zod_1.z.string().min(1).max(128),
});
const contentSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1).max(120),
    link: zod_1.z.string().trim().url().max(2048).refine((value) => {
        const protocol = new URL(value).protocol;
        return protocol === "http:" || protocol === "https:";
    }, "Link must use HTTP or HTTPS."),
    type: zod_1.z.enum(["youtube", "twitter"]),
});
app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok", database: "connected" });
});
app.post("/api/v1/signup", asyncHandler(async (req, res) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid sign up details." });
        return;
    }
    const password = await bcrypt_1.default.hash(parsed.data.password, config_1.BCRYPT_ROUNDS);
    try {
        await db_1.UserModel.create({ username: parsed.data.username, password });
    }
    catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
            res.status(409).json({ message: "That username is already taken." });
            return;
        }
        throw error;
    }
    res.status(201).json({ message: "Account created. You can now sign in." });
}));
app.post("/api/v1/signin", asyncHandler(async (req, res) => {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid sign in details." });
        return;
    }
    const user = await db_1.UserModel.findOne({ username: parsed.data.username });
    if (!user || !(await bcrypt_1.default.compare(parsed.data.password, user.password))) {
        res.status(401).json({ message: "Incorrect username or password." });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_PASSWORD, { expiresIn: "7d" });
    res.json({ token });
}));
app.post("/api/v1/content", middleware_1.userMiddleware, asyncHandler(async (req, res) => {
    const parsed = contentSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid content details." });
        return;
    }
    const content = await db_1.ContentModel.create({
        ...parsed.data,
        userId: req.userId,
    });
    res.status(201).json({ message: "Content added.", content });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, asyncHandler(async (req, res) => {
    const content = await db_1.ContentModel.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .select("title link type createdAt");
    res.json({ content });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, asyncHandler(async (req, res) => {
    const contentId = zod_1.z.string().safeParse(req.body?.contentId);
    if (!contentId.success || !/^[a-f\d]{24}$/i.test(contentId.data ?? "")) {
        res.status(400).json({ message: "A valid content ID is required." });
        return;
    }
    const result = await db_1.ContentModel.deleteOne({ _id: contentId.data, userId: req.userId });
    if (result.deletedCount === 0) {
        res.status(404).json({ message: "Content not found." });
        return;
    }
    res.json({ message: "Content deleted." });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, asyncHandler(async (req, res) => {
    const parsed = zod_1.z.object({ share: zod_1.z.boolean() }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "The share setting must be true or false." });
        return;
    }
    if (!parsed.data.share) {
        await db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Sharing disabled." });
        return;
    }
    const existingLink = await db_1.LinkModel.findOne({ userId: req.userId });
    if (existingLink) {
        res.json({ hash: existingLink.hash });
        return;
    }
    const link = await db_1.LinkModel.create({ userId: req.userId, hash: (0, utils_1.random)(16) });
    res.json({ hash: link.hash });
}));
app.get("/api/v1/brain/:shareLink", asyncHandler(async (req, res) => {
    const link = await db_1.LinkModel.findOne({ hash: req.params.shareLink });
    if (!link) {
        res.status(404).json({ message: "This shared collection does not exist or is no longer available." });
        return;
    }
    const [user, content] = await Promise.all([
        db_1.UserModel.findById(link.userId).select("username"),
        db_1.ContentModel.find({ userId: link.userId }).sort({ createdAt: -1 }).select("title link type createdAt"),
    ]);
    if (!user) {
        res.status(404).json({ message: "This shared collection is no longer available." });
        return;
    }
    res.json({ username: user.username, content });
}));
app.use((_req, res) => {
    res.status(404).json({ message: "Endpoint not found." });
});
const errorHandler = (error, _req, res, _next) => {
    console.error("API request failed:", error);
    if (res.headersSent)
        return;
    res.status(500).json({ message: "Something went wrong. Please try again." });
};
app.use(errorHandler);
async function startServer() {
    if (!Number.isInteger(config_1.PORT) || config_1.PORT < 1 || config_1.PORT > 65535) {
        throw new Error("PORT must be a valid TCP port.");
    }
    await (0, db_1.connectDatabase)();
    app.listen(config_1.PORT, () => {
        console.log(`Brainly API is listening on port ${config_1.PORT}.`);
    });
}
void startServer().catch((error) => {
    console.error("Backend startup failed:", error);
    process.exitCode = 1;
});
