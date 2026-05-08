const {Router}=require("express");
const userRouter =Router();
const {z}= require("zod");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_KEY_USER ="123";
const {userModel}=require("../db");
userRouter.post("/signup",async(req,res)=>{
const{email,password,firstName,lastName}=req.body;
const requireBody =z.object({
    email:z.string().min(3).max(50),
    password:z.string().min(3).max(50),
    firstName:z.string().min(3).max(50),
    lastName:z.string().min(3).max(50)
})
const parsedDataWithSuccess =requireBody.safeParse(req.body);
if(!parsedDataWithSuccess.success){
    res.json({
      msg:"Incorrect Format",
      error:parsedDataWithSuccess.error
    })
    return
  }
  const hashedPassword =await bcrypt.hash(password,5);
  try{await userModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName
})
  res.json({
    msg:"Signup Succeeded"
  })
}
catch(e){
    res.status(403).json({
        msg:"Wrong Credentials"
    })
}
});
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user = await userModel.findOne({
        email:email
    })
    if (user && await bcrypt.compare(password, user.password)){
        const token =jwt.sign({
            id:user._id
        }, JWT_KEY_USER)
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            msg:"Incorrect Credentials"
        })
    }

});
userRouter.get("/purchases",(req,res)=>{

});
module.exports={
    userRouter:userRouter
}
