import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';


export const Usuario = sequelize.define('usuarios', {
    id: {
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
    email: {
        type: DataTypes.STRING,
    },
    cedula: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    contraseña: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
    }
},
    {
    timestamps: true
});

export default Usuario;