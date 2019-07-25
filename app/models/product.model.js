var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSch = new Schema({
product_name: String,
product_price: String,
product_relese_date: Date,
product_desciption: String,
rating: String,
isDeleted: Boolean,
isSaved: Boolean,
original_img: String,
thumb_img: String
});
module.exports = mongoose.model('products', ProductSch);