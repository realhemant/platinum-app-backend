var express=require('express')
var app=express()
app.get('/',function(req,res){
    res.send('succefully connected to server')
    console.log('succefully connected to server')
})
app.listen(3000)