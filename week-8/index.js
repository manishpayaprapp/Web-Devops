const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use(express.json());

// ROUTES
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

// DB CONNECTION + SERVER START
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://manishpayaprapp01:Something023@cluster0.snbsjff.mongodb.net/courseApp"
    );

    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("DB connection failed", err);
  }
}

main();
