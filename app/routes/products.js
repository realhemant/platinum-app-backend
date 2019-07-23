const express = require('express');
const router = express.Router();
var PROD = require('../models/product.model')
router.get('/all', function (req, res) {
    PROD.find()
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });

})
router.get('/:id', function (req, res) {
    PROD.findById(req.params.id)
        .then(results => {
            console.log(results)
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products by id."
            });
        });

})
router.post('/add',function(req,res){
  var pro_obj=new PROD(req.body);
  pro_obj.save(function(err){
if(err)
{
    res.send({
        success:false,
        data:err
    })
}
else{
    res.send({
        success:true,
        data:pro_obj
    })
}
  })
})
router.delete('/delete/:id', function (req, response) {
    PROD.deleteOne({ _id: req.params.id },function (err) {
        if (err)
        response.json(err);
        response.json({
            message: 'product deleted!',
            data: req.params.id
        });
        })
    })
router.put('/update/:id',function(req,res){
        PROD.findOneAndUpdate({ _id: req.params.id}, req.body, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
          return res.send(req.body);
      });
          })
module.exports = router;



