const USERS=require('../models/user.model')
   exports.findAll=((req,res)=>{
    USERS.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
   }) 


exports.findOne=((req,res)=>{
   
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
   
exports.create=((req,res)=>{
    let ob = new USERS(req.body)
    ob.save(function (err) {
        if (err)
          { 
           var n=err.message.search("Path");
           response.send(err.message.substring(n))
        }
        response.json({
            message: 'New user created!',
            data: ob
        });
    })
})
    
exports.delete=((req,res)=>{
    USERS.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            response.json(err);
        response.json({
            message: 'user deleted',
            data: req.params.id
        });
    })
})
exports.update=((req,res)=>{
    USERS.findOneAndUpdate({ _id: req.params.id}, req.body, {upsert:true,runValidators:true}, function(err, doc){
        if (err) return res.send(500, err.message);
        return res.send(req.body);
    });
})


