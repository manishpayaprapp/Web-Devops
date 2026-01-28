const express = require('express');
const jwt =require('jsonwebtoken');
const app = express();
const cors = require("cors");
app.use(express.json());
const users =[];
const JWT_SECRET ="123"
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.use(cors({
    origin: "http://localhost:51854"
}));
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password =req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        msg:"You are singed up"
    })
    console.log(users)
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password =req.body.password;
    const user = users.find((n)=> n.username == username && n.password == password);
            if(user){
            const token = jwt.sign({
                username:username
            },JWT_SECRET)
            users.token =token;
            res.json({
                token:token
            })
        }
        else{
        res.status(403).send({
        message: "Invalid username or password"
        })
        }
        console.log(users)
});
app.use(auth);
app.get("/me", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})

app.listen(3000);
