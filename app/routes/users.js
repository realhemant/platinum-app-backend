const express = require('express');
const router = express.Router();
var USERS = require('../models/user.model')
var validater=require('email-validator')
console.log(validater.validate("gjgjioj@mail.co"))
router.get('/all', function (req, res) {
    USERS.find()
        .then(results => {
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });

})
router.get('/:id', function (req, res) {
    USERS.findById(req.params.id)
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users by id."
            });
        });

})
router.post('/add', function (req, response) {
    let ob = new USERS(req.body)
    console.log('Object data', ob)
    ob.save(function (err) {
        if (err)
            response.json(err);
        response.json({
            message: 'New user created!',
            data: ob
        });
    })
})
router.delete('/delete/:id', function (req, response) {
    USERS.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            response.json(err);
        response.json({
            message: 'New contact delete!',
            data: req.params.id
        });
    })

})
router.put('/update/:id',function(req,res){
    USERS.findOneAndUpdate({ _id: req.params.id}, req.body, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send(req.body);
  });
      })
module.exports = router;