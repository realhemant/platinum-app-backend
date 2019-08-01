const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var mc = require('../controllers/user.controller')
const USERS = require('../models/user.model')
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
    mc.register(req, res)
})
router.post('/login', function (req, res) {

    USERS.find({ username : req.body.username})
        .then(results => {
            console.log(results.username)
            if (results && results.length == 1) {
                
                        bcrypt.compare(req.body.password, results[0].password, function (err, isPasswordMatch) {
                          
                          console.log(isPasswordMatch)
                            if (isPasswordMatch) {
                                jwt.sign({ results }, "secretkey", (err, token) => {
                                    res.json({
                                        data: results,
                                        token: token
                                    })
                                })
                            }
                            else
                                res.send("wrong password")
                        });
                    }
             
            else
                res.send("Do not match any accout?")
        })
        .catch(err => {
            res.json(err)
        })
})
module.exports = router;