const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.get('/', userController.getUsers)
router.post('/add',userController.addUsers)
router.delete('/delete',userController.removeUser)

module.exports= router