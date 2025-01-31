const express = require("express");
const { CartModel } = require("../DB/Cart");
const { verifyJwtToken } = require("../middlewares/jwtTokenMiddleware");
const cartRoute = express.Router();
const {ObjectId} = require('mongodb')

cartRoute.use(verifyJwtToken);

cartRoute.post("/", async (req, res) => {
  console.log(req.body);
let id= req.body._id
let data= await CartModel.find({_id: id});
  if (req.body && data.length===0) {
    let result = await CartModel.create(req.body);
    res.send(result);
  }else{
    res.send({error:"This item is already added to cart"})
  }
});

cartRoute.get("/", async (req, res) => {
  let id = req.query.cartUserId || "";
  if (id) {
    var result = await CartModel.find({ cartUserId: id });
  } else {
    res.send({ error: "Please send User Id" });
  }
  if (result && result.length > 0) {
    let dataCount = await CartModel.find({ cartUserId: id }).countDocuments();

    res.status(201).send({ data: result, dataCount });
  } else {
    res.send({ error: "This user has not added any item to Cart" });
  }
});


// put and patch method working same
cartRoute.put('/:id', async(req, res)=>{
          let id = req.params.id;
          let bodyData=req.body;
          let data= await CartModel.updateOne({_id: id}, { $set : {...bodyData}})
          res.send(data)
      
})

// delete api

cartRoute.delete('/:id', async(req, res)=>{
        let id= req.params.id;
        let  data = await CartModel.deleteOne({_id: id}) 
        res.send(data);
})

cartRoute.delete('/deleteCart/:cartUserId', async(req, res)=>{
  let id= req.params.cartUserId;
  let  data = await CartModel.deleteMany({cartUserId:id}) 
  res.send(data);
})

module.exports = { cartRoute };
