const express = require("express");
const cors = require("cors");
require("./DB/config");
const UserModel = require("./DB/User");
const ProductModel = require("./DB/Product");
const {userRoute} = require('./controllers/userController')
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { productsController } = require("./controllers/productController");
const { cartRoute } = require("./controllers/cartController");
const jwtKey = "jwt-e-commerce";
// jwtkey should be private, bcz it help to create jwt token

app.use(express.json()); //  it is used to parse JSON data
app.use(cors()); // it allows all origin  {origin : http://localhost:3000 --> it is frontend ui origin }

app.use('/user',userRoute )
app.use('/products', productsController)
app.use('/cart', cartRoute)
 
// app.post("/register", async (req, res) => {
//   let data = new UserModel({ ...req.body });
//   let result = await data.save();
//   //   remove password before sending to client
//   result = result.toObject(); //it willconvert result into object then we can delete key easily
//   delete result.password;

//   if (result) {
//     jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (error, token) => {
//       if (token) res.send({ result, token });
//       else res.send("Something Went wrong");
//     });
//   }
// });

// app.post("/login", async (req, res) => {
//   if (req.body.email && req.body.password) {
//     let data = await UserModel.findOne(req.body).select("-password");
//     //  -password field will be selected and deleted from data.
//     // hence we will not get password in fronend
//     //if user will not match then data will be empty array

//     if (data) {
//       jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (error, token) => {
//         if (token) {
//           res.send({ data, token });
//         } else {
//           res.send("Something went wrong.");
//         }
//       });

//       //  .sign() it inbuild function of jwt
//       // it takes three parameter data in form of object, privateKey(jwtKey),
//       // expireIn --> This token will expire in given time. we can remove this parameter
//       //  third parameter is callback function which has two parameter error and token
//     } else res.send({ result: "User Not Found" });
//   } else {
//     res.send({ result: "User Not Found" });
//   }
// });

// for products

// app.post("/add-product", veriyJwtToken, async (req, res) => {
//   let data = new ProductModel({ ...req.body });
//   let result = await data.save();
//   res.send(result);
// });

// app.get("/products",veriyJwtToken, async (req, res) => {
//      let page = Number(req.query.page) || 1;
//      let limit =Number(req.query.limit) || 2;
   
//      let dataCount = await ProductModel.countDocuments();
//     //  it is used to find data in 
//      console.log(page,limit,dataCount)
//   let data = await ProductModel.find({}).skip((page-1)*limit).limit(limit);
//   if (data.length > 0) {
//     res.send({data, dataCount});
//   } else {
//     res.send("No Products Available");
//   }
// });
// app.delete("/product/:id",veriyJwtToken, async (req, res) => {
//   let result = await ProductModel.deleteOne({ _id: req.params.id });
//   res.send(result);
// });

// app.get("/product/:id", veriyJwtToken, async (req, res) => {
//   let result = await ProductModel.findOne({ _id: req.params.id });
//   if (result) res.send(result);
//   else res.send("No Record Found");
// });

// // update api
// app.put("/product/:id", veriyJwtToken, async (req, res) => {
//   console.log(req.body);

//   let result = await ProductModel.updateOne(
//     { _id: req.params.id },
//     {
//       $set: { ...req.body },
//     }
//   );
//   res.send(result);
// });

// search api
// app.get("/search/:key", veriyJwtToken, async (req, res) => {
//   let page = Number(req.query.page) || 1;
//   let limit =Number(req.query.limit) || 2;

//   let dataCount = await ProductModel.countDocuments();
//  //  it is used to find data in 
//   console.log(page,limit,dataCount)
// // let data = await ProductModel.find({}).skip((page-1)*limit).limit(limit);
//   let result = await ProductModel.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       // {price : {$regex : req.params.key}}
//       //  here we are getting error bcz price can not be string
//       { category: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//     ],
//   }).skip((page-1)*limit).limit(limit);

//   res.send({data:result,dataCount});
// });

// middleware to veriy jwt token
// middleware takes three parameter req, res and next
// and pass this middleware fucn as 2nd parameter in required route

// function veriyJwtToken(req, res, next) {
//   let token = req.headers["authorization"];
//   //"authorization" is key name in headers which is passed from frontend
//   // console.log(token);
//   if (token) {
//     token = token.split(" ")[1];
//     //  while sending jwt token a bearer keyword is passed before token
//     // so, token is needed only not bearer keyword, so split it
//     jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         res.status(401).send({ error: "Please send valid token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({ error: "Please send token with headers" });
//   }
// }

const PORT = process.env.PORT ||  8000

app.listen(PORT, () => {
  console.log("server running");
});

// npm i jsonwebtoken --> command to install jwt validation library
// see jwt npm package
