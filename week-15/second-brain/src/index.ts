import express from "express";
import { random } from "./utils.js";
import {z} from "zod";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD , noOfRounds} from "./config.js";
import { userMiddleware } from "./middleware.js";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

const signinSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

app.post("/api/v1/signup", async (req, res) => {

    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
        return;
    }

    const { username, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, noOfRounds);

    try {
        await UserModel.create({
            username,
            password: hashedPassword
        });

        res.json({
            message: "User signed up"
        });

    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {

    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
        return;
    }

    const { username, password } = result.data;
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }

    if (!existingUser.password) {
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }

    const token = jwt.sign(
        {
            id: existingUser._id
        },
        JWT_PASSWORD
    );

    res.json({
        token
    });
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteOne({
        _id: contentId,
        // @ts-ignore
        userId: req.userId
    });

    res.json({
        message: "Deleted"
    });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                // @ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);