//--------------

const db = require("../models");
const Itprojects = db.itprojects;

// 1) Create and Save a new Itproject
//    #Send appropriate responses depending on the outcome of the database operation
exports.create = (req, res) => {
    //#Validate request (check the req.body)
    if (!req.body.title) {                                                   
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //#Create a itproject (if req.body.title is not null)
    const itproject = new Itprojects({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published? req.body.published: false,
        type: req.body.type,
        link: req.body.link,
        image: req.body.image,
        displayLbl: req.body.displayLbl? req.body.displayLbl: false,
        labelContent: req.body.labelContent,
        language: req.body.language,
        libOrFramework: req.body.libOrFramework,
        tool: req.body.tool,
        skill: req.body.skill,
        other: req.body.other
    });

    //#Save itproject in the database
    Itprojects     
    .create(itproject)
    .then(data => {     
        res.send(data);
    })
    .catch(err => {     
        res.status(500).send({    
            message: err.message || "Some error occurred while creating the itproject."
        });
    });
};
//----END of 1----////

// 2) Retrieve all Itprojects / find by title from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;     
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Itprojects
    .find(condition)
    .sort({ other: 1 })
    .then(data => {
        res.send(data);   
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving itprojects."
        });  
    });
};
//----END of 2----////

// 3) Find a single Itproject with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Itprojects        
    .findById(id)
    .then(data => {   
        if (!data)    
            res.status(404).send({ message: "Not found Itproject with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({   
            message: "Error retrieving Itproject with id=" + id }); 
    });
};
//----END of 3----////


// 4) Update a Itproject by the id in the request
exports.update = (req, res) => {

    //#check if the req.body is null
    if (!req.body) {
        return res.status(400).send({
                    message: "Data to update can not be empty!"
        });
    }

    //#find that id & update
    const id = req.params.id;

    Itprojects    
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
          if (!data) {   
            res.status(404).send({
              message: `Cannot update Itproject with id=${id}. Maybe Itproject was not found!`
            });
          }
          else res.send({ message: "Itproject was updated successfully." });
        })
    .catch(err => {   
        res.status(500).send({    
            message: "Error updating Itproject with id=" + id   
        });
    });
};
//----END of 4----////
 

// 5) Delete a Itproject with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Itprojects
    .findByIdAndRemove(id)
    .then(data => {    
      if (!data) {     
        res.status(404).send({message: `Cannot delete Itproject with id=${id}. Maybe Itproject was not found!`});
      } 
      else {
        res.send({message: "Itproject was deleted successfully!"});
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Itproject with id=" + id
      });
    });
};
//----END of 5----////


// 6) Delete all Itprojects from the database.
exports.deleteAll = (req, res) => {
    
    Itprojects
    .deleteMany({})
    .then(data => {     
      res.send({message: `${data.deletedCount} Itprojects were deleted successfully!`});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Itprojects."
      });
    });
};
//----END of 6----////(npp)