import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Automation = sequelize.define('automation', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // Foreign Keys
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false
  },
  triggerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Triggers',
      key: 'id',
    },
    allowNull: false
  },
  actionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Actions',
      key: 'id',
    },
    allowNull: false
  },
  platformId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'PlatformIntegrations',
      key: 'id',
    },
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'createdAt'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updatedAt'
  }
}, {
  tableName: 'automation',
  freezeTableName: true,
  timestamps: true
});

export default Automation;
