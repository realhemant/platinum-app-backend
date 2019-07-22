var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/navinocart')
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })
app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.send('succefully connected to server')
    console.log('succefully connected to server')
})

app.use('/employees',require('./app/routes/employees'))
app.use('/products',require('./app/routes/products'))
app.use('/users',require('./app/routes/users'))
app.listen(3000)