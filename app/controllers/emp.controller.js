const EMPS = require('../models/emp.model')


exports.findAll = ((req, res) => {
    EMPS.find()
        .then(results => {
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EMPS."
            });
        });
})


exports.findOne = ((req, res) => {

    EMPS.findById(req.params.id)
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EMPS by id."
            });
        });
})

exports.create = ((req, res) => {
    let ob = new EMPS(req.body)
    ob.save(function (err) {
        if (err) {
            var n = err.message.search("Path");
            res.send(err.message.substring(n))
        }
        res.json({
            message: 'New user created!',
            data: ob
        });
    })
})

exports.delete = ((req, res) => {
    EMPS.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'user deleted',
            data: req.params.id
        });
    })
})
exports.update = ((req, res) => {
    EMPS.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, runValidators: true }, function (err, doc) {
        if (err) return res.send(500, err.message);
        return res.send(req.body);
    });
})


