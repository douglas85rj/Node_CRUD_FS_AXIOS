const express = require('express')
const router = express.Router()

//const employeeController = require('../controller/employeeController')
const employeeController = require('../controller/employeeFileController') 

router.get('/',employeeController.getEmployees)

router.post('/add',employeeController.addEmployees)

router.put('/:id',employeeController.updateEmployees )

router.delete('/:id',employeeController.removeEmployees )

module.exports= router