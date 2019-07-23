const express = require('express');
const router = express.Router();
var mc=require('../controllers/user.controller')
var USERS = require('../models/user.model')


router.get('/all', function (req, res) {
mc.findAll(req,res)
})

router.post('/add', function (req, res) {
    mc.create(req,res)
})
router.get('/:id', function (req, res) {
    mc.findOne(req,res)
})

router.delete('/delete/:id', function (req, res) {
   mc.delete(req,res)

})
router.put('/update/:id',function(req,res){
       mc.update(req,res)
      })
module.exports = router;