const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://manishpayaprapp02_db_user:50DoElmPElDeFCHc@cluster0.sz9hwut.mongodb.net/Course-Selling")
const Schema =mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;
const userSchema =new Schema({
emial:{type:String,unique:true},
password:String,
fisrtName:String,
lastName:String
});
const courseSchema =new Schema({
title:String,
discription:String,
price:Number,
img_URL:String,
creatorId :ObjectId
});
const adminSchema =new Schema({
emial:{type:String,unique:true},
password:String,
fisrtName:String,
lastName:String
});
const purchaseSchema =new Schema({
userId:ObjectId,
courseId:ObjectId
});
const userModel =mongoose.model("user",userSchema);
const courseModel =mongoose.model("course",courseSchema);
const adminModel =mongoose.model("admin",adminSchema);
const purchaseModel =mongoose.model("purchase",purchaseSchema);
module.exports={
    userModel:userModel,
    courseModel:courseModel,
    adminModel:adminModel,
    purchaseModel:purchaseModel
};
