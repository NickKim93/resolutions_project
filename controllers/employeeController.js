const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({"message": "No employees found"});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {

    if (!req?.body?.firstName || !req?.body?.lastName || !req?.body?.username || !req?.body?.password) {
        return res.status(400).json({"message": "First & last names, username, password are required"});
    }

    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const result = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPwd
        });
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res.status(204).json({"message": `No Employee matches with ${req.body.id}`});
    }

    const updatableFields = ['firstName', 'lastName', 'password', 'department', 'receipts', 'spendingResolutions'];
    Object.keys(req.body).forEach(key => {
        if (updatableFields.includes(key)) {
            employee[key] = req.body[key];
        }
    });

    try {
        const result = await employee.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({"message": "An error occurred while updating the employee."});
    }
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res.status(204).json({"message": `No Employee matches with ${req.body.id}`});
    }
    const result = await Employee.deleteOne({_id: req.body.id});
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }
    try {
        const employee = await Employee.findOne({_id: req.params.id}).exec();
        if (!employee) {
            return res.status(404).json({"message": `No Employee matches with ${req.params.id}`});
        }
        res.json(employee);
    } catch(err) {
        if (err.name === 'CastError') {
            return res.status(400).json({"message": "Invalid ID format"});
        }
        console.error(err);
        res.status(500).json({"message": "Server error"});
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}