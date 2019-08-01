const express = require('express');
const router = express.Router();
var mc = require('../controllers/user.controller')
router.get('/all', function (req, res) {
    mc.findAll(req, res)
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
    mc.login(req,res)
})

module.exports = router;