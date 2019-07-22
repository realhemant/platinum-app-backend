const express = require('express');
const router = express.Router();
var USERS = require('../models/user.model')


router.get('/all', function (req, res) {
    USERS.find()
        .then(results => {
            console.log(results)
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
    let ob =  new USERS(req.body) 
  console.log('Object data',ob)
  ob.save(function (err) {
    if (err)
    response.json(err);
    response.json({
        message: 'New contact created!',
        data: ob
    });
    })
})
router.delete('/delete/:id', function (req, response) {
    USERS.deleteOne({ _id: req.params.id },function (err) {
        if (err)
        response.json(err);
        response.json({
            message: 'New contact delete!',
            data: req.params.id
        });
        })
    
})

//  EDIT FOR USER METHOD PUT USE


// DELETE FOR USER METHOD USE delete

module.exports = router;