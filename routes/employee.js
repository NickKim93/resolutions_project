const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeeController');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles('admin', 'team leader'),employeesController.getAllEmployees)
    .post(verifyRoles('admin'), employeesController.createNewEmployee)
    .put(verifyRoles('admin'), employeesController.updateEmployee)
    .delete(verifyRoles('admin'), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;