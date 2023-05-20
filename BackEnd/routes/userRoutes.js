const express = require('express')
const router = express.Router()


const userController = require('../controller/UserFileController') 

router.get('/',userController.getUsers)

router.post('/add',userController.addUsers)

router.put('/:id',userController.updateUsers )

router.delete('/:id',userController.removeUsers )

module.exports= router