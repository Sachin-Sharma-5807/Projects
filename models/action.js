import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Action = sequelize.define('action', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'action',
  freezeTableName: true,
  timestamps: true
});

export default Action;