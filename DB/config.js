const mongoose = require("mongoose");
require("dotenv").config();
// npm i dotenv --> to work .env file
// and import above code to work it

// mongoose.connect("mongodb://localhost:27017/e-commerce")

mongoose.connect(`${process.env.mongoDB_URL}/e-commerce`)

// console.log('mongo url', process.env.mongoDB_URL)
// mongoose.connect("mongodb+srv://aaru1996:Arun%401996@aaru1996.xovqy.mongodb.net/e-commerce")
// copy connection url from mongodb-compass
// its different than actual connection string
// e-commerce is database
