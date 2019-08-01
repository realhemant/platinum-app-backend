var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validater=require('email-validator')
var UserSch = new Schema({
username:{ 
    type:String,
    required: [true, 'user name is required'],
    unique:true
  },
  password:{
  type: String,
  required: [true, 'password is required']
},
  email: {
   type: String,
   required: [true, 'email is required'],
   unique:true,
validate:{
  validator:function(v){
  if(!validater.validate(v))
{
throw Error('email syntax is incorrect!')
}
  }
}
  },
  first_name: String,
  last_name: String,
  status: Boolean,
  is_deleted: Boolean,
  salt:String
});

module.exports = mongoose.model('users', UserSch);