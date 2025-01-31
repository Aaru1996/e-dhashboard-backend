
const jwt = require('jsonwebtoken')
const jwtKey = "jwt-e-commerce";




function verifyJwtToken(req, res, next) {
    let token = req.headers["authorization"];
    //"authorization" is key name in headers which is passed from frontend
    // console.log(token);
    if (token) {
      token = token.split(" ")[1];
      //  while sending jwt token a bearer keyword is passed before token
      // so, token is needed only not bearer keyword, so split it
      jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          res.status(401).send({ error: "Please send valid token" });
        } else {
          next();
        }
      });
    } else {
      res.status(403).send({ error: "Please send token with headers" });
    }
  }

  module.exports = {verifyJwtToken}