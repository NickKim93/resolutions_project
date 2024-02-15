const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        if (employees.length === 0) return res.status(204).json({"message": "No employees found"});
        res.json(employees);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const createNewEmployee = async (req, res) => {

    if (!req?.body?.firstName || !req?.body?.lastName || !req?.body?.username || !req?.body?.password) {
        return res.status(400).json({"message": "First & last names, username, password are required"});
    }

    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const newEmployee = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPwd
        });
        res.status(201).json(newEmployee);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

const updateEmployee = async (req, res) => {

    const { id, password, ...otherFields} = req.body;

    if (!id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }

    try {
        let updatedFields = otherFields;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields = { ...otherFields, password: hashedPassword};
        }
        const [updateCount] = await Employee.update(updatedFields, {
            where: {id: id},
        });

        if (updateCount === 0)  {
            return res.status(404).json({"message": `No Employee matches with ${id}`});
        }
        res.json({"message": `Employee with ${id} updated successfully`});
    } catch (err)  {
        res.status(500).json({"message": "An error occurred while updating the employee."});
    }
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }
    try {
        const employee = await Employee.destroy({
            where: { id: req.body.id}
        });
        if (employee === 0) {
            return res.status(404).json({"message": `No Employee matches with ${req.body.id}`});
        };
        res.json({"message": `Employee with id ${req.body.id} was deleted`});
    } catch (err) {
        res.status(500).json({"message": "An error occurred while deleting the employee."});
    }
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({"message": "ID parameter is required"});
    }
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({"message": `No Employee matches with ${req.params.id}`});
        }
        res.json(employee);
    } catch(err) {
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