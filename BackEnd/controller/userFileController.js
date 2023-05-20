const {v4: uuidv4} = require('uuid');
const {sectorController} = require('../sectorController');
const {validadeDataUser, validateDataUser} = require('../model/userModel');

const fs = require('fs');
//GET users
function getUsersPromise   (){
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/users.json','utf8',(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                let users = JSON.parse(data)
                resolve(users)
            }
        })
    })
}

const getUsers = (req,res)=>{
    getUsersPromise()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send(err.message))
}

//POST users
function addUsersPromise(employee) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('../BackEnd/model/users.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } 
      else {    
                
        let users = JSON.parse(data)   

        if(users.some(e=>e.email===user.email))
        {
            reject(new Error('Email already exists'))                  
        }

        const id = uuidv4()         
        const userNew = { id, ...user }  
        
        users.push(userNew)  
        
        fs.writeFile('../BackEnd/model/users.json', JSON.stringify(users), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(userNew);
          }
        })
      }
    })
  })
}

const addUsers = (req,res)=>{
    const user = req.body

    const validResult = validateDataUser(user)
       
    if(!validResult.valid)
    {
      return res.status(400).json({message:'Invalid user Data', errors : validResult.errors})
    }    

    if(!departments.includes(employee.department)) 
    {
      return res.status(404).json({message:'Invalid Sector'})
    }

    addUsersPromise(user)
    .then(userNew => res.status(200).json(userNew))
    .catch(err => res.status(500).send(err.message))
}  

//PUT/PATCH
function updateUserPromise(id,user) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('../BackEnd/model/users.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        
        let users = JSON.parse(data)  
        
        const index = users.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('User not found'))
        } 
        else 
        {
          
          const userUpdate = { ...user[index], ...user, email: users[index].email }  
          
          users[index] = userUpdate  
          
          fs.writeFile('../BackEnd/model/uders.json', JSON.stringify(users), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(userUpdate)
            }
          })
        }
      }
    })
  })
}

const updateUsers = (req,res) =>{
    const id = req.params.id
    const employee = req.body
    updateUsersPromise(id,user) 
    .then(userUpdate => res.status(200).json(userUpdate))
    .catch(err => res.status(500).send(err.message))
  
  }
  
  //DELETE
function removeUsersPromise(id) 
{
  return new Promise((resolve, reject) => {
    fs.readFile('../BackEnd/model/users.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } 
      else {
        
          const users = JSON.parse(data)
          
          const index = users.findIndex(e => e.id === id)

          if (index === -1) {
            reject(new Error('User not found'))
          } 
          else {
            
            users.splice(index, 1)
            
            fs.writeFile('../BackEnd/model/users.json', JSON.stringify(users), err => {
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

const removeUsers = (req,res)=>{      
    const id = req.params.id
    removeEmployeesPromise(id)
    .then(() => res.status(200).json({message:'User Deleted'}))
    .catch(err => res.status(500).send(err.message))
}


module.exports = {getUsers,addUsers,updateUsers, removeUsers}