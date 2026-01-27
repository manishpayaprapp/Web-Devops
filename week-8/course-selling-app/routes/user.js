const {Router}=require("express");
const userRouter =Router();
const {z}= require("zod");
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
})}
catch(e){
    res.status(403).json({
        msg:"Wrong Cridentials"
    })
}
});
userRouter.post("/login",(req,res)=>{

});
userRouter.get("/purchases",(req,res)=>{

});
module.exports={
    userRouter:userRouter
}
