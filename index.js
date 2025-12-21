const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRECT = "Key123";
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://manishpayaprapp02_db_user:50DoElmPElDeFCHc@cluster0.sz9hwut.mongodb.net/todo-Manish"
);

const { UserModel, TodoModel } = require("./db.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name
  });

  res.json({
    msg: "you are signed up"
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password
  });

  if (user) {
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

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRECT);

  if (decodedData) {
    req.Userid = decodedData.id;
    next();
  } else {
    res.status(403).json({
      msg: "Wrong cridentials"
    });
  }
}

app.listen(3000);
