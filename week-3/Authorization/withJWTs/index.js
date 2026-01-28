const express = require('express');
const jwt =require('jsonwebtoken');
const app = express();
app.use(express.json());
const users =[];
const JWT_SECRET ="iLOVE 123"
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

app.get("/me",(req,res)=>{
    const token = req.headers.authorization;
    const decodedinfo =jwt.verify(token,JWT_SECRET);
    const username = decodedinfo.username;
    const user =users.find(user =>user.username==username);
    if(user){
        res.json({
            username:user.username,
            password:user.password
        })
    } 
    else{
        res.json({
            msg:"You are not authorized"
        })
    }  
})

app.listen(3000);
