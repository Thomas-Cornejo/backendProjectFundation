import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const rol = sequelize.define('rol', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING,
    }
    
})