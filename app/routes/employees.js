const express = require('express');
const router = express.Router();
var EMPS = require('../models/emp.model')
router.get('/all', function (req, res) {
    EMPS.find()
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        });

})

router.get('/:id', function (req, res) {
    EMPS.findById(req.params.id)
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees by id."
            });
        });

})

router.post('/add', function (req, response) {
    let ob =  new EMPS(req.body) 
  ob.save(function (err) {
    if (err)
    response.json(err);
    response.json({
        message: 'succefully added employee',
        data: ob
    });
    })
})
router.delete('/delete/:id', function (req, response) {
    EMPS.deleteOne({ _id: req.params.id },function (err) {
        if (err)
        response.json(err);
        response.json({
            message: 'employee deleted!',
            data: req.params.id
        });
        })
    
})

router.put('/update/:id',function(req,res){
    var mObj=new EMPS(req.body);
    var upsertData=mObj.toObject()
    EMPS.update({_id: req.params.id}, upsertData, {upsert: false},function(err){
        if(err)
       res.json(err)
        else{
            res.send({
message:'employee updated',
data:req.params.id
            })
        }
    }

    );
})
module.exports = router;