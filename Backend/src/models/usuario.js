import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';


export const Usuario = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    rol_id: {
        type: DataTypes.INTEGER,
    }
},);

export default Usuario;