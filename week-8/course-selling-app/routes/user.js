const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, lastName } = req.body;
    
    // Zod validation
    const requireBody = z.object({
        email: z.string().min(3).max(50),
        password: z.string().min(3).max(50),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    });
    
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        });
    }

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 5);
        
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        
        res.json({
            message: "Signup succeeded"
        });
    } catch (e) {
        console.log("Signup error:", e);
        // Handle duplicate email error
        if (e.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        res.status(500).json({
            message: "Signup failed",
            error: e.message
        });
    }
});

userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email: email
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                id: user._id,
            }, JWT_USER_PASSWORD);

            res.json({
                token: token
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Signin failed",
            error: e.message
        });
    }
});

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i < purchases.length; i++) {
        purchasedCourseIds.push(purchases[i].courseId);
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    });

    res.json({
        purchases,
        coursesData
    });
});

module.exports = {
    userRouter: userRouter
};
