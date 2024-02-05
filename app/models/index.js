//--------------

const dbConfig = require("../config/db.config.js");  
const mongoose = require("mongoose");

//#sets the Mongoose promise library to the global promise library. 
mongoose.Promise = global.Promise;

//#An empty object called 'db' is created to store various properties related to the database configuration
const db = {};  

db.mongoose = mongoose;
db.url = dbConfig.url;

//#Defines the itprojects schema and returns a Mongoose model for the "itprojects" collection
db.itprojects = require("./itprojects.model.js")(mongoose);    

module.exports = db;