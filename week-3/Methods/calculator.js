const express =require("express");
const app =express();
app.get('/multiply',function(req,res){
    let a = req.query.a;
    let b =req.query.b;
    let ans =a*b
    res.json({
        ans:ans
    })
})
app.get('/divide',function(req,res){
    let a = req.query.a;
    let b =req.query.b;
    let ans =a/b
    res.json({
        ans:ans
    })
})
app.get('/sum',function(req,res){
    let a =parseInt(req.query.a);
    let b =parseInt(req.query.b);
    let ans =a+b
    res.json({
        ans:ans
    })
})
app.get('/subtraction',function(req,res){
    let a = parseInt(req.query.a);
    let b =parseInt(req.query.b);
    let ans =a-b
    res.json({
        ans:ans
    })
})
app.get('/mod',function(req,res){
    let a = req.query.a;
    let b =req.query.b;
    let ans =a%b
    res.json({
        ans:ans
    })
})

app.listen(3000)
