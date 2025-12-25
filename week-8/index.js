const express =require("express");
const app =express();
const mongoose =require("mongoose");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const   jwt =require("jsonwebtoken");
const JWT_SECRECT="1234";
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);
async function main(){
    await mongoose.connect("mongodb+srv://manishpayaprapp02_db_user:50DoElmPElDeFCHc@cluster0.sz9hwut.mongodb.net/course-Selling");
    app.listen(3000);
};
main();