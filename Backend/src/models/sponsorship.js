import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../database/database.js';
import { Usuario } from './usuario.js';
import { Animal } from './animal.js';

export const Sponsorship = sequelize.define('sponsorship', {
    id_sponsorship: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_user'
        }
    },
    animal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Animal,
            key: 'id_animal'
        }
    },
    
    sponsorship_date_start: {
        type: DataTypes.DATE
    },
    
    sponsorship_date_end: {
        type: DataTypes.DATE
    },
    amount_donate: {
        type: DataTypes.DECIMAL(10, 2)
    },
    donacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Donacion,
            key: 'id_donacion'
        }
    }
});
export default Sponsorship;