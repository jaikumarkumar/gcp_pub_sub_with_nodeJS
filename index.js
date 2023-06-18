const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// parse application/json 
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.get('/test', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))