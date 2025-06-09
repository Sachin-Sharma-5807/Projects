import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const PlatformIntegration = sequelize.define('platformIntegration', {
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
  tableName: 'platformIntegration',
  freezeTableName: true,
  timestamps:true
});

export default PlatformIntegration;

