const {Router}= require("express");
const adminRouter = Router();
const {userModel, adminModel}=require("../db");
const jwt =require("jsonwebtoken");
const JWT_ADMIN="234";
adminRouter.post("/signup",async(req,res)=>{
const {email,password,firstName,lastName}=req.body;

await adminModel.create({
    email:email,
    password:password,
    firstName:firstName,
    lastName:lastName
})
res.json({
    msg:"Signup Succeeded"
})
});
adminRouter.post("/signin",async(req,res)=>{
const {email,password}=req.body;
const admin =await adminModel.findOne({
    email:email,
    password:password
})
if (admin){
    const token =jwt.sign({
        id:admin._id
    },JWT_ADMIN)
    res.json({
        token:token
    })
}
else{
    res.status(403).json({
        msg:"Incorrect credential"
    })
}
});
adminRouter.post("/course",(req,res)=>{

});
adminRouter.put("/course",(req,res)=>{

});
adminRouter.get("/course/bulk",(req,res)=>{
res.json({
    msg:"Hello from the course/bulk"
})
});
module.exports={
    adminRouter:adminRouter
}
