var express = require('express')
var app = express()
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var USERS=require('./app/models/user.model')
var EMP=require('./app/models/emp.model')

mongoose.connect('mongodb+srv://oppo:oppo@learn-mongo-db-xcn8m.mongodb.net/test?retryWrites=true&w=majority')
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

// Gau