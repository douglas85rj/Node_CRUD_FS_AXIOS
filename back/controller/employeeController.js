const {v4:uuidv4} = require('uuid')

const {validateDataEmployee} = require('../model/employeeModel')

let employees = []

const getEmployees = (req,res)=>{
    res.status(200).json(employees)
}

const addEmployees = (req,res)=>{
    const employee = req.body
    try{
       const validResult = validateDataEmployee(employee)
       
       if(!validResult.valid)
       {
            return res.status(400).json({message:'Invalid employee Data', errors : validResult.errors})
       }

       if(employees.some(e=>e.email===req.body.email))
       {
          return res.status(400).json({message:'Email already exists'})         
       }

    

        employee.id = uuidv4()
        employees.push(employee)
        res.status(200).json(employee)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
    
}

const updateEmployees = (req,res)=>{
    const id = req.params.id
    const employee = req.body
    
    try{
        const index = employees.findIndex((e)=>e.id===id)
        if(index === -1)
        {
            return res.status(404).json({message:'Employee not found'})
        }
        employees[index] ={...employees[index],... employee}
        res.status(200).json(employees[index])
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
}

const removeEmployees = (req,res)=>{      
    const id = req.params.id
    try{
        const index = employees.findIndex((e)=>e.id===id)
        if(index === -1)
        {
            return res.status(404).json({message:'Employee not found'})
        }
        employees.splice(index,1)
        res.status(200).json({message:'Employee Deleted'})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = {getEmployees,addEmployees,updateEmployees,removeEmployees}