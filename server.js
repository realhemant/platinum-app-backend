var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://oppo:oppo@learn-mongo-db-xcn8m.mongodb.net/test?retryWrites=true&w=majority')
.then(success=>{}).catch(failure=>{
  console.log(failure)
  process.exit(0)
})

var db=mongoose.connection;
db.on('error',console.error.bind(console))
db.once('open',()=>{
    console.log('connected to database')
})
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/employees', require('./app/routes/employees'))
app.use('/products', require('./app/routes/products'))
app.use('/users', require('./app/routes/users'))
app.listen(8080)
