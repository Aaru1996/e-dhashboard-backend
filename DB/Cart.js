const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
          name:String,
          company:String,
          category:String,
          price:Number,
          image:String,
          cartUserId:String,
          qty:Number,
          totalPrice:Number
})

const CartModel = mongoose.model('carts', CartSchema);

module.exports={CartModel}