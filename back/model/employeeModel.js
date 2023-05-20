const {Validator} = require('jsonschema')
const validator = new Validator()

const employeeSchema = {    
    type: "object",
    properties: {       
        name: {type: 'string'},        
        email: {type:'string'},               
    },
    "required": ['name','email']
  }

  const validateDataEmployee = (e)=>{
    return validator.validate(e,employeeSchema)
  }

  module.exports= {validateDataEmployee}
