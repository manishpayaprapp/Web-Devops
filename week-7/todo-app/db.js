const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: String
});

const Todo = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  title: String,
  done: Boolean
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel: UserModel,
  TodoModel: TodoModel
};
