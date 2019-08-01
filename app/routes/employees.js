const express = require('express');
const router = express.Router();
var mc = require('../controllers/emp.controller')
var jwt = require('jsonwebtoken')

router.get('/all', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err)
            res.sendStatus(403)
        else {
            mc.findAll(req, res)
        }
    })
})

router.post('/add', function (req, res) {
    mc.create(req, res)
})
router.get('/:id', verifyToken, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err)
            res.sendStatus(403)
        else {
            mc.findOne(req, res)
        }
    })
})

router.delete('/delete/:id', function (req, res) {
    mc.delete(req, res)

})
router.put('/update/:id', function (req, res) {
    mc.update(req, res)
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = router;
