import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';

export const Requests = sequelize.define('requests', {
    id_request: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id_user'
        }
    },
    animal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'animals',
            key: 'id_animal'
        }
    },
    status: {
        type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
        defaultValue: 'pendiente',
        allowNull: false,
    },
    date_request: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
})