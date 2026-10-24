import express, { type ErrorRequestHandler, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { BCRYPT_ROUNDS, FRONTEND_URL, JWT_PASSWORD, PORT } from "./config";
import { connectDatabase, ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();

const envOrigins = FRONTEND_URL
  ? FRONTEND_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : [];

const allowedOrigins = new Set([
  "https://b2.manishsp.tech",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  ...envOrigins,
]);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, server-to-server, curl)
    if (!origin) return callback(null, true);

    const normalized = origin.replace(/\/$/, "");

    // Allow exact matches in whitelist, subdomains of manishsp.tech, and local dev
    const isAllowed =
      allowedOrigins.has(normalized) ||
      /^https:\/\/([a-z0-9-]+\.)*manishsp\.tech$/.test(normalized) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalized);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "32kb" }));

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
const asyncHandler = (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
  void handler(req, res, next).catch(next);
};

const signupSchema = z.object({
  username: z.string().trim().min(3).max(32),
  password: z.string().min(8).max(128)
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character."),
});

const signinSchema = z.object({
  username: z.string().trim().min(1).max(32),
  password: z.string().min(1).max(128),
});

const contentSchema = z.object({
  title: z.string().trim().min(1).max(120),
  link: z.string().trim().url().max(2048).refine((value: string) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "Link must use HTTP or HTTPS."),
  type: z.enum(["youtube", "twitter"]),
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

  const password = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS);
  try {
    await UserModel.create({ username: parsed.data.username, password });
  } catch (error) {
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

  const user = await UserModel.findOne({ username: parsed.data.username });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
    res.status(401).json({ message: "Incorrect username or password." });
    return;
  }

  const token = jwt.sign({ id: user.id }, JWT_PASSWORD, { expiresIn: "7d" });
  res.json({ token });
}));

app.post("/api/v1/content", userMiddleware, asyncHandler(async (req, res) => {
  const parsed = contentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid content details." });
    return;
  }

  const content = await ContentModel.create({
    ...parsed.data,
    userId: req.userId,
  });
  res.status(201).json({ message: "Content added.", content });
}));

app.get("/api/v1/content", userMiddleware, asyncHandler(async (req, res) => {
  const content = await ContentModel.find({ userId: req.userId })
    .sort({ createdAt: -1 })
    .select("title link type createdAt");
  res.json({ content });
}));

app.delete("/api/v1/content", userMiddleware, asyncHandler(async (req, res) => {
  const contentId = z.string().safeParse(req.body?.contentId);
  if (!contentId.success || !/^[a-f\d]{24}$/i.test(contentId.data ?? "")) {
    res.status(400).json({ message: "A valid content ID is required." });
    return;
  }

  const result = await ContentModel.deleteOne({ _id: contentId.data, userId: req.userId });
  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Content not found." });
    return;
  }
  res.json({ message: "Content deleted." });
}));

app.post("/api/v1/brain/share", userMiddleware, asyncHandler(async (req, res) => {
  const parsed = z.object({ share: z.boolean() }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "The share setting must be true or false." });
    return;
  }

  if (!parsed.data.share) {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Sharing disabled." });
    return;
  }

  const existingLink = await LinkModel.findOne({ userId: req.userId });
  if (existingLink) {
    res.json({ hash: existingLink.hash });
    return;
  }

  const link = await LinkModel.create({ userId: req.userId, hash: random(16) });
  res.json({ hash: link.hash });
}));

app.get("/api/v1/brain/:shareLink", asyncHandler(async (req, res) => {
  const link = await LinkModel.findOne({ hash: req.params.shareLink });
  if (!link) {
    res.status(404).json({ message: "This shared collection does not exist or is no longer available." });
    return;
  }

  const [user, content] = await Promise.all([
    UserModel.findById(link.userId).select("username"),
    ContentModel.find({ userId: link.userId }).sort({ createdAt: -1 }).select("title link type createdAt"),
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

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (error instanceof Error && error.message.includes("CORS")) {
    res.status(403).json({ message: "Access forbidden by CORS policy." });
    return;
  }
  console.error("API request failed:", error);
  if (res.headersSent) return;
  res.status(500).json({ message: "Something went wrong. Please try again." });
};
app.use(errorHandler);

async function startServer(): Promise<void> {
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid TCP port.");
  }
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Brainly API is listening on port ${PORT}.`);
  });
}

void startServer().catch((error: unknown) => {
  console.error("Backend startup failed:", error);
  process.exitCode = 1;
});


