const express = require('express');
const app = express();

let requestCount = 0;

function Counter(req, res, next) {
    if (req.path === '/admin') {
        return next();
    }
    requestCount += 1;
    next();
}

app.use(Counter);

app.get('/admin', function(req, res) {
    res.send('The Total Count is = ' + requestCount);
});

app.get('/sum/:a/:b', function(req, res) {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    res.json({ ans: a + b });
});

app.get('/sub/:a/:b', function(req, res) {
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    res.json({ ans: a - b });
});

app.listen(3000);
