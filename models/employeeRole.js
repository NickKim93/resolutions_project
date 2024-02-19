const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class EmployeeRole extends Model {}

EmployeeRole.init({
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'EmployeeRole',
  tableName: 'employeeRoles',
  timestamps: false
});

module.exports = EmployeeRole;
