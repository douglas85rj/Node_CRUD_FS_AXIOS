const{v4: uuidv4} = require('uuid');
const {sectors} = require('./sectorController');
const {validateDataUser} = require('../model/userModel');


let users = []

const getUsers = (req,res)=>{
    res.status(200).json(users)
}

const addUsers = (req,res)=>{
    const user = req.body
    try{
       const validResult = validateDataUser(user)
       
       if(!validResult.valid)
       {
            return res.status(400).json({message:'Invalid user Data', errors : validResult.errors})
       }

       if(users.some(e=>e.email===req.body.email))
       {
          return res.status(400).json({message:'Email already exists'})         
       }

       if(!sectors.includes(user.sector)) 
       {
        return res.status(404).json({message:'Invalid Sector'})
       }

        user.id = uuidv4()
        user.push(user)
        res.status(200).json(user)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
    
}

const updateUsers = (req,res)=>{
    const id = req.params.id
    const user = req.body
    
    try{
        const index = employees.findIndex((e)=>e.id===id)
        if(index === -1)
        {
            return res.status(404).json({message:'User not found'})
        }
        users[index] ={...users[index],... user}
        res.status(200).json(users[index])
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
}

const removeUsers = (req,res)=>{      
    const id = req.params.id
    try{
        const index = users.findIndex((e)=>e.id===id)
        if(index === -1)
        {
            return res.status(404).json({message:'User not found'})
        }
        users.splice(index,1)
        res.status(200).json({message:'User Deleted'})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = {getUsers,addUsers,updateUsers,removeUsers}