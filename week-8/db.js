const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// USER SCHEMA
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String
});

// COURSE SCHEMA
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  img_URL: String,
  creatorId: ObjectId
});

// ADMIN SCHEMA
const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String
});

// PURCHASE SCHEMA
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId
});

// MODELS
const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  courseModel,
  adminModel,
  purchaseModel
};
