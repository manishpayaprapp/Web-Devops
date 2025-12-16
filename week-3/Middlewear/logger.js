const express = require('express');
const app = express();

let requestCount = 0;

function infoPrinter(req,res,next){
console.log("The URL is :"+req.path);
console.log("The Method is :"+req.method);
console.log(new Date());
next();
}
app.use(infoPrinter);

app.get('/admin', function(req, res) {
    res.send('The Total Count is = ' + requestCount);
});

app.get('/sum', function(req, res) {
    res.json({
        msg:'Hello From sum'
    })
});

app.get('/sub', function(req, res) {
    res.json({
        msg:'Hello From sub'
    })
});

app.listen(3000);
