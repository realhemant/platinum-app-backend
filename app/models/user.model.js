var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSch = new Schema({

  // user = foreignKey
  username:{ 
    type:String,
    unique:true
  },
  password: String,
  email: {
   type: String,
   unique:true
  },
  first_name: String,
  last_name: String,
  status: Boolean,
  is_deleted: Boolean,
});
module.exports = mongoose.model('users', UserSch);