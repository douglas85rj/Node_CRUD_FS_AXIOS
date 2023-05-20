const {v4:uuidv4} = require('uuid')
const {validateDataEmployee} = require('../model/employeeModel')

const fs = require('fs')

//let employees = []

//GET
function getEmployeesPromise()
{
    return new Promise((resolve, reject) => {        
        fs.readFile('../back/model/employees.json', 'utf8', (err, data) => {
          if (err) {
            reject(err)
          } 
          else {            
            let employees = JSON.parse(data)            
            resolve(employees)
          }
        })
    })
}
const getEmployees = (req,res)=>{
    getEmployeesPromise()
    .then(employees => res.status(200).json(employees))
    .catch(err => res.status(500).send(err.message));
}  


//POST
function addEmployeesPromise(employee) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('../back/model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } 
      else {    
                
        let employees = JSON.parse(data)   

        if(employees.some(e=>e.email===employee.email))
        {
            reject(new Error('Email already exists'))                  
        }

        const id = uuidv4()         
        const employeeNew = { id, ...employee }  
        
        employees.push(employeeNew)  
        
        fs.writeFile('../back/model/employees.json', JSON.stringify(employees), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(employeeNew);
          }
        })
      }
    })
  })
}

const addEmployees = (req,res)=>{
    const employee = req.body

    const validResult = validateDataEmployee(employee)
       
    if(!validResult.valid)
    {
      return res.status(400).json({message:'Invalid employee Data', errors : validResult.errors})
    }    


    addEmployeesPromise(employee)
    .then(employeeNew => res.status(200).json(employeeNew))
    .catch(err => res.status(500).send(err.message))
}  


//PUT/PATCH
function updateEmployeesPromise(id,employee) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('../back/model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        
        let employees = JSON.parse(data)  
        
        const index = employees.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('Employee not found'))
        } 
        else 
        {
          
          const employeeUpdate = { ...employees[index], ...employee, email: employees[index].email }  
          
          employees[index] = employeeUpdate  
          
          fs.writeFile('../back/model/employees.json', JSON.stringify(employees), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(employeeUpdate)
            }
          })
        }
      }
    })
  })
}
  
const updateEmployees = (req,res) =>{
  const id = req.params.id
  const employee = req.body
  updateEmployeesPromise(id,employee) 
  .then(employeeUpdate => res.status(200).json(employeeUpdate))
  .catch(err => res.status(500).send(err.message))

}


//DELETE
function removeEmployeesPromise(id) 
{
  return new Promise((resolve, reject) => {
    fs.readFile('../back/model/employees.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } 
      else {
        
          const employees = JSON.parse(data)
          
          const index = employees.findIndex(e => e.id === id)

          if (index === -1) {
            reject(new Error('Employee not found'))
          } 
          else {
            
            employees.splice(index, 1)
            
            fs.writeFile('../back/model/employees.json', JSON.stringify(employees), err => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          }       
      }
    })
  })
}

const removeEmployees = (req,res)=>{      
    const id = req.params.id
    removeEmployeesPromise(id)
    .then(() => res.status(200).json({message:'Employee Deleted'}))
    .catch(err => res.status(500).send(err.message))
}


module.exports = {getEmployees,addEmployees,updateEmployees, removeEmployees}