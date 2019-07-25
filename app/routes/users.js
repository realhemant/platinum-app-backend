const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')

var mc = require('../controllers/user.controller')

router.get('/all', function (req, res) {
    mc.findAll(req, res)
})

router.post('/add', function (req, res) {
    mc.create(req, res)
})
router.get('/:id', function (req, res) {
    mc.findOne(req, res)
})

router.delete('/delete/:id', function (req, res) {
    mc.delete(req, res)

})
router.put('/update/:id', function (req, res) {
    mc.update(req, res)
})
router.post('/register', function (req, res) {
   mc.register(req,res)
}) 
router.post('/login', function (req, res) {
    const USERS=require('../models/user.model')

    USERS.find(req.body)
    .then(notes => {
        jwt.sign({ notes }, "secretkey", (err, token) => {
            res.json({
                data: notes,
                token: token
    
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
})
module.exports = router;