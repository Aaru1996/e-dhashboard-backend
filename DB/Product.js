const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
       name:String,
       price:Number,
       category:String,
       userId:String,
       company:String,
       image:String

})

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;