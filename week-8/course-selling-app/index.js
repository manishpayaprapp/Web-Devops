const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "1234";
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function auth(req, res, next) {
  next();
}

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://manishpayaprapp01_db_user:123@cluster0.btfgafc.mongodb.net/course_selling_app"
    );
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}

main();