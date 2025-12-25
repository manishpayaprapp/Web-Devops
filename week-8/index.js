const express =require("express");
const app =express();
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const   jwt =require("jsonwebtoken");
const JWT_SECRECT="1234";
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter)
app.listen(3000);