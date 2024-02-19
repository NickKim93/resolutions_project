const Employee = require('./employee');
const Receipt = require('./receipt');
const SpendingResolution = require('./spendingResolution');
const Role = require('./role');
const EmployeeRole = require('./employeeRole');

Employee.belongsToMany(Role, { through: EmployeeRole, foreignKey: 'employeeId', otherKey: 'roleId' });
Role.belongsToMany(Employee, { through: EmployeeRole, foreignKey: 'roleId', otherKey: 'employeeId' });

Employee.hasMany(Receipt, {
    foreignKey: 'employeeId',
    as: 'receipts'
});
  
Receipt.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
});

Employee.hasMany(SpendingResolution, {
    foreignKey: 'employeeId',
    as: 'spendingResolutions'
});
  
SpendingResolution.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
});
  

module.exports = { Employee, Role, EmployeeRole, Receipt, SpendingResolution  };
