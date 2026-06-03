const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const ObjectId =mongoose.Types.ObjectId;

const userSchema =new Schema({
    email:{type:String, unique:true, sparse:true},
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema =new Schema({
    title:String,
    description:String,
    price:Number,
    img_URL:String,
    creatorId :ObjectId
});

const adminSchema =new Schema({
    email:{type:String, unique:true, sparse:true},
    password:String,
    firstName:String,
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

// Drop the corrupted "emial" index if it exists and recreate the correct "email" index
userModel.collection.dropIndex('emial_1').catch(() => {
    // Index doesn't exist or already dropped, that's fine
});
adminModel.collection.dropIndex('emial_1').catch(() => {
    // Index doesn't exist or already dropped, that's fine
});

module.exports={
    userModel:userModel,
    courseModel:courseModel,
    adminModel:adminModel,
    purchaseModel:purchaseModel
};
