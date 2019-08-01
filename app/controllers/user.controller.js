const USERS=require('../models/user.model')
var jwt=require('jsonwebtoken')
var bcrypt=require('bcrypt');
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
           res.send(err.message.substring(n))
        }
        res.json({
            message: 'New user created!',
            data: ob
        });
    })
})
exports.register=((req,res)=>{
   bcrypt.genSalt(10, function(err, salt) {
req.body.salt=salt;
        if (err) 
       res.json(err)
    else
    {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          console.log(hash)
          let ob = new USERS(req.body)
          ob.password=hash;
          ob.save(function (err) {
            if (err)
              { 
               var n=err.message.search("Path");
               res.send(err.message.substring(n))
            }
            jwt.sign({ob},"secretkey",(err,token)=>{
    res.json({
        data:ob,
        token:token
    })
            })
        })

        });

    }
      });
})
exports.delete=((req,res)=>{
    USERS.deleteOne({ _id: req.params.id }, function (err) {
        if (err)
            res.json(err);
        res.json({
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

