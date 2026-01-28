const {Router}= require("express");
const adminRouter = Router();
const {z}= require("zod");
const {userModel}=require("../db");
adminRouter.post("/signup",async(req,res)=>{
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
