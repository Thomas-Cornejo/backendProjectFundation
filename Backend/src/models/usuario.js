import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';
import { Rol } from './rol.js';

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
    rol_id: {  // Clave foránea que hace referencia al ID del rol
        type: DataTypes.INTEGER,
        references: {
            model: Rol,      // Nombre del modelo relacionado
            key: 'id_rol'        // Clave primaria en la tabla `Rol`
        }
    }
},);
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'Rol' });
export default Usuario;