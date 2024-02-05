//--------------

module.exports = app => {    
    //#import all logics (methods) from the controller.js
    const itprojects = require("../controllers/itprojects.controller.js");
  
    //#create an instance of a router object
    var router = require("express").Router();
  
    //#Create a new itproject
    router.post("/", itprojects.create);
  
    //#Retrieve all itprojects
    router.get("/", itprojects.findAll);
    //(npp)
  
    //#Retrieve a single itproject with id
    router.get("/:id", itprojects.findOne); 
  
    //#Update a itproject with id
    router.put("/:id", itprojects.update);    
  
    //#Delete a itproject with id
    router.delete("/:id", itprojects.delete);   
  
    //#Delete all itprojects
    router.delete("/", itprojects.deleteAll); 
  
    //#req to the '/api/itprojects' directory will be handled by router
    app.use('/api/itprojects', router);     
};