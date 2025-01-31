const express = require('express');
const userRoute=express.Router();
const UserModel = require('../DB/User')
const jwt = require("jsonwebtoken");
const jwtKey = "jwt-e-commerce";


userRoute.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
      let data = await UserModel.findOne(req.body).select("-password");
      //  -password field will be selected and deleted from data.
      // hence we will not get password in fronend
      //if user will not match then data will be empty array
  
      if (data) {
        jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (error, token) => {
          if (token) {
            res.send({ data, token });
          } else {
            res.send({error:"Something went wrong."});
          }
        });
  
        //  .sign() it inbuild function of jwt
        // it takes three parameter data in form of object, privateKey(jwtKey),
        // expireIn --> This token will expire in given time. we can remove this parameter
        //  third parameter is callback function which has two parameter error and token
      } else res.send({ error: "User Not Found" });
    } else {
      res.send({ error: "User Not Found" });
    }
  });

  userRoute.post("/register", async (req, res) => {
    let data = new UserModel({ ...req.body });
    let result = await data.save();
    //   remove password before sending to client
    result = result.toObject(); //it willconvert result into object then we can delete key easily
    delete result.password;
  
    if (result) {
      jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (error, token) => {
        if (token) res.send({ result, token });
        else res.send({error:"Something Went wrong"});
      });
    }
  });



  module.exports ={userRoute}