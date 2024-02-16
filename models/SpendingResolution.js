const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class SpendingResolution extends Model {}

SpendingResolution.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees', // This should match the table name
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SpendingResolution',
  tableName: 'spending_resolutions'
});

module.exports = SpendingResolution;