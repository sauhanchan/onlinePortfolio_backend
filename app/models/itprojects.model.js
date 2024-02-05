//--------------

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
        type: String,
        link: String,
        image: Array,
        displayLbl: Boolean,
        labelContent: String,
        language: String,
        libOrFramework: String,
        tool: String,
        skill: String,
        other: String
      },
    );
  
    //#To fix the problem with _id & id
    //#add an instance method to documents constructed from the schema
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      //#Add an id field
      object.id = _id;
      return object;
    });
  
    const  Itprojects = mongoose.model("itprojects", schema);
    return Itprojects;
  };