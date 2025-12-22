const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "Key123";
const mongoose = require("mongoose");
const {z}=require("zod");

mongoose.connect(
  "mongodb+srv://manishpayaprapp02_db_user:50DoElmPElDeFCHc@cluster0.sz9hwut.mongodb.net/todo-Manish"
);

const { UserModel, TodoModel } = require("./db.js");
const {auth}= require("./auth.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const requireBody = z.object({
    email:z.string().min(3).max(50).email(),
    password:z.string().min(3).max(50),
    name:z.string().min(3).max(50)
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
  try{
    await UserModel.create({
    email: email,
    password: hashedPassword,
    name: name
  });
  }
  catch(e){
    throw new Error("Muitple tabs are Not Allowed !!")
  }
    res.json({
    msg: "you are signed up"
  });
  
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  const user = await UserModel.findOne({
    email: email,
  });
  const passwordMatch = bcrypt.compare(password,user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRECT
    );

    res.json({ token });
  } else {
    res.status(403).json({
    msg: "Wrong Credentials"
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userid = req.Userid;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId: userid, 
    title: title,
    done: done
  });

  res.json({
    msg: "Todo is added"
  });
});

app.get("/todos", auth, async (req, res) => {
  const userid = req.Userid;

  const todos = await TodoModel.find({
    userId: userid 
  });

  res.json({
    todos: todos
  });
});
app.listen(3000);
