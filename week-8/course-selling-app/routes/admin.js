const {Router}= require("express");
const adminRouter = Router();
const {userModel, adminModel, courseModel}=require("../db");
const jwt =require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const {z} = require("zod");
const { adminMiddleware } = require("../middleware/admin");
adminRouter.post("/signup",async(req,res)=>{
const {email,password,firstName,lastName}=req.body;
const requireBody =z.object({
    email:z.string().min(3).max(50),
    password:z.string().min(3).max(50),
    firstName:z.string().min(3).max(50),
    lastName:z.string().min(3).max(50)
})
const parsedDataWithSuccess = requireBody.safeParse(req.body);
if(!parsedDataWithSuccess.success){
    res.json({
      msg:"Incorrect Format",
      error:parsedDataWithSuccess.error
    })
    return
}
try{
  const existingAdmin = await adminModel.findOne({ email });
  if (existingAdmin) {
    return res.status(403).json({
      msg: "Admin already exists"
    });
  }

  await adminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  });
  res.json({
    msg: "Signup Succeeded"
  });
}
catch (e) {
  if (e.code === 11000) {
    return res.status(403).json({
      msg: "Admin already exists"
    });
  }
  res.status(500).json({
    msg: "Signup failed",
    error: e.message
  });
}
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
    },JWT_ADMIN_PASSWORD)
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
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
const adminId =req.adminId;
const {title,description,price,img_URL,creatorId}=req.body;
const course = await courseModel.create({
    title,description,price,img_URL,creatorId:adminId
})
res.json({
    message:"Course Created",
    courseId:course._id
})
});
adminRouter.put("/course",adminMiddleware,async(req,res)=>{
const adminId =req.adminId;
const {title,description,price,img_URL,courseId}=req.body;
const course = await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
},
    {
    title,description,price,img_URL
})
res.json({
    message:"Course Updated",
    courseId:course._id
})
});
adminRouter.get("/course/bulk",async(req,res)=>{
const adminId =req.adminId;
const courses = await courseModel.find({
    creatorId:adminId
})
res.json({
    message:"This are all ur courses",
    courses
})
});
module.exports={
    adminRouter:adminRouter
}
