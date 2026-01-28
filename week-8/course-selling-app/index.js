const express =require("express");
const app =express();
const mongoose =require("mongoose");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const   jwt =require("jsonwebtoken");
const JWT_SECRECT="1234";
app.use(express.json());
async function auth(req,res,next){
    
}
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);
async function main(){
    await mongoose.connect("mongodb+srv://manishpayaprapp01_db_user:pizt1UqjeQvbreDV@cluster0.gamiiqo.mongodb.net/");
    app.listen(3000);
};
main();
