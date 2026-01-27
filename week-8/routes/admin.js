const {Router}= require("express");
const adminRouter = Router();
const {z}= require("zod");
const {userModel}=require("../db");
adminRouter.post("/signup",async(req,res)=>{
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
adminRouter.post("/signin",(req,res)=>{

});
adminRouter.post("/course",(req,res)=>{

});
adminRouter.put("/course",(req,res)=>{

});
adminRouter.get("/coursebulk",(req,res)=>{

});
module.exports={
    adminRouter:adminRouter
}
