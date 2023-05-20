const {Validator} = require('jsonschema')
const validator = new Validator()

const userSchema = {    
    type: "object",
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        age: {type: 'number', minimum :18},
        email: {type:'string'},
        department:{type:'string'}           
    },
    "required": ['name','age','email','department']
  }

  const validateDataUser = (e)=>{
    return validator.validate(e,userSchema)
  }

  module.exports= {validateDataUser}