const PROD=require('../models/product.model')
   exports.findAll=((req,res)=>{
    PROD.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving PROD."
        });
    });
   }) 


exports.findOne=((req,res)=>{
        PROD.findById(req.params.id)
            .then(results => {
                console.log(results)
                res.send(results);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving PROD by id."
                });
            });
    
})
   
exports.create=((req,res)=>{
    let ob = new PROD(req.body)
    ob.save(function (err) {
        if (err)
          { 
           var n=err.message.search("Path");
           res.send(err.message.substring(n))
        }
        res.json({
            message: 'New user created!',
            data: ob
        });
    })
})
    
exports.delete=((req,res)=>{
    PROD.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'user deleted',
            data: req.params.id
        });
    })
})
exports.update=((req,res)=>{
    PROD.findOneAndUpdate({ _id: req.params.id}, req.body, {upsert:true,runValidators:true}, function(err, doc){
        if (err) return res.send(500, err.message);
        return res.send(req.body);
    });
})


