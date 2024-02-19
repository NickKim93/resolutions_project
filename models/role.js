const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  timestamps: false
});

module.exports = Role;
